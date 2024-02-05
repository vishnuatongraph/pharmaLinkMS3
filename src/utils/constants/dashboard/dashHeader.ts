import eng from "../../../../public/images/eng.svg";
import notify from "../../../../public/images/notification.svg";
import profile from "../../../../public/images/profilePic.svg";
import ownerdashProfile from "../../../../public/images/ownerdashProfile.svg";

export const DashHeaderData = {
  profilePic: profile,
  greeting: "Hello!",
  profileName: "Albert Flores",
  notifyIcon: notify,
};

export const OwnerDashHeaderData = {
  profilePic: ownerdashProfile,
};

export const options = [
  {
    flag: eng,
    name: "ENG",
    value: "eng",
  },
  {
    flag: "",
    name: "AUS",
    value: "aus",
  },
  {
    flag: "",
    name: "USA",
    value: "usa",
  },
  {
    flag: "",
    name: "Fra",
    value: "fra",
  },
];
