import React from "react";
import Image from "next/image";

interface barProps {
  name: string;
  text: string;
  image: string;
  tab: string;
}

function ProfileNavbar(props: barProps) {
  const { name, text, image, tab } = props;

  return (
    <div className="flex gap-2 items-center w-full">
      <div>
        <Image src={image} alt="profile" width={80} height={80} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[#4C4C58] text-[18px] font-semibold">
          {name} / {tab}
        </h1>
        <h1 className="text-[#4C4C5899] text-[16px] font-normal">{text}</h1>
      </div>
    </div>
  );
}

export default ProfileNavbar;
