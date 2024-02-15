"use client";
import React, { useEffect, useState } from "react";
import Conversations from "./Conversations";
import Chat from "./Chat";
import { supabaseClient } from "@/lib/supabaseClient";

const Messages: React.FC<{ hostUserId: number }> = ({ hostUserId }) => {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const setUserActive = async () => {
    const { data, error } = await supabaseClient
      .from("SupabaseUsers")
      .update({ isActive: true })
      .eq("id", hostUserId)
      .select();
  };

  const setUserInactive = async () => {
    const { data, error } = await supabaseClient
      .from("SupabaseUsers")
      .update({ isActive: false })
      .eq("id", hostUserId)
      .select();
  };

  useEffect(() => {
    setUserActive();

    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
    }

    window.addEventListener("unload", setUserInactive);
    return () => {
      window.removeEventListener("unload", setUserInactive);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div className="grid grid-cols-[360px_auto] max-md:grid-cols-[300px_auto] max-sm:block max-sm:relative overflow-hidden h-full w-full mr-10 max-sm:mr-0 mt-5 sm:pr-[20px] transition-all duration-[0.5s]">
      <div
        className={`bg-white grid grid-rows-[90px_auto] sm:px-6 max-sm:px-2 border-r-[#28303033] border-r border-solid overflow-hidden max-sm:absolute max-sm:w-full max-sm:h-full ${showChat ? "max-sm:hidden" : ""}`}
      >
        <div className="flex items-center">
          <p className="text-2xl text-[#283030] font-semibold">Messages</p>
        </div>
        <div className="convo-cont overflow-hidden">
          <Conversations hostUserId={hostUserId} setShowChat={setShowChat} />
        </div>
      </div>
      {(windowWidth > 540 || showChat) && (
        <div
          className={`h-full overflow-hidden max-sm:absolute ${!showChat ? "max-sm:hidden" : ""} max-sm:w-full`}
        >
          <Chat hostUserId={hostUserId} setShowChat={setShowChat} />
        </div>
      )}
    </div>
  );
};

export default Messages;
