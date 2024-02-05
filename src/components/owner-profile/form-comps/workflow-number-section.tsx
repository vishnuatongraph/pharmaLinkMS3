import { workflowInfo } from "@/utils/constants/owner-profile/workflowInfo";
import InputFieldWorkFlow from "./input-field";
import { WorkFlowInformationInterface } from "@/utils/types/types";

const WorkflowNumberSection = ({
  heading,
  formik,
  sessionTime,
}: WorkFlowInformationInterface) => {
  return (
    <>
      <div className="mt-[30px]">
        <h1 className="text-lg font-semibold leading-[21px] text-left mb-[16px]">
          {heading}
        </h1>
        <div className="flex mb-[16px] h-[40px]">
          <label className="w-full text-base font-normal leading-[19px] text-left">
            {workflowInfo.label1}
          </label>
          <div className="flex w-[50%] gap-[14px]">
            <InputFieldWorkFlow
              additionalClass="w-[100px]"
              formik={formik}
              name={`${sessionTime}.${workflowInfo.pharmacist}[0]`}
            />
            <span className="mx-2 text-[#283030] font-normal"> &</span>{" "}
            <InputFieldWorkFlow
              additionalClass="w-[100px]"
              formik={formik}
              name={`${sessionTime}.${workflowInfo.pharmacist}[1]`}
            />
          </div>
        </div>
        <div className="flex">
          <label className="w-full text-base font-normal leading-[19px] text-left">
            {workflowInfo.label2}
          </label>
          <div className="flex w-[50%] gap-[14px]">
            <InputFieldWorkFlow
              additionalClass="w-[100px]"
              formik={formik}
              name={`${sessionTime}.${workflowInfo.technician}[0]`}
            />
            <span className="mx-2 text-[#283030] font-normal"> &</span>{" "}
            <InputFieldWorkFlow
              additionalClass="w-[100px]"
              formik={formik}
              name={`${sessionTime}.${workflowInfo.technician}[1]`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkflowNumberSection;
