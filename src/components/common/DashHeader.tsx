"use client";
import React, { useState, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { options } from "@/utils/constants/dashboard/dashHeader";
import { DashHeaderData } from "@/utils/constants/dashboard/dashHeader";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { DashHeaderProps } from "@/utils/types/types";
import { Dialog, Transition } from "@headlessui/react";
import {
  PopUpMenu,
  ProfilePopUp,
} from "@/utils/constants/dashboard/profilepopup";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const DashHeader: React.FC<DashHeaderProps> = ({
  profilePic,
  profileName,
  profileGreeting,
}) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    try {
      setSigningOut(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        // console.error("Supabase sign-out error:", error.message);
      } else {
        // console.log("User signed out successfully");
        setShowModal(false);
        router.push("/");
      }
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <div className="bg-white h-[84px] w-[80%] ml-[20%] z-10 flex justify-end py-[17px] rounded-bl-[10px] fixed">
      <form className="flex items-center gap-5 font-inter mr-[80px]">
        <select name="country" id="country">
          {options.map((country, index) => (
            <option value={country.value} key={index}>
              {country.name}
            </option>
          ))}
        </select>
        <Image src={DashHeaderData.notifyIcon} alt="icon" />
        <div className="flex gap-[14px] items-center relative">
          <div className="rounded-full flex justify-center">
            <Image src={profilePic} alt="profile" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <p className="text-xs font-medium leading-[15px] text-[#4C4C58]">
              {profileGreeting}{" "}
            </p>
            <p className="text-base font-semibold leading-[19px] text-[#4C4C58]">
              {profileName}{" "}
            </p>
          </div>
          <button onClick={() => setShowModal(showModal)}>
            <HiOutlineDotsVertical style={{ width: "25px", height: "30px" }} />
          </button>

          <Transition.Root show={!showModal} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-20"
              onClose={() => setShowModal(!showModal)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="absolute right-[5%] top-[7%] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                      <div>
                        <div className="w-[274px] h-[400px] flex justify-center">
                          <div className="w-full h-[74px] bg-[#DBFDFF] relative"></div>
                          <div className="flex flex-col m-auto absolute top-6">
                            <div className="flex flex-col justify-center items-center mt-[16px]">
                              <Image src={ProfilePopUp.profile} alt="" />
                              <p className="text-[#4C4C58] mt-[16px] text-[22px] font-semibold leading-[27px]">
                                {" "}
                                {ProfilePopUp.name}
                              </p>
                              <button
                                onClick={handleLogout}
                                disabled={signingOut}
                                className="w-[103px] mt-[18px] h-[44px] text-dark border border-[#2830301A] rounded-[30px] text-base font-normal leading-[19px]"
                              >
                                {ProfilePopUp.button}
                              </button>
                            </div>
                            <div className="mt-[30px] flex flex-col gap-[18px]">
                              {PopUpMenu.map((data, index) => {
                                return (
                                  <div key={index} className="flex gap-3">
                                    <Image src={data.icon} alt="" />
                                    <p className="text-base font-normal leading-[19px] text-dark">
                                      {data.label}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </form>
    </div>
  );
};

export default DashHeader;
