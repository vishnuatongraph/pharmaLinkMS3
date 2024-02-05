"use client";
import React from "react";
import Slider from "react-slick";
import {
  SliderPage1,
  SliderPage2,
  SliderPage3,
  bottomdata,
} from "./sliderdata";
import Image from "next/image";
// Define the props type for your SliderComponent
interface SliderComponentProps {}

const SliderComponent: React.FC<SliderComponentProps> = () => {
  // Configuration for the Slider
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    arrows: false,
    autoplaySpeed: 3000,
    cssEase: "linear",
    customPaging: function () {
      return (
        <div className="w-[6.4px] h-[6.4px] border border-aqua rounded-full"></div>
      );
    },
  };

  return (
    <div className="lg:w-[54.2%] hidden lg:block bg-light font-inter">
      <Slider {...settings}>
        <div className="w-full pt-32 xl:pt-44 px-[60px] bg-light h-full">
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-[481px] mx-20 py-6 flex justify-center items-center">
              <Image
                src={SliderPage1.leftImage}
                alt="circle"
                className="absolute left-0 top-0"
              />
              <Image src={SliderPage1.image} alt="doctor" className="m-auto" />
              <Image
                src={SliderPage1.rightImage}
                alt="eye"
                className="absolute -right-16 -bottom-16"
              />
            </div>

            <div className="text-center justify-center items-center flex flex-col gap-[30px] mt-[70px]">
              <h1 className="font-inter text-4xl font-semibold leading-[44px] text-dark">
                {SliderPage1.heading}
              </h1>
              <p className="font-inter text-[22px] font-normal leading-[35px] text-dark w-[70%]">
                {SliderPage1.paragraph}
              </p>
            </div>
          </div>
        </div>
        <div className=" w-full pt-20 sm:pt-28 md:pt-32 xl:pt-44 px-[60px] bg-light h-full">
          <div className="mb-20 h-[650px]">
            {SliderPage2.map((item, index) => {
              return (
                <div
                  className="flex flex-col gap-[30px] md:gap-[60px]"
                  key={index}
                >
                  <div className="flex flex-col gap-3 md:gap-5">
                    <div className="flex gap-3">
                      <Image src={item.image} alt="icon" />
                      <h3 className="font-inter text-2xl font-bold leading-[29px] text-left text-dark">
                        {item.heading}
                      </h3>
                    </div>
                    <div>
                      <p className="font-inter text-lg font-normal leading-[33px] text-left text-textgray">
                        {item.paragraph}
                      </p>
                    </div>
                  </div>
                  <div>
                    {item.listData?.map((list, index) => {
                      return (
                        <ul className="flex flex-col gap-[30px]" key={index}>
                          <li className="flex gap-3 text-textgray">
                            <Image src={list.listImage} alt="check" />
                            {list.label}
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className="flex flex-col justify-center items-center gap-5 lg:mt-14 xl:mt-32">
              <Image src={bottomdata.subImage} alt={bottomdata.subImage} />
              <p className="font-inter text-base font-normal leading-[17px] text-center text-dark">
                {bottomdata.subParagraph}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-dark h-full text-white md:p-[60px] relative text-center bg-cover custom-div">
          <Image
            src={SliderPage3.backgroundImage}
            alt="graph"
            className="absolute z-0 w-[90%] h-[80%]"
          />

          <div className="xl:my-48 my-36 mx-2 xl:mx-24  w-[80%] md:max-w-[590.55px] max-h-[744.82px] flex flex-col gap-[55px]">
            <div className="relative">
              {SliderPage3.groupdata.map((imgurl, index) => {
                return (
                  <Image
                    key={index}
                    src={imgurl.image}
                    alt={imgurl.image}
                    className={imgurl.className}
                  />
                );
              })}
              <Image
                src={SliderPage3.image}
                alt="doctor"
                className="m-auto z-10"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-[47px]">
              <div className="flex flex-col justify-center items-center gap-4">
                <Image src={SliderPage3.rating} alt="rating" />
                <p className="font-inter text-base font-semibold italic leading-[19px] text-center">
                  {SliderPage3.paragraph}
                </p>
              </div>
              <div className="flex gap-[10px]">
                <Image src={SliderPage3.subImage} alt="doctor" />
                <div>
                  <p className="font-inter text-sm font-bold leading-[17px] tracking-normal">
                    {SliderPage3.heading}
                  </p>
                  <p className="font-inter text-xs font-normal leading-[15px] tracking-normal text-left">
                    {SliderPage3.subHeading}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;
