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
      <div className="flex gap-[30px] h-auto w-full">
        <DashSidebar sidebarData={PharmasistDashSidebar} />
        <DashHeader profilePic={OwnerDashHeaderData.profilePic} />
        <div className="flex flex-col w-full h-full bg-[#F3F3F3] mt-[84px] ml-[20%]">
          {children}
        </div>
      </div>
    </div>
  );
}
