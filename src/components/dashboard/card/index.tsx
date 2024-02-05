import React from "react";
import Image from "next/image";
import verifyIcon from "../../../../public/images/verify.svg";
import totalIcon from "../../../../public/images/total.svg";
import chart1 from "../../../../public/images/chart1.svg";
import chart1shadow from "../../../../public/images/images/chart1shadow.svg";
import shiftIcon from "../../../../public/images/images/shift.svg";
import chart2 from "../../../../public/images/images/chart2.svg";
import chart2shadow from "../../../../public/images/images/chart2shadow.svg";

export default function GraphCard() {
  return (
    <div className="flex flex-col lg:flex-row gap-5 mt-[27px]">
      <div className="w-[50%] lg:w-[30.5%] h-auto font-inter bg-white rounded-[10px] px-4 py-[21px]">
        <div className="flex gap-3 items-center">
          <Image src={verifyIcon} alt="check" />
          <p className="p-lg font-semibold leading-[22px] text-greyEighty">
            Number of Shifts & Hours Confirmed
          </p>
        </div>
        <div className="flex gap-[84px] mt-[51px]">
          <div>
            <p className="text-[32px] font-bold leading-[39px] text-dark">18</p>
            <p className="text-sm font-normal leading-[17px] text-greysixty">
              Shifts
            </p>
          </div>
          <div>
            <p className="text-[32px] font-bold leading-[39px] text-dark">
              107
            </p>
            <p className="text-sm font-normal leading-[17px] text-greysixty">
              Hours
            </p>
          </div>
        </div>
      </div>
      <div className="w-[50%] lg:w-[30.5%] relative h-auto font-inter bg-white rounded-[10px] px-4 py-[21px]">
        <div className="flex gap-3 items-center">
          <Image src={totalIcon} alt="check" />
          <p className="p-lg font-semibold leading-[22px] text-greyEighty">
            Total Revenue
          </p>
        </div>
        <div className="flex flex-col gap-[84px] mt-[10px]">
          <p className="text-[32px] font-bold leading-[39px] text-dark">
            $ 1,457
          </p>
        </div>
        <div className="absolute mr-4">
          <Image src={chart1} alt="chart" className="relative" />
          <Image src={chart1shadow} alt="chart" className="absolute top-0" />
        </div>
      </div>
      <div className="w-[50%] lg:w-[30.5%] h-auto font-inter bg-white rounded-[10px] px-4 py-[21px]">
        <div className="flex gap-3 items-center">
          <Image src={shiftIcon} alt="check" />
          <p className="p-lg font-semibold leading-[22px] text-greyEighty">
            Shifts confirmed /availability
          </p>
        </div>
        <div className="flex gap-[84px] mt-[51px]">
          <div>
            <p className="text-[32px] font-bold leading-[39px] text-dark">18</p>
            <p className="text-sm font-normal leading-[17px] text-greysixty">
              Shifts
            </p>
          </div>
          <div>
            <p className="text-[32px] font-bold leading-[39px] text-dark">20</p>
            <p className="text-sm font-normal leading-[17px] text-greysixty">
              Availability
            </p>
          </div>
        </div>
      </div>
      <div className="w-[50%] lg:w-[30.5%] relative h-auto font-inter bg-white rounded-[10px] px-4 py-[21px]">
        <div className="flex gap-3 items-center">
          <Image src={totalIcon} alt="check" />
          <p className="p-lg font-semibold leading-[22px] text-greyEighty">
            Number of KM Traveled
          </p>
        </div>
        <div className="flex gap-[84px] mt-[10px]">
          <p className="text-[32px] font-bold leading-[39px] text-dark">
            324 KM
          </p>
        </div>
        <div className="absolute mr-4">
          <Image src={chart2} alt="chart" className="relative" />
          <Image src={chart2shadow} alt="chart" className="absolute top-0" />
        </div>
      </div>
    </div>
  );
}
