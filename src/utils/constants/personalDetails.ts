import cameraIcon from "../../../public/images/cameraIcon.svg";
import profilePhoto from "../../../public/images/profilePhoto.svg";
import editIcon from "../../../public/images/editIcon.svg";
import addIcon from "../../../public/images/addIcon.svg";
import checkIcon from "../../../public/images/checkIcon.svg";
import deleteIcon from "../../../public/images/deleteIcon.svg";

export const PersonalData = {
  mainHeading: "Personal details",
  heading: "Jakob Zinnitsch",
  aiButtonName: "AI generate Profile",

  emailLabel: "Email",
  emailType: "text",
  emailName: "email",
  emailId: "email",
  emailPlaceholder: "dammy@info.com",

  phoneLabel: "Phone number",
  phoneType: "text",
  phoneName: "phone",
  phonePlaceholder: "+11 1548654856",

  dateLabel: "Date of birth",
  dateType: "date",
  dateName: "date",
  datePlaceholder: "10/03/1996",

  addressLabel: "Address",
  addressType: "text",
  addressName: "city",
  addressPlaceholder: "Boulevard Ceulemans 832",

  languageText: "Languages",
  addLanguage: "Add Languages",

  icon: addIcon,

  saveAndContinue: "Save & Continue",
};

export const AddLanguageOptions = [
  {
    value: 1,
    label: "English",
  },
  {
    value: 2,
    label: "French",
  },
  {
    value: 3,
    label: "Others",
  },
];
export const LanguageLevelOptions = [
  {
    value: 1,
    label: "Conversational",
  },
  {
    value: 2,
    label: "Expert",
  },
];

export const LanguagesData = {
  addLanguage: "Add Languages",
  lenguageLevel: "Language Level",
};

export const formIcons = {
  profile: profilePhoto,
  camera: cameraIcon,
  edit: editIcon,
  add: addIcon,
  check: checkIcon,
  delete: deleteIcon,
};

export const Toast = {
  sucessMessage: "Info Added successfully",
  errorMessage: "Please check again",
};
