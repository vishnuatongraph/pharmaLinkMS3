import addIcon from "../../../public/images/addIcon.svg";
import uploadIcon from "../../../public/images/uploadIcon.svg";
import uploadArrow from "../../../public/images/uploadArrow.svg";
import calendar from "../../../public/images/calendar.svg";

export const EducationData = {
  heading: "Education",
  degreeLabel: "Degree",
  degreeName: "degree",
  degreeId: "degree",

  dateLabel: "Date of obtaining the permit",
  dateType: "date",
  datePlaceholder: "10/03/2019",

  experienceLabel: "Experience description",
  experienceType: "text",
  experiencePlaceholder: "Your Experience description here...",

  academicLabel: "Add Academic Qualifications",

  uploadLabel: "Upload an ID picture of the pharmacy diploma",
  uploadText: "Drag and Drop here",
  uploadColorText: "Browse files",

  licenceLabel: "Licence number (OPQ)",
  licenceName: "license",
  licenceType: "text",
  licencePlaceholder: "1487576542",
  successMessage: "Info Added successfully",
  errorMessage: "Please Check again",

  icon: addIcon,
  uploadIcon: uploadIcon,
  uploadArrow: uploadArrow,
  calendar: calendar,

  backButton: "Back",
  saveAndContinue: "Save & Continue",
};

export const DegreeOptions = [
  {
    value: "pharmD",
    degreeName: "PharmD",
  },
  {
    value: "bSPharm",
    degreeName: "BS Pharm",
  },
  {
    value: "dPharm",
    degreeName: "D Pharm",
  },
  {
    value: "bPharm",
    degreeName: "B Pharm",
  },
];
