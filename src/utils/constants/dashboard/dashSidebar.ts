import dashboard from "../../../../public/images/dashboard.svg";
import request from "../../../../public/images/request.svg";
import account from "../../../../public/images/account.svg";
import message from "../../../../public/images/message.svg";
import note from "../../../../public/images/availability.svg";
import tools from "../../../../public/images/tools.svg";
import billing from "../../../../public/images/billing.svg";
import contract from "../../../../public/images/contract.svg";
import support from "../../../../public/images/support.svg";
import discover from "../../../../public/images/discover.svg";

export const PharmasistDashSidebar = [
  {
    icon: dashboard,
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    icon: request,
    label: "Requests",
    route: "",
  },
  {
    icon: account,
    label: "My Account",
    route: "",
  },
  {
    icon: message,
    label: "Message",
    route: "/message",
  },
  {
    icon: note,
    label: "Availability",
    route: "",
  },
  {
    icon: tools,
    label: "Tools",
    route: "",
  },
  {
    icon: billing,
    label: "Billing notifications",
    route: "",
  },
  {
    icon: contract,
    label: "Contracts",
    route: "",
  },
  {
    icon: support,
    label: "Support line",
    route: "",
  },
];

export const OwnerDashSidebar = [
  {
    icon: dashboard,
    label: "Dashboard",
  },
  {
    icon: discover,
    label: "Discover",
  },
  {
    icon: account,
    label: "My Account",
  },
  {
    icon: message,
    label: "Message",
  },
  {
    icon: note,
    label: "Billing & payments",
  },
  {
    icon: tools,
    label: "Contracts",
  },
  {
    icon: billing,
    label: "Billing notifications",
  },
  {
    icon: contract,
    label: "Contracts",
  },
  {
    icon: request,
    label: "Requests",
    route: "request",
  },
  {
    icon: support,
    label: "Support line",
  },
];
