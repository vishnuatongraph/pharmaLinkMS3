"use client"
import React, { useEffect } from "react";
import Conversations from "./Conversations";
import Chat from "./Chat";
import { supabaseClient } from "@/lib/supabaseClient";

const Messages:React.FC<{hostUserId:number}>=({hostUserId})=> {

  
  const setUserActive=async()=>{
    const { data, error } = await supabaseClient
  .from('SupabaseUsers')
  .update({ isActive:true })
  .eq('id',hostUserId)
  .select()
  }

  const setUserInactive=async()=>{
    console.log("setting user inactive")
    const { data, error } = await supabaseClient
  .from('SupabaseUsers')
  .update({ isActive:false })
  .eq('id',hostUserId)
  .select()
  }

  useEffect(()=>{
    setUserActive()
    window.addEventListener("unload",setUserInactive);
    return(()=>{
      window.removeEventListener("unload",setUserInactive)
    })
  },[])
  return (
    <div className="grid grid-cols-[360px_auto] h-full w-full mr-10 mt-5 pr-[20px]">
      <div className="bg-white grid grid-rows-[90px_auto] px-6 border-r-[#28303033] border-r border-solid overflow-hidden">
        <div className="flex items-center">
          <p className="text-2xl text-[#283030] font-semibold">Messages</p>
        </div>
        <div className="convo-cont overflow-hidden">
          <Conversations hostUserId={hostUserId} />
        </div>
      </div>
      <div className="h-full overflow-hidden">
      <Chat hostUserId={hostUserId} />
      </div>
    </div>
  );
}

export default Messages
