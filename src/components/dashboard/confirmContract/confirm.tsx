import React from "react";
import { ConfirmData } from "@/utils/constants/dashboard/confirmContract";
import { HiOutlineLocationMarker } from "react-icons/hi";
import messagesIcon from "../.../../../../../public/images/message.svg";
import Image from "next/image";

export default function ConfirmContract() {
  return (
    <div className="rounded-[10px] bg-white mt-20 font-inter w-fit pb-5">
      <div className="border-b py-5 pl-3 border-[#E9E9E9] text-lg font-semibold leading-[22px] text-left text-greyEighty">
        Confirmed Contracts
      </div>
      <div>
        {ConfirmData.map((data, index) => {
          return (
            <div key={index} className="flex border-b border-[#E9E9E9] p-2">
              <div className="border-r border-[#D9D9D9] pr-2 text-center">
                <p>{data.date}</p>
                <p>{data.time}</p>
                <button className={data.class}>{data.shiftbutton}</button>
              </div>
              <div className="pl-[10px] pt-[15px] flex items-center gap-2">
                <div className="flex flex-col gap-2">
                  <p className="text-dark font-medium text-[15px] leading-[15px]">
                    {data.name}
                  </p>
                  <p className="flex text-xs items-center text-greyEighty leading-[12px]">
                    <HiOutlineLocationMarker />
                    {data.location}
                  </p>
                </div>
                <div className="w-[32px] h-[32px] rounded-full border flex justify-center border-greyten">
                  <Image src={messagesIcon} alt="icon" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
