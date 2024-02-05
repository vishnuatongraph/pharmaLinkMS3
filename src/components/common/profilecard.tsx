import React from "react";
import { CardProps } from "@/utils/types/types";

const ProfileCard: React.FC<CardProps> = ({ heading = "", list = [] }) => {
  return (
    <div className="w-full h-full rounded-lg bg-white py-[30px] pl-5 pr-[67px]">
      <div>
        <h2 className="font-inter text-xl font-semibold leading-6 text-left">
          {heading}
        </h2>
        <ul>
          {list.map((item: any, index: number): any => (
            <li
              key={index}
              className="font-inter text-sm font-normal leading-7 text-left"
            >
              {item.listitem}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
