import { useContext } from "react";
import {
  creditCardInfoSectionData,
  eductionInfoSectionData,
  profileInfoSectionData,
  softwareInfoSectionData,
  verificationInfoSectionData,
} from "./info-section-data";
import InfoSectionLayout from "./info-section-layout";
import TaxDetailFormInfo from "./taxdetail-info";
import WorkSectionInfo from "./work-section-info";
import FormStepContext from "@/context/userProfileContext";

const FormInfoSection = () => {
  let infoComponent;

  const { formStepCount: currentStep } = useContext(FormStepContext);

  switch (currentStep) {
    case 1:
      infoComponent = (
        <InfoSectionLayout
          heading={profileInfoSectionData.heading}
          listItems={profileInfoSectionData.data}
        />
      );
      break;
    case 2:
      infoComponent = (
        <InfoSectionLayout
          heading={eductionInfoSectionData.heading}
          listItems={eductionInfoSectionData.data}
        />
      );
      break;

    case 3:
      infoComponent = <WorkSectionInfo />;
      break;

    case 4:
      infoComponent = (
        <InfoSectionLayout
          heading={softwareInfoSectionData.heading}
          listItems={softwareInfoSectionData.data}
        />
      );
      break;
    case 5:
      infoComponent = (
        <InfoSectionLayout
          heading={verificationInfoSectionData.heading}
          listItems={verificationInfoSectionData.data}
        />
      );
      break;

    case 6:
      infoComponent = <TaxDetailFormInfo />;
      break;

    case 7:
      infoComponent = (
        <InfoSectionLayout
          heading={creditCardInfoSectionData.heading}
          listItems={creditCardInfoSectionData.data}
        />
      );
      break;

    default:
      infoComponent = <div>Invalid step</div>; // or render a default component for an invalid step
      break;
  }

  return <>{infoComponent}</>;
};

export default FormInfoSection;
