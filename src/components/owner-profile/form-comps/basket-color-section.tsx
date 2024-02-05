import { BasketColorSectionInterface } from "@/utils/types/types";
import WorkFlowColorPicker from "./workflow-color-picker";

const BasketColorSection = ({
  label,
  isDisabled,
  defaultColor,
  formik,
  accessKey,
}: BasketColorSectionInterface) => {
  const handleSelectColor = (selectedColor: string) => {
    formik.setFieldValue(`basketColor.${accessKey}`, selectedColor);
  };

  return (
    <>
      <div className="flex justify-between ">
        <label className="text-base font-normal leading-[19px] text-left">
          {label}
        </label>{" "}
        <div className="flex justify-end">
          <WorkFlowColorPicker
            defaultColor={defaultColor}
            isDisabled={isDisabled}
            onSelectColor={(color) => handleSelectColor(color)}
          />
        </div>
      </div>
    </>
  );
};

export default BasketColorSection;
