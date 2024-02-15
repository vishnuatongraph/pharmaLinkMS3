"use client";
import searchIcon from "../../../public/images/search.svg";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import UserLink from "./UserLink";
import { useRouter, useSearchParams } from "next/navigation";

interface LatestMessage {
  id: number;
  senderId: number;
  receiverId: number;
  created_at: string;
  content: string;
  isRead: boolean;
}
interface UserChat {
  id: number;
  profileUrl: string;
  Name: string;
  latestMessage: LatestMessage | null;
  pendingCount: number;
}

interface ContactUsersResponse {
  Id: number;
  Name: string;
  profileUrl: string;
  latestMessageId: number;
  latestMessageContent: string;
  latestMessageSenderId: number;
  latestMessageReceiverId: number;
  latestMessageIsRead: boolean;
  latestMessageCreatedAt: string;
}

interface SupabaseUser {
  id: number;
  Name: string;
  profileUrl: string;
  isActive: boolean;
  created_at: string;
}

interface SupabaseMessage {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  isRead: boolean;
  created_at: string;
}

const Conversations: React.FC<{
  hostUserId: number;
  setShowChat: Dispatch<SetStateAction<boolean>>;
}> = ({ hostUserId, setShowChat }) => {
  const router = useRouter();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserChat[] | null>(null);
  const [searchKey, setSearchKey] = useState<string>("");
  const searchParams = useSearchParams();

  const fetchUsers = async () => {
    try {
      const { data: userExistsData, error: userExistsError } =
        await supabaseClient
          .from("SupabaseUsers")
          .select("id")
          .eq("id", hostUserId);

      if (userExistsError) {
        setFetchError("Could not check user existence");
        setUsers(null);
        return;
      }
      if (userExistsData.length === 0) {
        console.log("user is not present with this id");
      }

      if (userExistsData && userExistsData.length > 0) {
        const { data: contactUsers, error: contactUsersError } =
          await supabaseClient.rpc("get_users_with_latest_message", {
            user_id: hostUserId,
          });
        let contactIds = [];
        let userList: UserChat[] = [];
        if (contactUsers) {
          contactIds = await contactUsers.map((user: ContactUsersResponse) => {
            let newMessage: LatestMessage = {
              id: user.latestMessageId,
              content: user.latestMessageContent,
              senderId: user.latestMessageSenderId,
              receiverId: user.latestMessageReceiverId,
              isRead: user.latestMessageIsRead,
              created_at: user.latestMessageCreatedAt,
            };
            let newUser: UserChat = {
              id: user.Id,
              Name: user.Name,
              profileUrl: user.profileUrl,
              latestMessage: newMessage,
              pendingCount: 0,
            };
            userList.push(newUser);

            return user.Id;
          });
        }
        const { data: nonContactUser, error } = await supabaseClient.rpc(
          "get_users",
          { contactids: contactIds, userid: hostUserId }
        );

        if (nonContactUser) {
          await nonContactUser.forEach((user: SupabaseUser) => {
            let newUser: UserChat = {
              id: user.id,
              Name: user.Name,
              profileUrl: user.profileUrl,
              latestMessage: null,
              pendingCount: 0,
            };
            userList.push(newUser);
          });
        }

        const { data: unreadCounts, error: unreadCountsError } =
          await supabaseClient.rpc("get_unread_counts", {
            user_id: hostUserId,
          });
        let unreadMap = new Map();

        if (unreadCounts) {
          unreadCounts.forEach(
            (count: { SupabaseUsers_id: number; unread_count: number }) => {
              unreadMap.set(count.SupabaseUsers_id, count.unread_count);
            }
          );
        }

        userList.forEach((user) => {
          user.pendingCount = unreadMap.get(user.id);
        });
        router.push(`/message?id=${userList[0].id}`);
        setUsers(userList);
      }
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
      setFetchError("An error occurred while fetching users");
      setUsers(null);
    }
  };

  const getUserIndex = (userId: number) => {
    let index = -1;
    users?.forEach((user, i) => {
      if (user.id == userId) {
        index = i;
      }
    });
    return index;
  };

  const reArrangeUserItem = (
    userId: number,
    message: SupabaseMessage,
    unreadChange: number
  ) => {
    const newLatest: LatestMessage = {
      id: message.id,
      content: message.content,
      senderId: message.senderId,
      receiverId: message.receiverId,
      isRead: message.isRead,
      created_at: message.created_at,
    };
    setUsers((prevUsers) => {
      if (prevUsers) {
        const newUsers = [...prevUsers];
        const index = prevUsers.findIndex((user) => user.id == userId);

        if (index != -1) {
          let MovedUser: UserChat = newUsers.splice(index, 1)[0];
          MovedUser.latestMessage = newLatest;
          MovedUser.pendingCount = MovedUser.pendingCount + unreadChange;
          newUsers.unshift(MovedUser);
          return newUsers;
        }
      }
      return prevUsers;
    });
  };

  const updateLatestMessage = (userId: number, message: SupabaseMessage) => {
    setUsers((prevUsers) => {
      if (prevUsers) {
        return prevUsers.map((user) => {
          if (user.id == userId && user.latestMessage?.id == message.id) {
            const updatedMessage: LatestMessage = {
              id: message.id,
              content: message.content,
              senderId: message.senderId,
              receiverId: message.receiverId,
              isRead: message.isRead,
              created_at: message.created_at,
            };
            user.latestMessage = updatedMessage;
          }
          return user;
        });
      }
      return prevUsers;
    });
  };

  const resetPendingCount = () => {
    setUsers((prevUsers) => {
      if (prevUsers) {
        return prevUsers.map((user) => {
          if (user.id.toString() == searchParams.get("id")) {
            user.pendingCount = 0;
          }
          return user;
        });
      }
      return prevUsers;
    });
  };
  const handleUsersListSubscription = async (payload: any) => {
    if (payload.table == "SupabaseMessages") {
      const message = payload.new;
      const oldMessage = payload.old;
      let userId =
        message.senderId == hostUserId ? message.receiverId : message.senderId;
      if (payload.eventType == "INSERT") {
        let unreadChange = 0;
        if (
          message.senderId != hostUserId &&
          message.isRead == false &&
          userId.toString() != searchParams.get("id")
        ) {
          unreadChange = 1;
        }
        reArrangeUserItem(userId, message, unreadChange);
      } else if (payload.eventType == "UPDATE") {
        updateLatestMessage(userId, message);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
    const channels = supabaseClient
      .channel(`UserListSubscription`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "SupabaseMessages" },
        handleUsersListSubscription
      )
      .subscribe();
  }, [hostUserId]);

  useEffect(() => {
    resetPendingCount();
  }, [searchParams]);

  const getFilteredUsers = () => {
    return users?.filter((user) =>
      user.Name?.toLowerCase().includes(searchKey.toLowerCase())
    );
  };

  return (
    <div className="h-full w-full grid grid-rows-[54px_auto]">
      <div className="flex flex-row border bg-neutral-100 pl-2.5 rounded-[10px] border-solid border-[#e0e0e0]">
        <Image src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder="Search chats"
          className="no-outline bg-neutral-100 ml-2.5 placeholder-gray"
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col overflow-scroll no-scrollbar">
        {getFilteredUsers()?.map((user) => (
          <UserLink
            user={user}
            key={user.id}
            hostUserId={hostUserId}
            setShowChat={setShowChat}
          />
        ))}
      </div>
    </div>
  );
};

export default Conversations;
