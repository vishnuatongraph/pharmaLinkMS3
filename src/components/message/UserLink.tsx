import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import profile1 from "../../../public/images/profile1.svg";
import doubleTick from "../../../public/images/tick.svg";
import blueTick from "../../../public/images/blueTick.svg";
import { supabaseClient } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { handleClientScriptLoad } from "next/script";

interface ConvoLinkProps {
  user: {
    id:number,
    profileUrl:string,
    Name:string,
    latestMessage:{
       senderId:number,
       receiverId:number,
       created_at:string,
       content:string,
       isRead:boolean
    }|null,
    pendingCount:number
  },
  hostUserId: number
}

interface RealtimeEvent {
  table: string;
  type: string;
  new: any;
  schema: String;
}
const UserLink: React.FC<ConvoLinkProps> = ({ user, hostUserId }) => {
  const searchParams = useSearchParams();

  
  return (
    <Link
      href={`/message?id=${user.id}`}
      className={`grid flex-row grid-cols-[60px_auto] w-full mt-2.5 rounded-[10px] p-[10px] ${searchParams.get("id") == user.id+"" ? "bg-[#2cbfca22]" : ""
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
          {user.latestMessage && <p
            className={`text-xs font-normal ${user.pendingCount > 0 ? "text-[#2cbfca]" : "text-[#6c6c6c]"
              }`}
          >
            {"9.00"}
          </p>}
          {/*apply the class if there are any pending messages*/}
        </div>
        {user.latestMessage && <div className="flex justify-between align-center">
          <div className="flex flex-row gap-x-[5px]">
            {user.latestMessage?.senderId == hostUserId && !user.latestMessage?.isRead && <Image src={doubleTick} alt="sent" />}{" "}
            {/*staus of last message to be checked*/}
            {user.latestMessage?.senderId == hostUserId && user.latestMessage?.isRead && <Image src={blueTick} alt="read" />}
            {/*status of last message to be checked*/}
            <p className="text-sm font-normal text-[#283030aa]">
              {user.latestMessage?.content.length > 18 ? user.latestMessage.content.substring(0, 15) + "..." : user.latestMessage.content}
            </p>
            {/* get the latest message*/}
          </div>
          <div className="flex justiy-center align-center">
            {user.pendingCount > 0 && (
              <p className="bg-[#2cbfca] text-sm font-normal text-white h-5 w-5 text-center rounded-[50%]">
                {user.pendingCount}
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
