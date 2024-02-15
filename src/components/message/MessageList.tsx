import doubleTick from "../../../public/images/tick.svg";
import blueTick from "../../../public/images/blueTick.svg";
import Image from "next/image";
import { supabaseClient } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import moment from "moment";

interface RealtimeEvent {
  table: string;
  eventType: string;
  new: any;
  schema: String;
}
interface MessageListProps {
  searchKey: string;
  hostUserId: number;
}
interface Message {
  id: number;
  content: string;
  senderId: number;
  receiverId: number;
  isRead: boolean;
  created_at: string;
}

const MessageList: React.FC<MessageListProps> = ({ searchKey, hostUserId }) => {
  const searchParams = useSearchParams();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  let prevDate: string;

  const listRef = useRef<HTMLDivElement | null>(null);
  // if (typeof window !== "undefined" && window.localStorage) {
  //   let storedUserId = localStorage.getItem("supabaseSenderId");

  //   if (storedUserId) {
  //     userIdRef = parseInt(storedUserId, 10);
  //   }
  // }

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("SupabaseMessages")
        .select("*")
        .or(
          `and(senderId.eq.${hostUserId},receiverId.eq.${searchParams.get(
            "id"
          )}),and(senderId.eq.${searchParams.get(
            "id"
          )},receiverId.eq.${hostUserId})`
        )
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error);
        setFetchError(error.message);
      } else {
        setMessages(data || []);
        // Mark received messages as rea
        markMessagesAsRead(data);
      }
    } catch (error: any) {
      console.error(error);
      setFetchError(error.message);
    }
  };

  const getMessages = () => {
    return messages.filter((message) =>
      message.content.toLowerCase().includes(searchKey.toLowerCase())
    );
  };
  const markMessagesAsRead = async (messagesToMarkAsRead: Message[]) => {
    const unreadMessages = messagesToMarkAsRead.filter(
      (msg: Message) => msg.receiverId === hostUserId && !msg.isRead
    );

    if (unreadMessages.length > 0) {
      const messageIds = unreadMessages.map((msg: Message) => msg.id);

      try {
        await supabaseClient
          .from("SupabaseMessages")
          .update({ isRead: true })
          .in("id", messageIds);
      } catch (error: any) {
        console.error("Error marking messages as read:", error.message);
      }
    }
  };

  const handleSubscription = (
    event: RealtimeEvent,
    payload: any,
    error: any
  ): any => {
    const isNewMessageExist = messages.some((msg) => msg.id === event.new.id);
    const isMessageForReceiver =
      (event.new.senderId == hostUserId &&
        event.new.receiverId == searchParams.get("id")) ||
      (event.new.senderId == searchParams.get("id") &&
        event.new.receiverId == hostUserId);
    const newMessage = [event.new];

    if (event.new.senderId == searchParams.get("id")) {
      markMessagesAsRead(newMessage);
    }

    if (
      !isNewMessageExist &&
      isMessageForReceiver &&
      event.eventType == "INSERT"
    ) {
      // Insert new message into the state

      setMessages((prevMessage) => {
        if (prevMessage[prevMessage.length - 1]?.id == event.new.id) {
          return [...prevMessage];
        } else {
          return [...prevMessage, event.new];
        }
      });
    } else if (isMessageForReceiver && event.eventType === "UPDATE") {
      // Update existing message in the state
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === event.new.id ? { ...msg, isRead: event.new.isRead } : msg
        )
      );
    }
  };

  useEffect(() => {
    fetchMessages();
    const subscription = supabaseClient
      .channel("RealtimeSubscription")
      .on(
        "postgres_changes" as any,
        { event: "*", schema: "public", table: "SupabaseMessages" } as any,
        handleSubscription as any
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [searchParams]);

  useLayoutEffect(() => {
    if (listRef.current) {
      listRef.current.lastElementChild?.scrollIntoView();
    }
  }, [messages]);

  function isValidImageUrl(url: string) {
    // Check if the string is a valid URL
    try {
      new URL(url);
    } catch (error) {
      return false;
    }
    // Check if the URL ends with a known image extension
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const extension = url?.split(".")?.pop()?.toLowerCase() || "";
    return imageExtensions.includes(extension);
  }

  return (
    <div
      ref={listRef}
      className="w-full pl-2.5 pr-5 py-2.5 flex flex-col gap-y-2.5 overflow-auto no-scrollbar"
      id="message-cont"
    >
      {getMessages()?.map((message, index) => {
        const currentFullTime = moment(message.created_at).format(
          "DD MMM ddd [at] h:mm A"
        );
        const currentDate = moment(message.created_at).format("DD MMM ddd");

        // Only show the date when it changes
        const showDate = prevDate !== currentDate;
        prevDate = currentDate;
        return (
          <div className="flex flex-col gap-y-2.5" key={message.id}>
            {showDate && (
              <div className="self-center text-base font-normal text-[#28303088] my-5">
                {currentFullTime}
              </div>
            )}
            <div
              className={`w-fit flex flex-col max-w-[60%] items-end p-0 break-words
                       ${
                         message.senderId == hostUserId
                           ? "self-end"
                           : "self-start"
                       }
        `}
            >
              {isValidImageUrl(message.content) ? (
                <Image
                  className={`p-2.5 rounded-[10px]
                ${
                  message.senderId == hostUserId ? "bg-[#2cbfca55]" : "bg-white"
                }`}
                  alt="image"
                  src={message.content}
                  width={300}
                  height={1000}
                />
              ) : (
                <p
                  className={`text-base font-normal text-[#001c3cbb] p-2.5 rounded-[10px] max-w-[100%]
                       ${
                         message.senderId == hostUserId
                           ? "bg-[#2cbfca55]"
                           : "bg-white"
                       }
          `}
                >
                  {message.content}
                </p>
              )}
              <div className="flex flex-row gap-x-[5px]">
                <p className="text-sm font-normal text-[#28303088]">
                  {moment(message.created_at).format("hh:mm A")}
                </p>
                {message.senderId == hostUserId && !message.isRead && (
                  <Image src={doubleTick} alt=""></Image>
                )}
                {message.senderId == hostUserId && message.isRead && (
                  <Image src={blueTick} alt=""></Image>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
