"use client";
import React, { useContext, useState } from "react";
import Stepper from "@keyvaluesystems/react-stepper";
import FormStepContext from "@/context/userProfileContext";
import { MdOutlineModeEdit } from "react-icons/md";

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
            stepLabel: "Pharmacy Owner information",
            completed: checkRouteNumber(1),
          },
          {
            stepLabel: "Pharmacy information",
            completed: checkRouteNumber(2),
          },
          {
            stepLabel: "Workflow informaiton",
            completed: checkRouteNumber(3),
          },
        ]}
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
