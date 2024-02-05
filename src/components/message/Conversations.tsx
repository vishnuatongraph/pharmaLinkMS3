"use client";
import searchIcon from "../../../public/images/search.svg";
import { ConversationsData } from "@/utils/constants/message/conversationsData";
import doubleTick from "../../../public/images/tick.svg";
import blueTick from "../../../public/images/blueTick.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import Link from "next/link";
import profile1 from "../../../public/images/profile1.svg";

function Conversations() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [users, setUsers] = useState<any[] | null>(null);
  const userIdRef = useRef<number | null>(null);

  if (typeof window !== "undefined" && window.localStorage) {
    let storedUserId = localStorage.getItem("supabaseSenderId");

    if (storedUserId) {
      userIdRef.current = parseInt(storedUserId, 10);
    }
  }

  const fetchUsers = async () => {
    try {
      const { data: userExistsData, error: userExistsError } =
        await supabaseClient.from("SupabaseUsers").select("id").eq("id", 1);

      if (userExistsError) {
        console.log("user is not exist with id");
        setFetchError("Could not check user existence");
        setUsers(null);
        return;
      }
      if (userExistsData.length === 0) {
        console.log("user is not present with this id");
      }

      if (userExistsData && userExistsData.length > 0) {
        const { data, error } = await supabaseClient
          .from("SupabaseUsers")
          .select()
          .neq("id", 1);
        if (error) {
          setFetchError("Could not fetch the users");
          setUsers(null);
        } else {
          setUsers(data);
          router.push(`/message?id=${data[0].id}`);
          setFetchError(null);
        }
      }
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
      setFetchError("An error occurred while fetching users");
      setUsers(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="h-full w-full grid grid-rows-[54px_auto]">
      <div className="flex flex-row border bg-neutral-100 pl-2.5 rounded-[10px] border-solid border-[#e0e0e0]">
        <Image src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder="Search chats"
          className="no-outline bg-neutral-100 ml-2.5 placeholder-gray"
        />
      </div>
      <div className="flex flex-col no-scrollbar">
        {users?.map((user) => (
          <Link
            href={`/message?id=${user.id}`}
            className={`grid flex-row grid-cols-[60px_auto] w-full mt-2.5 rounded-[10px] p-[10px] ${
              searchParams.get("id") == user.id ? "bg-[#2cbfca22]" : ""
            }`}
            key={user.id}
          >
            {" "}
            {/*check if this is the active convo*/}
            <div className="h-[54px] w-[54px] overflow-hidden rounded-[50%]">
              <Image src={profile1} unoptimized alt="profile" />
            </div>
            <div>
              <div className="flex justify-between align-center">
                <p className="text-lg font-medium text-[#283030]">
                  {user?.Name}
                </p>
                <p
                  className={`text-xs font-normal ${
                    user.id > 0 ? "text-[#2cbfca]" : "text-[#6c6c6c]"
                  }`}
                >
                  {"9.00"}
                </p>{" "}
                {/*apply the class if there are any pending messages*/}
              </div>
              <div className="flex justify-between align-center">
                <div className="flex flex-row gap-x-[5px]">
                  {user.id > 2 && <Image src={doubleTick} alt="sent" />}{" "}
                  {/*staus of last message to be checked*/}
                  {user.id < 2 && <Image src={blueTick} alt="read" />}
                  {/*status of last message to be checked*/}
                  <p className="text-sm font-normal text-[#283030aa]">
                    {"latest message"}...
                  </p>
                  {/* get the latest message*/}
                </div>
                <div className="flex justiy-center align-center">
                  {user.id > 0 && (
                    <p className="bg-[#2cbfca] text-sm font-normal text-white h-5 w-5 text-center rounded-[50%]">
                      {user.id}
                    </p>
                  )}{" "}
                  {/*check if there are pending messages and its count*/}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Conversations;
