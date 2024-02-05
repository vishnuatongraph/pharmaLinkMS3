import React from "react";
import { inputProps } from "@/utils/types/types";

const InputComponent = (props: inputProps) => {
  const {
    placeholder = "",
    type = "",
    id = "",
    name = "",
    onChange,
    onBlur,
    value,
  } = props;

  return (
    <input
      placeholder={placeholder}
      type={type}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      name={name}
      className="mt-1 p-2 w-full border rounded-lg text-dark border-greyborder"
    />
  );
};

export default InputComponent;
