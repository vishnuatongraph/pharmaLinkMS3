"use client";
import searchIcon from "../../../public/images/search.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import ConvoLink from "./ConvoLink";
import { SupabaseClient } from "@supabase/supabase-js";

interface LatestMessage{
  senderId:number,
  receiverId:number,
  created_at:string,
  content:string
}
interface UserChat{
  id:number,
  profileUrl:string,
  Name:string,
  latestMessage:LatestMessage|null,
  pendingCount:number

}

function Conversations() {
  const router = useRouter();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserChat[] | null>(null);
  const userIdRef = useRef<number | null>(null);
  const [conversations,setConversations]=useState<any[]|null>(null)

  const [searchKey,setSearchKey]=useState<string>("")

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
       
          const { data:contactUsers, error:contactUsersError } = await supabaseClient
         .rpc('get_users_with_latest_message',{user_id:2})
         let contactIds=[];
         let userList:UserChat[]=[];
          if(contactUsers){
            contactIds=await contactUsers.map((user:any)=>{
               let newMessage:LatestMessage={
                content:user.latestMessageContent,
                senderId:user.latestMessageSenderId,
                receiverId:user.latestMessageReceiverId,
                created_at:user.latestMessageCreatedAt
               }
               let newUser:UserChat={
                id:user.Id,
                Name:user.Name,
                profileUrl:user.profileUrl,
                latestMessage:newMessage,
                pendingCount:0
               }
               userList.push(newUser);

               return user.Id
            });
          }
          const { data:nonContactUser, error} = await supabaseClient
         .rpc('get_users',{contactids:contactIds,userid:2})

          if(error){
            console.log(error)
          }

          if(nonContactUser){
            await nonContactUser.forEach((user:any)=>{
              let newUser:UserChat={
                id:user.id,
                Name:user.Name,
                profileUrl:user.profileUrl,
                latestMessage:null,
                pendingCount:0
               }
               userList.push(newUser);
            })
          }
          console.log(userList)
          setUsers(userList)
      }
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
      setFetchError("An error occurred while fetching users");
      setUsers(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  //  fetchConversations();

  }, []);

  const getFilteredConversations =  ()=>{
    return conversations?.filter(convo=>convo.name?.toLowerCase().includes(searchKey.toLowerCase()))
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
        {users?.map((user) => (
          <ConvoLink user={user} key={user.id} hostUserId="1"/>
        ))}
      </div>
    </div>
  );
}

export default Conversations;
