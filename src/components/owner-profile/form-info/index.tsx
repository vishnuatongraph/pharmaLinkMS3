import { ownerFormInfoData } from "./form-info-data";
import InfoSectionLayout from "@/components/user-profile/form-info-section/info-section-layout";
import { pharmacyFormInfo } from "./form-info-data";
import WorkFlowInfo from "./workFlowInfo";
import { useContext } from "react";
import FormStepContext from "@/context/userProfileContext";

const FormInfoSectionOwner = () => {
  let infoComponent;

  const { formStepCount: currentStep } = useContext(FormStepContext);

  switch (currentStep) {
    case 1:
      infoComponent = (
        <InfoSectionLayout
          heading={ownerFormInfoData.heading}
          listItems={ownerFormInfoData.data}
        />
      );
      break;
    case 2:
      infoComponent = (
        <InfoSectionLayout
          heading={pharmacyFormInfo.heading}
          listItems={pharmacyFormInfo.data}
        />
      );
      break;

    case 3:
      infoComponent = <WorkFlowInfo />;
      break;

    default:
      infoComponent = <div>Invalid step</div>; // or render a default component for an invalid step
      break;
  }

  return <>{infoComponent}</>;
};

export default FormInfoSectionOwner;
