"use client";
import React from "react";
import Image from "next/image";
import Heading from "@/components/common/Heading";
import { usePathname } from "next/navigation";
import useRouting from "@/hooks/routing";
import { DashboardSidebarProps } from "@/utils/types/types";

const DashSidebar: React.FC<DashboardSidebarProps> = ({ sidebarData }) => {
  const { pushToPage } = useRouting();
  const pathname = usePathname();
  const isActive = (link: string) => {
    return pathname === link;
  };
  return (
    <div className="w-[18%] h-full bg-white pt-8 fixed">
      <div className="flex flex-col justify-center items-center gap-[62px]">
        <div className="w-[176px] h-[19px]">
          <Heading />
        </div>
        <div className="flex flex-col gap-5 text-dark font-inter">
          {sidebarData.map((data: any, index) => {
            const activeStyle = isActive(data.route)
              ? { color: "#2CBFCA" } // Apply styles if the route matches
              : {};
            return (
              <div
                className="flex gap-3"
                key={index}
                onClick={() => {
                  data?.route && pushToPage(data.route);
                }}
              >
                <Image src={data.icon} alt="icon" style={activeStyle} />
                <label
                  className="text-base font-normal leading-[19px] text-left cursor-pointer"
                  style={activeStyle}
                >
                  {data.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default DashSidebar;
