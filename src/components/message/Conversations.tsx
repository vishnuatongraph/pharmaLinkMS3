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
  const [users, setUsers] = useState<any[] | null>(null);
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
        const { data, error }:any = await supabaseClient
          .from("SupabaseUsers")
          .select()
          .neq("id", 1);
        if (error) {
          setFetchError("Could not fetch the users");
          setUsers(null);
          console.log(error)
        } else {
          setUsers(data);
          console.log("users",data);
          router.push(`/message?id=${data[0].id}`);
          setFetchError(null);

          let { data:messages, error:messageError } = await supabaseClient
         .rpc('get_users_with_latest_message',{user_id:2})
          if(messages){
            console.log(messages)
          }
          else if(messageError){
            console.log(messageError)
          }
        }
      }
    } catch (error: any) {
      console.error("Error fetching users:", error.message);
      setFetchError("An error occurred while fetching users");
      setUsers(null);
    }
  };

  const fetchConversations = async () => {
    try {
      const {data,error}:any=await supabaseClient.from("Participants")
      .select("Conversations(id)")
      .eq("user_id",1)
       if(data){
        let convoId=data.map((convo:any)=>convo.Conversations.id);
        const {data:conversations,error}=await supabaseClient.from("Participants")
        .select("Conversations(id,profile_url,is_groupchat,Messages!Conversations_latest_message_fkey(*)) ,SupabaseUsers(*)")
        .in("conversation_id",convoId)
        .neq("user_id",1)
        if(conversations){
          const convos=conversations.map((convo:any)=>{
            if(!convo.Conversations.is_groupchat){
              convo.Conversations.name=convo.SupabaseUsers.Name;
              convo.Conversations.profile_url=convo.SupabaseUsers.profileUrl
            }
            return {
              id:convo.Conversations.id,
              name:convo.Conversations.name,
              profile_url:convo.Conversations.profile_url,
              latest_message:{...convo.Conversations.Messages}
            }
          })
          setConversations(convos);
        }
        else if(error){
          console.log(error)
        }
       }
    } catch (error) {
      console.log(error)
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
