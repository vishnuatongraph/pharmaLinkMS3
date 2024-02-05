/* eslint-disable no-unused-vars */
import React from "react";
import { FormikValues, FormikHelpers, FormikErrors } from "formik";

export type RegisterData = {
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
};

export type btnProps = {
  type?: "submit" | "reset" | "button" | undefined;
  buttonTextStyle?: string;
  selected?: boolean;
  children: React.ReactNode;
  loading?: string;
  bgColor?: string;
  textColor?: string;
  onClick?: () => void;
};

export interface CardProps {
  heading?: string;
  list?: any;
}

export type Item = {
  id: number;
  value: string;
};
export type InfoSectionProps = {
  heading: string;
  listItems?: Item[];
  paraItem?: string;
};
export interface FormikFieldProps {
  values: FormikValues;

  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => Promise<void | FormikErrors<FormikValues>>;

  // eslint-disable-next-line no-unused-vars
  setValues(values: Partial<FormikValues>): void;

  // eslint-disable-next-line
  handleChange: (e: React.ChangeEvent<any>) => void;
  // eslint-disable-next-line
  handleBlur: (e: React.FocusEvent<any>) => void;
  errors: {
    [key: string]: string;
  };
  touched: {
    [key: string]: boolean;
  };
  isSubmitting: boolean;
}
export interface TaxdetailsInputBoxProps {
  formik: FormikFieldProps;
  fieldName: string;
  placeholder: string;
  label: string;
}

export interface TaxFormValues {
  incorporated: string;
  chargeTaxes: string;
  companyName: string;
  enterpriseNumber: string;
  tpsNumber: string;
  tvqNumber: string;
  specimenCheckPic: File | string;
}

export interface educationFormTypes {
  values: {
    educations: {
      degree: string;
      date: string;
      experience: string;
    }[];
    license: string;
    pharmacyDeplomaId: File | string;
  };
  errors: {
    educations: {
      degree: string;
      date: string;
      experience: string;
    }[];
    license: string;
    pharmacyDeplomaId?: string;
  };
  touched: {
    educations: {
      degree: boolean;
      date: boolean;
      experience: boolean;
    }[];
    license: boolean;
    pharmacyDeplomaId: boolean;
  };
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  // eslint-disable-next-line no-unused-vars
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  handleChange: (e: React.ChangeEvent<any>) => void;
  // eslint-disable-next-line no-unused-vars
  handleBlur: (e: React.FocusEvent<any>) => void;
}

export interface WorkFlowInformationInterface {
  formik: FormikFieldProps;
  heading: string;
  sessionTime: string;
}

export interface InputFieldWorkFlows {
  formik: FormikFieldProps;
  additionalClass?: string;
  placeholder?: string;
  type?: string;
  name?: string;
}

export interface RadioItem {
  value: string;
  label: string;
}
export interface RadioInputInterface {
  formik: FormikFieldProps;
  labelClass: string;
  radioGroupName: string;
  radioBtnItems: RadioItem[];
}

export interface BasketColorSectionInterface {
  label: string;
  isDisabled: boolean;
  defaultColor: string;
  formik: FormikFieldProps;
  accessKey: string;
}
export interface FormStepContextProps {
  formStepCount: number;
  userData: any; // Use the UserData interface here
  userRole: string;
  nextStep: () => void;
  previousStep: () => void;
}

export interface DashHeaderProps {
  profilePic: string;
  profileName?: string;
  profileGreeting?: string;
}

export type SidebarItem = {
  label?: string;
  icon: string;
};

export interface DashboardSidebarProps {
  sidebarData: SidebarItem[];
}

export type labelProps = {
  fontSize?: number;
  fontWeight?: number;
  htmlFor?: string;
  children: React.ReactNode;
};

export interface inputProps {
  placeholder?: string;
  type?: string;
  id?: string;
  name?: string;
  onChange?: () => void;
  onBlur?: () => void;
  onClick?: () => void;
  value?: string;
}
