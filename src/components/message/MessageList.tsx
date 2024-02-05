import "./MessageList.css";
import doubleTick from "../../../public/images/tick.svg";
import blueTick from "../../../public/images/blueTick.svg";
import Image from "next/image";
import { supabaseClient } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import moment from "moment";

interface RealtimeEvent {
  table: string;
  type: string;
  new: any;
  schema: String;
}



function MessageList() {
  const searchParams = useSearchParams();
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  // const [prevDate, setPrevDate] = useState<any>();
  const userIdRef = 1; //useRef<number | null>(null);
  let prevDate: string;

  // if (typeof window !== "undefined" && window.localStorage) {
  //   let storedUserId = localStorage.getItem("supabaseSenderId");

  //   if (storedUserId) {
  //     userIdRef = parseInt(storedUserId, 10);
  //   }
  // }

 
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("SupabaseMessages")
        .select("*")
        .or(
          `and(senderId.eq.${userIdRef},receiverId.eq.${searchParams.get(
            "id"
          )}),and(senderId.eq.${searchParams.get(
            "id"
          )},receiverId.eq.${userIdRef})`
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setFetchError(error.message);
      } else {
        setMessages(data || []);
        // Mark received messages as rea
        markMessagesAsRead(data);
      }
    } catch (error: any) {
      console.error(error);
      setFetchError(error.message);
    }
  };

  const markMessagesAsRead = async (messagesToMarkAsRead: any) => {
    const unreadMessages = messagesToMarkAsRead.filter(
      (msg: any) => msg.receiverId === userIdRef && !msg.isRead
    );

    if (unreadMessages.length > 0) {
      const messageIds = unreadMessages.map((msg: any) => msg.id);

      try {
        await supabaseClient
          .from("SupabaseMessages")
          .update({ isRead: true })
          .in("id", messageIds);
      } catch (error: any) {
        console.error("Error marking messages as read:", error.message);
      }
    }
  };

  const handleSubscription = (
    event: RealtimeEvent,
    payload: any,
    error: any
  ): any => {
    const isNewMessageExist = messages.some((msg) => msg.id === event.new.id);
    const isMessageForReceiver =
      (event.new.senderId == userIdRef &&
        event.new.receiverId == searchParams.get("id")) ||
      (event.new.senderId == searchParams.get("id") &&
        event.new.receiverId == userIdRef);
    const newMessage = [event.new];

    if (event.new.senderId == searchParams.get("id")) {
      markMessagesAsRead(newMessage);
    }

    if (!isNewMessageExist && isMessageForReceiver) {
      // Insert new message into the state
      fetchMessages();
    } else if (isMessageForReceiver && event.type === "UPDATE") {
      // Update existing message in the state
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === event.new.id ? { ...msg, isRead: event.new.isRead } : msg
        )
      );
    }
  };

  useEffect(() => {
    fetchMessages();
    const subscription = supabaseClient
      .channel("RealtimeSubscription")
      .on(
        "postgres_changes" as any,
        { event: "*", schema: "public", table: "SupabaseMessages" } as any,
        handleSubscription as any
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [searchParams]);



  return (
    <div className="w-full pl-2.5 pr-5 py-2.5 flex flex-col-reverse gap-y-2.5 overflow-scroll no-scrollbar" id="message-cont">
      {messages?.map((message, index) => {
        const currentFullTime = moment(message.created_at).format(
          "DD MMM ddd [at] h:mm A"
        );
        const currentDate = moment(message.created_at).format("DD MMM ddd");

        // Only show the date when it changes
        const showDate = prevDate !== currentDate;
        prevDate = currentDate;
        return (
          <div className="flex flex-col gap-y-2.5"  key={message.id}>
            {showDate && <div className="self-center text-base font-normal text-[#28303088] my-5">{currentFullTime}</div>}
            <div
              className={`w-fit flex flex-col max-w-[60%] items-end p-0
                       ${
                         message.senderId == userIdRef
                           ? "self-end"
                           : "self-start"
                       }
        `}
            >
              <p
                className={`text-base font-normal text-[#001c3cbb] p-2.5 rounded-[10px]
                       ${
                         message.senderId == userIdRef
                           ? "bg-[#2cbfca55]"
                           : "bg-white"
                       }
          `}
              >
                {message.content}
              </p>
              <div className="flex flex-row gap-x-[5px]">
                <p className="text-sm font-normal text-[#28303088]">
                  {moment(message.created_at).format("hh:mm A")}
                </p>
                {message.senderId == userIdRef && !message.isRead && (
                  <Image src={doubleTick} alt=""></Image>
                )}
                {message.senderId == userIdRef && message.isRead && (
                  <Image src={blueTick} alt=""></Image>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessageList;
