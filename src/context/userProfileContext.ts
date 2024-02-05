"use client";
import { FormStepContextProps } from "@/utils/types/types";
import { createContext } from "react";

const FormStepContext = createContext<FormStepContextProps>({
  formStepCount: 1,
  userData: {},
  userRole: "",
  nextStep: () => {},
  previousStep: () => {},
});

export default FormStepContext;
