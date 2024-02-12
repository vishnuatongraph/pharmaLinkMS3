"use client";
import searchIcon from "../../../public/images/search.svg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";
import UserLink from "./UserLink";
import { SupabaseClient } from "@supabase/supabase-js";

interface LatestMessage{
  senderId:number,
  receiverId:number,
  created_at:string,
  content:string,
  isRead:boolean
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
         .rpc('get_users_with_latest_message',{user_id:1})
         let contactIds=[];
         let userList:UserChat[]=[];
          if(contactUsers){
            console.log("contact users",contactUsers)
            contactIds=await contactUsers.map((user:any)=>{
               let newMessage:LatestMessage={
                content:user.latestMessageContent,
                senderId:user.latestMessageSenderId,
                receiverId:user.latestMessageReceiverId,
                isRead:user.latestMessageIsRead,
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
         .rpc('get_users',{contactids:contactIds,userid:1})

          if(error){
            console.log(error)
          }
          if(contactUsersError){
            console.log(contactUsersError)
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
          console.log("userList",userList)

          const {data:unreadCounts,error:unreadCountsError}=await supabaseClient
          .rpc("get_unread_counts",{user_id:1});
          let unreadMap=new Map();
          if(unreadCounts){
            console.log(unreadCounts)
            unreadCounts.forEach((count:any) => {
              unreadMap.set(count.SupabaseUsers_id,count.unread_count)
            });
          }
          console.log(unreadMap)
          userList.forEach(user=>{
            user.pendingCount=unreadMap.get(user.id);
          })
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

  const getFilteredUsers =  ()=>{
    return users?.filter(user=>user.Name?.toLowerCase().includes(searchKey.toLowerCase()))
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
          <UserLink user={user} key={user.id} hostUserId={1}/>
        ))}
      </div>
    </div>
  );
}

export default Conversations;
