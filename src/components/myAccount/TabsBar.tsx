import React from "react";

interface tabsprops {
  tabArray?: string[];
}

function TabsBar(props: tabsprops) {
  const { tabArray } = props;

  return (
    <div className="flex flex-col gap-6">
      {tabArray?.map((tab, index) => (
        <h1 key={index} className="text-[16px] font-normal text-[#28303099]">
          {tab}
        </h1>
      ))}
    </div>
  );
}

export default TabsBar;
