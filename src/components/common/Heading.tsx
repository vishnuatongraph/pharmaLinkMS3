import React from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.svg";

export default function Heading() {
  return (
    <>
      <Image
        src={logo}
        alt="logo"
        className="sm:w-[341px] w-[250px] h-[36px]"
      />
    </>
  );
}
