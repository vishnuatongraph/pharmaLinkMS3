"use client";

import FormStepContext from "@/context/userProfileContext";
import { useContext } from "react";
import { dbRoles } from "@/utils/constants/roles";
import UserProfilePage from "./user-profile-page";
import OwnerProfilePage from "./owner-profile-page";

export default function ProfilePageComponent() {
  const { userRole } = useContext(FormStepContext);
  return (
    <>
      {userRole == dbRoles.USER && <UserProfilePage />}

      {userRole == dbRoles.OWNER && <OwnerProfilePage />}
    </>
  );
}
