"use client";
import React, { useContext } from "react";
import Step1Component from "./form-steps/step-1";
import Step2Component from "./form-steps/step-2";
import Step3Component from "./form-steps/step-3";
import FormStepContext from "@/context/userProfileContext";

// Import other step components as needed

const OwnerProfile = () => {
  let stepComponent;
  const { formStepCount: currentStep } = useContext(FormStepContext);

  switch (currentStep) {
    case 1:
      stepComponent = <Step1Component />;
      break;
    case 2:
      stepComponent = <Step2Component />;
      break;
    case 3:
      stepComponent = <Step3Component />;
      break;
    default:
      stepComponent = <div>Invalid step</div>;
      break;
  }

  return <>{stepComponent}</>;
};

export default OwnerProfile;
