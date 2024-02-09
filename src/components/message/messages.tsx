"use client"
import React, { useEffect } from "react";
import Conversations from "./Conversations";
import Chat from "./Chat";
import { supabaseClient } from "@/lib/supabaseClient";

export default function Messages() {

  const setUserActive=async()=>{
    const { data, error } = await supabaseClient
  .from('SupabaseUsers')
  .update({ isActive:true })
  .eq('id',1)
  .select()
  }

  const setUserInactive=async()=>{
    const { data, error } = await supabaseClient
  .from('SupabaseUsers')
  .update({ isActive:false })
  .eq('id',1)
  .select()
  }

  useEffect(()=>{
    setUserActive()

    return(()=>{
      setUserInactive()
    })
  },[])
  return (
    <div className="grid grid-cols-[360px_auto] h-full w-full mr-10 mt-5 pr-[20px]">
      <div className="bg-white grid grid-rows-[90px_auto] px-6 border-r-[#28303033] border-r border-solid overflow-hidden">
        <div className="flex items-center">
          <p className="text-2xl text-[#283030] font-semibold">Messages</p>
        </div>
        <div className="convo-cont overflow-hidden">
          <Conversations />
        </div>
      </div>
      <div className="h-full overflow-hidden">
      <Chat />
      </div>
    </div>
  );
}
