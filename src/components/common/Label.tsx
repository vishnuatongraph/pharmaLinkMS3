import React from "react";
import { labelProps } from "@/utils/types/types";

const LabelComponent = (props: labelProps) => {
  const { children, fontSize = 14, fontWeight = 400 } = props;

  return (
    <label
      className={`text-${fontSize}px font-inter font-${fontWeight} tracking-normal leading-[17px] text-left text-dark`}
    >
      {children}
    </label>
  );
};

export default LabelComponent;
