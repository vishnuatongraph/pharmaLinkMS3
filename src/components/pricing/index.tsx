import React from "react";
import Heading from "../common/Heading";
import pic1 from "../../../public/images/pic1.png";
import image1 from "../../../public/images/image1.png";
import image2 from "../../../public/images/image2.png";
import Image from "next/image";
import { contents, headings, paragraphs } from "@/utils/constants/pricing";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PricingBtn from "./pricingBtn";

async function Pricing() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // const { pushToPage } = useRouting();
  return (
    <div className="flex items-center flex-col font-inter bg-white">
      <div className="w-full h-[405px] bg-gradient-to-t from-[#2cbfca5c] to-white">
        <div className="absolute top-[11rem] right-[15rem]">
          <Image src={image1} height={80} width={80} alt="image1" />
        </div>
        <div className="absolute top-[13rem] left-[17rem]">
          <Image src={image2} height={50} width={50} alt="image2" />
        </div>
        <div className="absolute top-[18rem] left-[10rem]">
          <Image src={image2} height={30} width={30} alt="image2" />
        </div>
        <div className="flex flex-col justify-center items-center mt-10 md:mt-0">
          <div className="md:my-[50px] sm:my-[30px] my-[16px]">
            <Heading />
          </div>
          <h1 className="text-[30px] md:text-[40px] text-dark mt-[0px] mb-[0px] font-semibold text-center leading-[35px] md:leading-[48.41px]">
            {contents.SIMPLE_AND_TRANSPARENT_PRICING}
          </h1>
          <h6 className="text-dark h-22 font-normal text-[16px] md:text-[18px] mt-4 mb-4  leading-[18px] md:leading-[21.78px] text-center">
            {contents.PRICING_CONTENTS}
          </h6>
        </div>
      </div>
      <div className="md:max-w-[800px] w-[80%] shadow-2xl rounded-3xl relative top-[-140px]">
        <div className="h-[198px] p-8 bg-[#36C6D1] flex justify-between items-center rounded-t-3xl">
          <div className="flex flex-col text-white">
            <div className="flex flex-row">
              <h6 className="font-bold text-[20px] mt-3">$</h6>
              <h2 className="h-33 text-[40px] md:text-[46px] font-bold">
                12.00
              </h2>
              <h6 className="md:mt-[30px] mt-[20px] text-[14px] sm:text-[16px] md:text-[20px] font-normal leading-[16px] md:leading-[24.2px]">
                /Per month
              </h6>
            </div>
            <h6 className="h-12 font-semibold text-[24px] leading-[20px] md:leading-[29px]">
              {contents.MONTHLY_FEES}
            </h6>
            <h6 className="h-12 font-normal  text-[14px] sm:text-[16px] leading-[19px]">
              {contents.FEATURES_AVAILABLE}
            </h6>
          </div>
          <div>
            <Image src={pic1} width={160} height={160} alt="logo"></Image>
          </div>
        </div>
        <div className="p-8 text-dark">
          <ul>
            <li className="flex items-baseline gap-[1rem] mb-2 mt-2">
              <div className="round_checkbox">
                <input type="checkbox" id="checkbox_2" checked />
                <label htmlFor="checkbox_2"></label>
              </div>
              <div className="flex flex-col">
                <h6 className="text-[18px] font-semibold">
                  {headings.heading1}
                </h6>
                <p className="text-[14px] mb-1 mt-1">{paragraphs.paragraph1}</p>
              </div>
            </li>
            <li className="flex items-baseline gap-[1rem] mb-2 mt-2">
              <div className="round_checkbox">
                <input type="checkbox" id="checkbox_3" checked />
                <label htmlFor="checkbox_3"></label>
              </div>
              <div className="flex flex-col">
                <h6 className="text-[18px] font-semibold">
                  {headings.heading2}
                </h6>
                <p className="text-[14px] mb-1 mt-1">{paragraphs.paragraph2}</p>
              </div>
            </li>
            <li className="flex items-baseline gap-[1rem] mb-2 mt-2">
              <div className="round_checkbox">
                <input type="checkbox" id="checkbox_4" checked />
                <label htmlFor="checkbox_4"></label>
              </div>
              <div className="flex flex-col">
                <h6 className="text-[18px] font-semibold">
                  {headings.heading3}
                </h6>
                <p className="text-[14px] mb-1 mt-1">{paragraphs.paragraph3}</p>
              </div>
            </li>
            <li className="flex items-baseline gap-[1rem] mb-2 mt-2">
              <div className="round_checkbox">
                <input type="checkbox" id="checkbox_5" checked />
                <label htmlFor="checkbox_5"></label>
              </div>
              <div className="flex flex-col">
                <h6 className="text-[18px] font-semibold">
                  {headings.heading4}
                </h6>
                <p className="text-[14px] mb-1 mt-1">{paragraphs.paragraph4}</p>
              </div>
            </li>
            <li className="flex items-baseline gap-[1rem] mb-2 mt-2">
              <div className="round_checkbox">
                <input type="checkbox" id="checkbox_6" checked />
                <label htmlFor="checkbox_6"></label>
              </div>
              <div className="flex flex-col">
                <h6 className="text-[18px] font-semibold">
                  {headings.heading5}
                </h6>
                <p className="text-[14px] mb-1 mt-1">{paragraphs.paragraph5}</p>
              </div>
            </li>
            <li className="flex items-baseline gap-[1rem] mb-2 mt-2">
              <div className="round_checkbox">
                <input type="checkbox" id="checkbox_1" checked />
                <label htmlFor="checkbox_1"></label>
              </div>
              <div className="flex flex-col">
                <h6 className="text-[18px] font-semibold">
                  {headings.heading6}
                </h6>
                <p className="text-[14px] mb-1 mt-1">{paragraphs.paragraph6}</p>
              </div>
            </li>
          </ul>
          <PricingBtn />
        </div>
      </div>
    </div>
  );
}

export default Pricing;
