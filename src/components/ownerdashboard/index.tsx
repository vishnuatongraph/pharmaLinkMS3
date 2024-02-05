import React from "react";
import OwnerConfirmContract from "./confirm";
import OwnerGraph from "../dashboard/ownergraph";

export default function OwnerDashboard() {
  return (
    <div className="flex flex-col gap-[23px] mt-[27px] mr-[70px]">
      <OwnerGraph />
      <div className="flex gap-[30px] w-full">
        <div className="w-[60%] h-[630px] bg-gray">Calendar</div>
        <OwnerConfirmContract />
      </div>
    </div>
  );
}
