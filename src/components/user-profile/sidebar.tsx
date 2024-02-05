"use client";
import React, { useContext, useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import FormStepContext from "@/context/userProfileContext";
import { MdOutlineModeEdit } from "react-icons/md";
// import { FormStepContext } from "@/app/(profile)/layout";

export default function SidebarComponent() {
  // eslint-disable-next-line no-unused-vars
  const [activeStep, setActiveStep] = useState(0);
  const { formStepCount } = useContext(FormStepContext);
  const styles = {
    LineSeparator: () => ({
      backgroundColor: "#2CBFCA",
    }),
    ActiveNode: () => ({
      backgroundColor: "#2CBFCA",
    }),
    CompletedNode: () => ({
      backgroundColor: "#2CBFCA",
    }),
    LabelTitle: (step: any, stepIndex: number) => ({
      color: formStepCount > stepIndex && "#283030",
    }),
  };

  const checkRouteNumber = (i: any) => {
    if (i < formStepCount) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="w-full">
      <Stepper
        steps={[
          {
            stepLabel: "Personal details",
            completed: checkRouteNumber(1),
          },
          {
            stepLabel: "Education",
            completed: checkRouteNumber(2),
          },
          {
            stepLabel: "Work information",
            completed: checkRouteNumber(3),
          },
          {
            stepLabel: "Software knowledge",
            completed: checkRouteNumber(4),
          },
          {
            stepLabel: "Verification ID",
            completed: checkRouteNumber(5),
          },
          {
            stepLabel: "Taxes",
            completed: checkRouteNumber(6),
          },
          {
            stepLabel: "Card",
            completed: checkRouteNumber(7),
          },
        ]}
        // we are doing -1 to maintain the currentStep and completed Steps
        currentStepIndex={formStepCount - 1}
        styles={styles}
        onStepClick={(step: any, index: number) => {
          setActiveStep(index);
        }}
        renderNode={(step: any, stepIndex: number) => (
          <div key={stepIndex}>
            {stepIndex == formStepCount - 1 ? (
              <MdOutlineModeEdit />
            ) : (
              `0${stepIndex + 1}`
            )}
          </div>
        )}
      />
    </div>
  );
}
