import { TaxdetailsInputBoxProps } from "@/utils/types/types";
import React from "react";
const TaxdetailsInputBox: React.FC<TaxdetailsInputBoxProps> = ({
  formik,
  fieldName,
  placeholder,
  label,
}) => {
  return (
    <>
      <div className="mb-4 font-inter">
        <label
          className="block text-dark text-sm font-normal leading-[17px] text-left mb-2"
          htmlFor={fieldName}
        >
          {label}
        </label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[`${fieldName}`]}
          className="border rounded-lg w-full py-2 px-3 border-[#e1e1e1]"
        />
        {formik.touched[`${fieldName}`] && formik.errors[`${fieldName}`] && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors[`${fieldName}`]}
          </p>
        )}
      </div>
    </>
  );
};

export default TaxdetailsInputBox;
