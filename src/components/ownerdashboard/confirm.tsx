import React from "react";
import { OwnerConfirmData } from "@/utils/constants/dashboard/confirmContract";
import messagesIcon from "../../../public/images/messages.svg";
import Image from "next/image";

export default function OwnerConfirmContract() {
  return (
    <div className="rounded-[10px] bg-white font-inter w-[36.7%] pb-5">
      <div className="border-b py-5 pl-3 border-[#E9E9E9] text-lg font-semibold leading-[22px] text-left text-greyEighty">
        Confirmed Contracts
      </div>
      <div>
        {OwnerConfirmData.map((data, index) => {
          return (
            <div key={index} className="flex border-b border-[#E9E9E9] p-2">
              <div className="border-r border-[#D9D9D9] pr-2 text-center w-[50%]">
                <p>{data.date}</p>
                <p>{data.time}</p>
                <button className={data.class}>{data.shiftbutton}</button>
              </div>
              <div className="pl-[10px] pt-[15px] flex items-center w-full justify-between gap-2">
                <div className="flex gap-[14px] items-center">
                  <div className="w-[40px] h-[40px] flex justify-center rounded-full">
                    <Image src={data.imgurl} alt="profile" />
                  </div>
                  <p className="text-dark font-medium text-[15px] leading-[15px]">
                    {data.name}
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
