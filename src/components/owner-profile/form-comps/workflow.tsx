import React, { useContext, useState } from "react";
import {
  workflowInfo,
  Toast,
} from "@/utils/constants/owner-profile/workflowInfo";
import { useFormik } from "formik";
import Image from "next/image";
import ToggleButtonGroup from "@/components/user-profile/forms-comps/toggleButtonGroup";
import BackButton from "@/components/common/BackButton";
import SaveContinueBtn from "@/components/common/SaveContinueBtn";
import InputFieldWorkFlow from "./input-field";
import RadioInput from "@/components/common/RadioInput";
import WorkflowNumberSection from "./workflow-number-section";
import { UpdateOwnerProfileInfo } from "../owner-profile-api-methods";
import FormStepContext from "@/context/userProfileContext";
import workFlowValidationSchema, {
  workFlowInitialValues,
} from "./workflow-schema";
import BasketColorSection from "./basket-color-section";
import { Toaster, useToast } from "@/hooks/show-toast";
import { ERROR, SUCCESS } from "@/utils/constants/general";
import useRouting from "@/hooks/routing";
import { DASHBOARD_PAGE } from "@/utils/constants/pageName";

export default function WorkflowInfo() {
  const { formStepCount, userData } = useContext(FormStepContext);
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useToast();

  const { pushToPage } = useRouting();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const isYes = "Yes";
    const dataObj = {
      entrance_instruction: values.entrance,
      flow_rate: values.flowRate,
      number_pharmacist_technician_session_wise: {
        day: values.day,
        evening: values.evening,
        weekend: values.weekend,
      },
      isSpecify_basket_color: values.color == isYes,
      isDispills_treated_outside: values.ques1 == isYes,
      does_pharmacist_help_needed_cash: values.ques2 == isYes,
      additional_info: values.additionalInfo,
      basket_colors: values.basketColor,
      completed_steps:
        userData.completed_steps > formStepCount
          ? userData.completed_steps
          : formStepCount,
    };
    let result = await UpdateOwnerProfileInfo(dataObj);
    if (result?.status == 200) {
      showToast(Toast.sucessMessage, SUCCESS);
      setTimeout(() => {
        pushToPage(`/${DASHBOARD_PAGE}`);
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
      showToast(Toast.errorMessage, ERROR);
    }
  };

  const formik: any = useFormik({
    initialValues: workFlowInitialValues,
    validationSchema: workFlowValidationSchema,
    onSubmit: handleSubmit,
  });
  const radioBtnItems = [
    { value: "low", label: "Low" },
    { value: "average", label: "Average" },
    { value: "high", label: "High" },
  ];

  const defaultColorBasketItems = [
    { label: workflowInfo.deliveryLabel, color: "#FFAA2B", key: "delivery" },
    { label: workflowInfo.onsiteLabel, color: "#2CBFCA", key: "onsiteLabel" },
    { label: workflowInfo.phoneLabel, color: "#13BDF5", key: "phoneLabel" },
    {
      label: workflowInfo.prescriptionsLabel,
      color: "#9747FF",
      key: "prescriptionsLabel",
    },
    {
      label: workflowInfo.renewalsLabel,
      color: "#1B4FA2",
      key: "renewalsLabel",
    },
  ];
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="px-5 py-[30px] font-inter text-dark bg-white rounded-lg">
          <div>
            <h1 className="text-2xl font-semibold leading-[29px] text-left">
              {workflowInfo.heading}
            </h1>
            <div className=" flex flex-col gap-2 relative mt-[26px]">
              <label className="text-sm font-normal leading-[17px] text-left">
                {workflowInfo.entranceLabel}
              </label>
              <div className="flex gap-[15px]">
                <input
                  type={workflowInfo.entranceType}
                  placeholder={workflowInfo.entrancePlace}
                  className={`border border-greyborder rounded-lg w-full font-family: Inter; text-sm font-normal leading-[17px] p-[15px] h-[40px] ${
                    formik.touched.entrance && formik.errors.entrance
                      ? "border-red"
                      : ""
                  }`}
                  {...formik.getFieldProps("entrance")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[workflowInfo.entranceLabel]}
                />
                {formik.touched.entrance && formik.errors.entrance && (
                  <div className="text-red text-xs absolute -bottom-4">
                    {formik.errors.entrance}
                  </div>
                )}
                <Image src={workflowInfo.icon} alt="icon" />
              </div>
            </div>
            <div className="mt-10">
              <h1 className="text-xl font-semibold leading-6 text-left mb-5">
                {workflowInfo.flowLabel}
              </h1>

              <RadioInput
                formik={formik}
                radioBtnItems={radioBtnItems}
                labelClass={
                  "text-base font-normal leading-[19px] text-greyEighty"
                }
                radioGroupName={"flowRate"}
              />
            </div>
            <div className="my-[40px]">
              <h1 className="text-xl font-semibold leading-6 text-left">
                {workflowInfo.subHeading}
              </h1>

              <WorkflowNumberSection
                heading={workflowInfo.dayHead}
                formik={formik}
                sessionTime={workflowInfo.day}
              />
              <WorkflowNumberSection
                heading={workflowInfo.eveningHead}
                formik={formik}
                sessionTime={workflowInfo.evening}
              />
              <WorkflowNumberSection
                heading={workflowInfo.weekendsHead}
                formik={formik}
                sessionTime={workflowInfo.weekend}
              />
            </div>
            <div>
              <div className="flex justify-between items-center w-full mb-[30px]">
                <label className="text-xl font-semibold leading-[24px] text-left">
                  {workflowInfo.colorSection}
                </label>
                <ToggleButtonGroup
                  label={""}
                  values={["No", "Yes"]}
                  selectedValue={formik.values.color}
                  onButtonClick={(value: string) =>
                    formik.setFieldValue("color", value)
                  }
                />
              </div>
              <div className="w-[50%] flex flex-col gap-[26px] text-greysixty">
                {defaultColorBasketItems.map((item, i) => (
                  <BasketColorSection
                    key={i}
                    defaultColor={item.color}
                    isDisabled={formik.values.color !== "Yes"}
                    label={item.label}
                    formik={formik}
                    accessKey={item.key}
                  />
                ))}
                <div>
                  <button className="border border-greyThirty rounded-[10px] w-[98px] h-[44px] text-greyEighty">
                    +Add
                  </button>
                </div>
              </div>
            </div>
            <div className="my-[40px] flex flex-col gap-[40px]">
              <div className="flex gap-[39px]">
                <label className="text-xl font-semibold leading-[24px] text-left">
                  {workflowInfo.quesLabel1}
                </label>
                <ToggleButtonGroup
                  label={""}
                  values={["No", "Yes"]}
                  selectedValue={formik.values.ques1}
                  onButtonClick={(value: string) =>
                    formik.setFieldValue("ques1", value)
                  }
                />
              </div>
              <div className="flex gap-[39px]">
                <label className="text-xl font-semibold leading-[24px] text-left">
                  {workflowInfo.quesLabel2}
                </label>
                <ToggleButtonGroup
                  label={""}
                  values={["No", "Yes"]}
                  selectedValue={formik.values.ques2}
                  onButtonClick={(value: string) =>
                    formik.setFieldValue("ques2", value)
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <label className="text-sm font-normal leading-[16px] text-left">
                {workflowInfo.additionalLabel}
              </label>

              {/* by adding !,  we are making the text-left as important  */}
              <InputFieldWorkFlow
                additionalClass={`w-[100%]  !text-left`}
                placeholder={workflowInfo.additionalPlace}
                type={workflowInfo.additionalType}
                formik={formik}
                name={"additionalInfo"}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-5 mt-8">
          <BackButton />
          <SaveContinueBtn loading={loading} />
        </div>
        <Toaster />
      </form>
    </>
  );
}
