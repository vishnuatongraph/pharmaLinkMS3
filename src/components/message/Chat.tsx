"use client";

import Image from "next/image";
import activeProfile from "../../../public/images/profile4.svg";
import searchIcon from "../../../public/images/searchIcon.svg";
import optionsIcon from "../../../public/images/optionsIcon.svg";
import sendIcon from "../../../public/images/send.svg";
import imageIcon from "../../../public/images/image.svg";
import emojiIcon from "../../../public/images/emoji.svg";
import MessageList from "./MessageList";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";

function Chat() {
  const searchParams = useSearchParams();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [user, setUser] = useState<{
    Name: String;
    id: Number;
    profileUrl: String;
  } | null>(null);
  const [message, setMessage] = useState("");
  const userIdRef = useRef<Number | null>(null);

  if (typeof window !== "undefined" && window.localStorage) {
    let storedUserId = localStorage.getItem("supabaseSenderId");

    if (storedUserId) {
      userIdRef.current = parseInt(storedUserId, 10);
    }
  }

  const fetchUser = async () => {
    if (searchParams.get("id")) {
      try {
        const { data: userExistsData, error: userExistsError } =
          await supabaseClient
            .from("SupabaseUsers")
            .select()
            .eq("id", searchParams.get("id"));

        if (userExistsError) {
          console.log(userExistsError);
          console.log("user is not exist with id");
          setFetchError("Could not check user existence");
          setUser(null);
          return;
        }
        if (userExistsData) {
          setUser(userExistsData[0]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setFetchError("An error occurred while fetching users");
        setUser(null);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [searchParams]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim().length !== 0) {
      try {
        const res = await supabaseClient.from("SupabaseMessages").insert([
          {
            senderId: 1,
            receiverId: searchParams.get("id"),
            content: message,
          },
        ]);
        setMessage("");
      } catch (error: any) {
        console.error("Error sending message:", error.message);
        setMessage("");
      }
    }
  };

  return (
    <>
      {user && (
        <div className="grid grid-rows-[90px_auto_90px] overflow-hidden">
          <div className="bg-white border-b-[#28303033] border-b border-solid flex justify-between items-center px-5">
            <div className="flex flex-row gap-x-5">
              <div className="h-11 w-11 overflow-hidden rounded-[50%]">
                <Image src={activeProfile} alt="profile" />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-black">{user?.Name}</p>
                <p className="text-sm font-normal text-[#2cbfca]">Active now</p>
              </div>
            </div>
            <div className="flex flex-row gap-x-5">
              <button className="h-6 w-6 flex justify-center items-center">
                <Image src={searchIcon} alt="search" />
              </button>
              <button className="h-6 w-6 flex justify-center items-center">
                <Image src={optionsIcon} alt="options" />
              </button>
            </div>
          </div>
          <div className="bg-neutral-100 border-r-[#28303033] border-r border-solid max-h-[70vh] overflow-auto">
            <MessageList />
          </div>
          <div className="bg-white border-t-[#28303033] border-t border-solid grid grid-cols-[100px_auto_60px] gap-x-5">
            <div className="flex items-center gap-x-5 pl-5">
              <button className="flex justify-center items-center h-6 w-6">
                <Image src={emojiIcon} alt="emoji" />
              </button>
              <button className="flex justify-center items-center h-6 w-6">
                <Image src={imageIcon} alt="image" />
              </button>
            </div>
            <div className="flex items-center justify-center">
              {/* <form id="messege-input"> */}
              <input
                type="text"
                placeholder="Enter your message"
                className="h-11 w-full border text-base font-normal rounded-[10px] border-solid border-[#e0e0e0] no-outline bg-[#f5f5f5] pl-2.5"
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
              />
              {/* </form> */}
            </div>
            <div className="flex items-center">
              <button
                className="h-11 w-11 flex justify-center items-center bg-[#2cbfca] rounded-[10px]"
                onClick={(e: any) => sendMessage(e)}
              >
                <Image src={sendIcon} alt="send" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
