"use client";
import searchIcon from "../../../public/images/search.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import UserLink from "./UserLink";

function Conversations() {
  const router = useRouter();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [users, setUsers] = useState<any[] | null>(null);
  const userIdRef = useRef<number | null>(null);

  const [searchKey,setSearchKey]=useState<string>("")

  if (typeof window !== "undefined" && window.localStorage) {
    let storedUserId = localStorage.getItem("supabaseSenderId");

    if (storedUserId) {
      userIdRef.current = parseInt(storedUserId, 10);
    }
  }

  const fetchUsers = async () => {
    console.log("fetching users")
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
    console.log("users fethced")
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getFilteredUsers =  ()=>{
    return users?.filter(user=>user.Name.toLowerCase().includes(searchKey.toLowerCase()))
  }
  

  return (
    <div className="h-full w-full grid grid-rows-[54px_auto]">
      <div className="flex flex-row border bg-neutral-100 pl-2.5 rounded-[10px] border-solid border-[#e0e0e0]">
        <Image src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder="Search chats"
          className="no-outline bg-neutral-100 ml-2.5 placeholder-gray"
          value={searchKey}
          onChange={e=>{setSearchKey(e.target.value)}}
        />
      </div>
      <div className="flex flex-col overflow-scroll no-scrollbar">
        {getFilteredUsers()?.map((user) => (
          <UserLink user={user} key={user.id} hostUserId="1"/>
        ))}
      </div>
    </div>
  );
}

export default Conversations;
