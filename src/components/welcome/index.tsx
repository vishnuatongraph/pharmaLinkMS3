"use client";
import React, { useState } from "react";
import ButtonComponent from "../common/Button";
import Image from "next/image";
import Heading from "../common/Heading";
import { showingRoles } from "@/utils/constants/roles";
import useRouting from "@/hooks/routing";
import imagedata from "./imagedata";
import { contents, buttonText } from "@/utils/constants/welcome";

export default function Welcome() {
  const { pushToPage } = useRouting();
  const [loadingBtn1, setLoadingBtn1] = useState("");
  const [loadingBtn2, setLoadingBtn2] = useState("");

  return (
    <div className="flex justify-center items-center md:h-full font-inter h-[100vh] bg-white">
      <div className="w-[90%] h-[90%] md:mt-[111px] mt-0 mb-6 md:h-[741px] relative md:w-[1174px] flex justify-center items-center">
        {imagedata.map((image, index) => {
          return (
            <Image
              key={index}
              src={image.imgurl}
              width={image.width}
              height={image.height}
              alt="doctor"
              className={image.className}
            ></Image>
          );
        })}

        <div className="flex flex-col max-w-[959px] h-[392px] gap-5 md:gap-[30px] items-center justify-center text-center">
          <Heading />
          <div className="flex flex-col justify-center items-center gap-[35px] md:gap-[61px]">
            <div className="flex flex-col gap-4 text-center justify-center items-center">
              <h1 className="tracking-normal sm:w-max text-[35px] md:text-[60px] xl:text-[4.75rem] font-semibold md:leading-[91px] leading-[40px] text-dark">
                {contents.WELCOME_TO_PHARMALINK}
              </h1>
              <p className="sm:text-[1.375rem] text-[16px] sm:leading-9 font-normal text-gray w-full md:w-[70%] leading-[22px]">
                {contents.HOME_PAGE_CONTENT}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-[20px] md:gap-[30px] justify-center">
              <ButtonComponent
                type="button"
                selected
                bgColor="bg-white hover:bg-[#f3f3f3]"
                textColor="text-aqua"
                loading={loadingBtn1}
                onClick={() => {
                  setLoadingBtn1("true");
                  setTimeout(() => {
                    pushToPage(`/${showingRoles.PHARMACYOWNER}/login`);
                  }, 500);
                }}
              >
                {buttonText.PHARMACIST}
              </ButtonComponent>
              <ButtonComponent
                type="button"
                selected
                bgColor="bg-aqua hover:bg-[#20989E]"
                textColor="text-white"
                loading={loadingBtn2}
                onClick={() => {
                  setLoadingBtn2("true");
                  setTimeout(() => {
                    pushToPage(`/${showingRoles.PHARMACYOWNER}/login`);
                  }, 500);
                }}
              >
                {buttonText.PHARMACY_OWNER}
              </ButtonComponent>
            </div>
          </div>
          <p className="text-gray font-normal md:text-[1.125rem] text-[13px] sm:leading-[21.78px]">
            {contents.ACTIVE_USER}
          </p>
        </div>
      </div>
    </div>
  );
}
