import React from "react";
import ProfileNavbar from "./profileNavbar";
import TabsBar from "./TabsBar";
import { formIcons } from "@/utils/constants/personalDetails";

const tabsArray: string[] = [
  "General",
  "Edit Profile",
  "Password",
  "Work Information",
  "Card Information",
];

function OwnerAccountPage() {
  return (
    <div className="flex flex-col gap-8 w-full mt-[20px] bg-white p-[20px] rounded-md">
      <ProfileNavbar
        name="Rimon Mikhail Pharmacist Inc."
        image={formIcons.profile}
        text="Update you profile and manage your account"
        tab="General"
      />
      <div>
        <TabsBar tabArray={tabsArray} />
      </div>
    </div>
  );
}

export default OwnerAccountPage;
