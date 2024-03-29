"use client";

import Image from "next/image";
import activeProfile from "../../../public/images/profile4.svg";
import searchIcon from "../../../public/images/searchIcon.svg";
import optionsIcon from "../../../public/images/optionsIcon.svg";
import sendIcon from "../../../public/images/send.svg";
import imageIcon from "../../../public/images/image.svg";
import emojiIcon from "../../../public/images/emoji.svg";
import leftArrow from "../../../public/images/leftArrow.svg";
import MessageList from "./MessageList";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";
import closeIcon from "../../../public/images/close.png";
import EmojiPicker from "emoji-picker-react";

interface RealtimeEvent {
  table: string;
  type: string;
  new: any;
  schema: String;
}

const Chat: React.FC<{
  hostUserId: number;
  setShowChat: Dispatch<SetStateAction<boolean>>;
}> = ({ hostUserId, setShowChat }) => {
  const searchParams = useSearchParams();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchVisible, setSearchVisilbe] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const router = useRouter();
  const [user, setUser] = useState<{
    Name: string;
    id: number;
    profileUrl: string;
    isActive: boolean;
  } | null>(null);
  const [message, setMessage] = useState("");

  const fetchUser = async () => {
    if (searchParams.get("id")) {
      try {
        const { data: userExistsData, error: userExistsError } =
          await supabaseClient
            .from("SupabaseUsers")
            .select()
            .eq("id", searchParams.get("id"));

        if (userExistsError) {
          setFetchError("Could not check user existence");
          setUser(null);
          return;
        }
        if (userExistsData) {
          setUser(userExistsData[0]);
          setIsActive(userExistsData[0].isActive);
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
    setSearchVisilbe(false);
    setSearchKey("");

    const channels = supabaseClient
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "SupabaseUsers" },
        (payload) => {
          setIsActive(payload.new.isActive);
        }
      )
      .subscribe();
  }, [searchParams]);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPicker(false);
    if (message.trim().length !== 0) {
      try {
        const res = await supabaseClient.from("SupabaseMessages").insert([
          {
            senderId: hostUserId,
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

  const handleFileUpload = (e: any) => {
    const uploadForm = document.getElementById("upload-input");
    uploadForm?.click();
  };

  const handleEmojiSelection = (emoji: any) => {
    setMessage((message) => message + emoji.emoji);
  };

  async function uploadImageToBucket(file: File | null | string) {
    try {
      if (
        file &&
        typeof file != "string" &&
        process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME
      ) {
        const filename = `${file.name}`;
        const { data, error } = await supabaseClient.storage
          .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME)
          .upload(filename, file, {
            cacheControl: "3600",
            upsert: false,
          });
        if (data) {
          return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${data?.path}`;
        }
        return error.message;
      }
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        return error.message;
      }
      // Handle other cases if needed
      return "An unknown error occurred";
    }
  }

  function isValidImageUrl(url: string) {
    // Check if the string is a valid URL
    try {
      new URL(url);
    } catch (error) {
      return false;
    }
    // Check if the URL ends with a known image extension
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const extension = url?.split(".")?.pop()?.toLowerCase() || "";
    return imageExtensions.includes(extension);
  }

  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    const imageUrl = (await uploadImageToBucket(selectedFile)) || "";
    if (isValidImageUrl(imageUrl)) {
      setMessage(imageUrl);
    }
  };

  return (
    <>
      {user && (
        <div className="grid grid-rows-[90px_auto_90px] h-full w-full">
          <div className="bg-white border-b-[#28303033] border-b border-solid flex justify-between items-center px-5 z-[5]">
            <div className="flex flex-row gap-x-5 max-sm:gap-x-2">
              <button
                className="sm:hidden h-11 w-11 overflow-hidden rounded-[50%] flex justify-center items-center border border-solid border-[#28303022]"
                onClick={() => {
                  setShowChat(false);
                  router.push("/message");
                }}
              >
                <Image src={leftArrow} alt="back" height={15} width={15} />
              </button>
              <div
                className={`h-11 w-11 overflow-hidden rounded-[50%] border border-solid border-[#28303022] ${searchVisible ? "max-sm:hidden" : ""}`}
              >
                {!user.profileUrl && (
                  <Image src={activeProfile} alt="profile" />
                )}
                {user.profileUrl && (
                  <Image
                    src={user.profileUrl}
                    alt="profile"
                    height={100}
                    width={100}
                  />
                )}
              </div>
              <div
                className={`flex flex-col justify-center ${searchVisible ? "max-sm:hidden" : ""}`}
              >
                <p className="text-lg font-semibold text-black max-sm:text-sm">
                  {user?.Name}
                </p>
                {isActive && (
                  <p className="text-sm font-normal text-[#2cbfca]">
                    Active now
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-x-5 items-center">
              <div
                className={`relative flex flex-row gap-x-2 h-[35px] justify-center items-center px-[5px] rounded-[20px] transition-[0.5s]
                              ${searchVisible ? "bg-[#f3f3f3]" : "bg-[#ffffff]"}
              `}
              >
                {searchVisible && (
                  <input
                    type="text"
                    className="bg-[#00000000] no-outline pl-[10px] transition-[0.5s] text-[#283030aa] max-sm:max-w-[40vw] sm:max-w-[20vw]"
                    placeholder="Search Messages "
                    onChange={(e) => {
                      setSearchKey(e.target.value);
                    }}
                  />
                )}

                <button
                  className="h-6 w-6 flex justify-center items-center"
                  onClick={() => {
                    setSearchVisilbe(!searchVisible);
                    setSearchKey("");
                  }}
                >
                  {!searchVisible && <Image src={searchIcon} alt="search" />}
                  {searchVisible && (
                    <Image src={closeIcon} alt="close" className="h-4 w-4" />
                  )}
                </button>
              </div>
              <button className="h-6 w-6 flex justify-center items-center">
                <Image src={optionsIcon} alt="options" />
              </button>
            </div>
          </div>
          <div className="bg-neutral-100 border-r-[#28303033] border-r border-solid max-h-[70vh] overflow-auto relative">
            <MessageList searchKey={searchKey} hostUserId={hostUserId} />
          </div>
          <div className="relative">
            {showPicker && (
              <div className="absolute bottom-[90px] left-[30px]">
                <EmojiPicker
                  height={300}
                  width={400}
                  searchDisabled
                  onEmojiClick={handleEmojiSelection}
                />
              </div>
            )}
            <div className="bg-white border-t-[#28303033] border-t border-solid grid grid-cols-[100px_auto_60px] gap-x-5 max-sm:gap-x-2 h-full w-full">
              <div className="flex items-center gap-x-5 pl-5 relative overflow-hidden">
                <button
                  className="flex justify-center items-center h-6 w-6"
                  onClick={() => {
                    setShowPicker(!showPicker);
                  }}
                >
                  <Image src={emojiIcon} alt="emoji" />
                </button>
                <button
                  className="flex justify-center items-center h-6 w-6 "
                  onClick={handleFileUpload}
                >
                  <Image src={imageIcon} alt="image" />
                </button>
                <input
                  type="file"
                  id="upload-input"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex items-center justify-center relative">
                <form
                  id="messege-input"
                  className="w-full"
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage(e);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter your message"
                    className="h-11 w-full border text-base font-normal rounded-[10px] border-solid border-[#e0e0e0] no-outline bg-[#f5f5f5] pl-2.5"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    value={message}
                  />
                </form>
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
        </div>
      )}
    </>
  );
};

export default Chat;
