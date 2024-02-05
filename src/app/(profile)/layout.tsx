"use client";
import Heading from "@/components/common/Heading";
import UserSideBar from "@/components/user-profile/sidebar";
import OwnerSideBar from "@/components/owner-profile/sidebar";
import FormStepContext from "@/context/userProfileContext";
import { LOGGED_IN_USER, dbRoles } from "@/utils/constants/roles";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import SpinnerLoader from "@/components/common/SpinnerLoader";
import useRouting from "@/hooks/routing";

async function getUsersData() {
  return await fetch("/api/fetch-user-data").then((res) => res.json());
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pushToPage } = useRouting();
  const { data, isLoading, refetch } = useQuery({
    queryKey: [`${LOGGED_IN_USER}`],
    queryFn: () => getUsersData(),
    refetchOnMount: true,
    refetchOnWindowFocus: "always",
  });

  // console.log("Thissssssssss", isRefetching, refetch());
  const [formStepCount, setFormStepCount] = useState(1);
  const [userData, setUserData] = useState({});

  const previousStep = async () => {
    if (formStepCount > 1) {
      setFormStepCount(formStepCount - 1);
    }
  };

  const nextStep = async () => {
    await refetch();
    setTimeout(() => {
      setFormStepCount(formStepCount + 1);
    }, 1000);
  };

  useEffect(() => {
    if (data) {
      const stepsInDb = data.data?.completed_steps;
      if (stepsInDb) {
        setUserData(data?.data);
        // doing +1 as these are completed steps , so now he/she needs to go to nextStep than that
        setFormStepCount(Number(stepsInDb) + 1);
      } else {
        if (data?.metaData) {
          setUserData(data?.metaData);
        }
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <>
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
          <SpinnerLoader isPageLoader={true} />
        </div>
      </>
    );
  }

  const userRole = data?.userRole;

  if (!userRole) {
    pushToPage("/");
    return <></>;
  }
  return (
    <div className="px-[70px] py-[46px] bg-[#F3F3F3]">
      <div className="bg-[#F3F3F3] w-[220px] h-[24px]">
        <Heading />
      </div>
      <FormStepContext.Provider
        value={{ formStepCount, nextStep, previousStep, userRole, userData }}
      >
        <div className="flex flex-col lg:flex-row mt-[41px] gap-[18px]">
          <div className="w-[20vw] h-full ">
            {userRole == dbRoles.USER ? <UserSideBar /> : <OwnerSideBar />}
          </div>

          {children}
        </div>
      </FormStepContext.Provider>
    </div>
  );
}
