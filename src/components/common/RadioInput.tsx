import { RadioInputInterface } from "@/utils/types/types";

const RadioInput = ({
  labelClass,
  radioGroupName,
  radioBtnItems,
  formik,
}: RadioInputInterface) => {
  return (
    <>
      {radioBtnItems.map((item, index) => (
        <div className="flex items-center gap-[15px] mb-[21px]" key={index}>
          <input
            type="radio"
            id="Low"
            name={radioGroupName}
            value={item.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[18px] h-[18px]"
          />
          <label htmlFor={item.label} className={labelClass}>
            {item.label}
          </label>

          <br />
        </div>
      ))}
    </>
  );
};

export default RadioInput;
