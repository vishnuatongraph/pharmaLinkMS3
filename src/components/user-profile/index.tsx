"use client";
import React, { useContext } from "react";
import Step1Component from "./form-steps/step-1";
import Step2Component from "./form-steps/step-2";
import Step6Component from "./form-steps/step-6";
import Step3Component from "./form-steps/step-3";
import Step4Component from "./form-steps/step-4";
import CreditCardComp from "./forms-comps/credit-card-comp";
import Step5Component from "./form-steps/step-5";
import FormStepContext from "@/context/userProfileContext";

// Import other step components as needed

const UserProfile = () => {
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
    case 6:
      stepComponent = <Step6Component />;
      break;
    case 7:
      stepComponent = <CreditCardComp />;
      break;

    case 4:
      stepComponent = <Step4Component />;
      break;
    case 5:
      stepComponent = <Step5Component />;
      break;
    default:
      stepComponent = <div>Invalid step</div>; // or render a default component for an invalid step
      break;
  }

  return <>{stepComponent}</>;
};

export default UserProfile;
