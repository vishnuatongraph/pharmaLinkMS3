import React from "react";
import Conversations from "./Conversations";
import Chat from "./Chat";

export default function Messages() {
  return (
    <div className="grid grid-cols-[360px_auto] h-full mr-10 mt-5">
      <div className="bg-white grid grid-rows-[90px_auto] px-6 border-r-[#28303033] border-r border-solid">
        <div className="flex items-center">
          <p className="text-2xl text-[#283030] font-semibold">Messages</p>
        </div>
        <div className="convo-cont">
          <Conversations />
        </div>
      </div>
      <Chat />
    </div>
  );
}
