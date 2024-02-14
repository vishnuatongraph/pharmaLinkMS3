import DashHeader from "@/components/common/DashHeader";
import DashSidebar from "@/components/common/DashSidebar";
import React from "react";
import { OwnerDashHeaderData } from "@/utils/constants/dashboard/dashHeader";
import {
  OwnerDashSidebar,
  PharmasistDashSidebar,
} from "@/utils/constants/dashboard/dashSidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F3F3F3] h-[100vh] w-full relative">
      <div className="md:flex md:gap-[30px] h-[100vh] w-full ">
        <div className="max-md:hidden block">
        <DashSidebar sidebarData={PharmasistDashSidebar} />
        </div>
        <DashHeader profilePic={OwnerDashHeaderData.profilePic} />
        <div className="flex flex-col w-full h-[100vh] bg-[#F3F3F3] pt-[84px] md:pl-[20%] pb-[20px] transition-all duration-[0.5s]">
          {children}
        </div>
      </div>
    </div>
  );
}
