import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import profile1 from "../../../public/images/profile1.svg";
import doubleTick from "../../../public/images/tick.svg";
import blueTick from "../../../public/images/blueTick.svg";
import { supabaseClient } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { handleClientScriptLoad } from "next/script";

interface UserLinkProps {
  user: {
    id: string,
    Name: string,
    profileUrl: string
  },
  hostUserId: string
}

interface RealtimeEvent {
  table: string;
  type: string;
  new: any;
  schema: String;
}
const UserLink: React.FC<UserLinkProps> = ({ user, hostUserId }) => {
  const searchParams = useSearchParams()
  const [latestMessage, setLatestMessage] = useState<{
    content: string,
    isRead: boolean,
    senderId: string
  } | null>(null)
  const [pendingCount, setPendingCount] = useState<number>(0)

  const getLatestMessage = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("SupabaseMessages")
        .select("*")
        .or(
          `and(senderId.eq.${hostUserId},receiverId.eq.${user.id}),and(senderId.eq.${user.id},receiverId.eq.${hostUserId})`
        )
        .order("created_at", { ascending: false }).limit(1);
      if (data) {
        if (data[0]) {
          setLatestMessage(data[0])
        }
      }
      else if (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getPendingCount = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("SupabaseMessages")
        .select("*")
        .or(
          `and(senderId.eq.${user.id},receiverId.eq.${hostUserId})`
        ).eq("isRead", false)
      if (data) {
        setPendingCount(data.length)
      }
      else if (error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNewMessageSubcription=(payload:any)=>{
    const message=payload.new
    const isMessegeByUser=(message.senderId==hostUserId&&message.receiverId==user.id)||(message.receiverId==hostUserId&&message.senderId==user.id);
    if(isMessegeByUser){
      setLatestMessage(message)
    }
    const isMessageForhost=message.senderId==user.id&&message.receiverId==hostUserId;
    if(isMessageForhost){
      if(payload.eventType=="INSERT"){
        if(!message.isRead){
          setPendingCount((pendingCount)=>pendingCount+1)
        }
      }
      else if(payload.eventType=="UPDATE"){
           const oldMessage=payload.old;
           if(!oldMessage.isRead&&message.isRead){
           setPendingCount(pendingCount=>pendingCount-1)
           }
      }
    }
  }
  useEffect(() => {
    getLatestMessage()
    getPendingCount()


    const channels = supabaseClient.channel(`new-message-event-${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'SupabaseMessages' },
        handleNewMessageSubcription
      )
      .subscribe()
  }, [user])

  return (
    <Link
      href={`/message?id=${user.id}`}
      className={`grid flex-row grid-cols-[60px_auto] w-full mt-2.5 rounded-[10px] p-[10px] ${searchParams.get("id") == user.id ? "bg-[#2cbfca22]" : ""
        }`}
      key={user.id}
    >
      {" "}
      {/*check if this is the active convo*/}
      <div className="h-[54px] w-[54px] overflow-hidden rounded-[50%]">
        {!user.profileUrl && <Image src={profile1} alt="profile" />}
        {user.profileUrl && <Image src={user.profileUrl} alt="profile" width={100} height={100} />}
      </div>
      <div className="flex justify-center flex-col">
        <div className="flex justify-between align-center">
          <p className="text-lg font-medium text-[#283030]">
            {user?.Name}
          </p>
          {latestMessage && <p
            className={`text-xs font-normal ${pendingCount > 0 ? "text-[#2cbfca]" : "text-[#6c6c6c]"
              }`}
          >
            {"9.00"}
          </p>}
          {/*apply the class if there are any pending messages*/}
        </div>
        {latestMessage && <div className="flex justify-between align-center">
          <div className="flex flex-row gap-x-[5px]">
            {latestMessage?.senderId == hostUserId && !latestMessage?.isRead && <Image src={doubleTick} alt="sent" />}{" "}
            {/*staus of last message to be checked*/}
            {latestMessage?.senderId == hostUserId && latestMessage?.isRead && <Image src={blueTick} alt="read" />}
            {/*status of last message to be checked*/}
            <p className="text-sm font-normal text-[#283030aa]">
              {latestMessage?.content.length > 18 ? latestMessage.content.substring(0, 15) + "..." : latestMessage.content}
            </p>
            {/* get the latest message*/}
          </div>
          <div className="flex justiy-center align-center">
            {pendingCount > 0 && (
              <p className="bg-[#2cbfca] text-sm font-normal text-white h-5 w-5 text-center rounded-[50%]">
                {pendingCount}
              </p>
            )}{" "}
            {/*check if there are pending messages and its count*/}
          </div>
        </div>}
      </div>
    </Link>
  )
}

export default UserLink
