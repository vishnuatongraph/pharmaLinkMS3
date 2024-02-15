import Messages from "@/components/message/messages";
import { supabaseClient } from "@/lib/supabaseClient";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Message() {
  const supabase = createServerComponentClient({ cookies});
  let userId:number
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }
  else{
    const{data:userDetails,error}=await supabaseClient.from("SupabaseUsers").select("id").eq("authId",user.id).single();
    if(userDetails){
      userId=userDetails.id
    }
    else{
      redirect("/")
    }
  }
  return <Messages hostUserId={userId}/>;
}
