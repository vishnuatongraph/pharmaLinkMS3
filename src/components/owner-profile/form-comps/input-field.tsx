import { InputFieldWorkFlows } from "@/utils/types/types";

const InputFieldWorkFlow = ({
  additionalClass = "",
  placeholder = "--",
  type = "number",
  formik,
  name,
}: InputFieldWorkFlows) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`${additionalClass} rounded-md border border-[#e1e1e1] p-1 text-center  text-[#283030] placeholder-[#283030]::placeholder  ${additionalClass}`}
      />
    </>
  );
};

export default InputFieldWorkFlow;
