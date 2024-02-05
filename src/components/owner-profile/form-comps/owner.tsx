import React, { useContext, useEffect, useState } from "react";
import {
  PharmacyOwner,
  Toast,
} from "@/utils/constants/owner-profile/ownerInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import ToggleButtonGroup from "@/components/user-profile/forms-comps/toggleButtonGroup";
import SaveContinueBtn from "@/components/common/SaveContinueBtn";
import {
  AddOwnerFirstStep,
  UpdateOwnerProfileInfo,
} from "../owner-profile-api-methods";
import FormStepContext from "@/context/userProfileContext";
import { NO, YES } from "@/utils/constants/roles";
import { Toaster, useToast } from "@/hooks/show-toast";
import { ERROR, SUCCESS } from "@/utils/constants/general";

const validationSchema = Yup.object({
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]{10}$/, "Invalid phone number"),
  owner: Yup.string().required("Owner email is required"),
  contact: Yup.string().required("Contact is required"),
  incorporated: Yup.string().required("Required"),
  count: Yup.string().when("incorporated", {
    is: "Yes",
    then: () =>
      Yup.number()
        .required("Count is required")
        .min(1, "Count must be at least 1"),
  }),
});

export default function OwnerInformation() {
  const { nextStep, userData, formStepCount } = useContext(FormStepContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataExist, setDataExist] = useState<boolean>(false);
  const showToast = useToast();

  useEffect(() => {
    if (userData && userData.id) {
      setDataExist(true);
      formik.setValues({
        ...formik.values,
        phone: userData.phone,
        owner: userData.email,
        contact: userData.name,
        count: userData.number_pharmacy,
        incorporated: userData.isOwn_multiple_pharmacy ? YES : NO,
      });
    }
  }, [userData]);
  const initialValues = {
    phone: "",
    owner: "",
    contact: "",
    count: "",
    incorporated: "",
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const isYes = "Yes";
    let dataObj = {
      phone: values.phone,
      email: values.owner,
      name: values.contact,
      isOwn_multiple_pharmacy: values.incorporated == isYes,
      number_pharmacy: Number(values.count),
      completed_steps:
        userData.completed_steps > formStepCount
          ? userData.completed_steps
          : formStepCount,
    };

    let result;
    if (dataExist) {
      result = await UpdateOwnerProfileInfo(dataObj);
    } else {
      result = await AddOwnerFirstStep(dataObj);
    }

    if (result?.status == 200) {
      showToast(Toast.sucessMessage, SUCCESS);
      setLoading(false);
      nextStep();
    } else {
      setLoading(false);
      showToast(Toast.errorMessage, ERROR);
    }
  };

  const formik: any = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="px-5 py-[26px] font-inter bg-white rounded-lg">
        <h1 className="text-2xl font-semibold leading-[29px] text-left text-dark">
          {PharmacyOwner.heading}
        </h1>

        <div className="flex gap-[15px] mt-6 mb-5">
          <div className="flex flex-col gap-2 w-full text-dark relative">
            <label className="text-sm font-normal leading-[17px] text-left">
              {PharmacyOwner.phoneLabel}
            </label>
            <input
              type={PharmacyOwner.phoneType}
              id={PharmacyOwner.phoneLabel}
              placeholder={PharmacyOwner.phonePlaceholder}
              className={`border border-greyborder rounded-lg font-family: Inter; text-sm font-normal leading-[17px] p-[15px] h-[40px]`}
              {...formik.getFieldProps("phone")}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red text-xs absolute -bottom-4">
                {formik.errors.phone}
              </div>
            )}
          </div>
          <div className="flex gap-2 flex-col w-full text-dark relative">
            <label className="text-sm font-normal leading-[17px] text-left ">
              {PharmacyOwner.ownerLabel}
            </label>
            <input
              type={PharmacyOwner.ownerType}
              id={PharmacyOwner.ownerLabel}
              placeholder={PharmacyOwner.ownerPlaceholder}
              className={`border border-greyborder rounded-lg font-family: Inter; text-sm font-normal leading-[17px] p-[15px] h-[40px]`}
              {...formik.getFieldProps("owner")}
            />
            {formik.touched.owner && formik.errors.owner && (
              <div className="text-red text-xs absolute -bottom-4">
                {formik.errors.owner}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 relative">
          <label className="text-sm font-normal leading-[17px] text-left">
            {PharmacyOwner.contactLabel}
          </label>
          <input
            type={PharmacyOwner.contactType}
            id={PharmacyOwner.contactLabel}
            placeholder={PharmacyOwner.contactPlaceholder}
            className={`border border-greyborder rounded-lg font-family: Inter; text-sm font-normal leading-[17px] p-[15px] h-[40px]`}
            {...formik.getFieldProps("contact")}
          />
          {formik.touched.contact && formik.errors.contact && (
            <div className="text-red text-xs absolute -bottom-4">
              {formik.errors.contact}
            </div>
          )}
        </div>
        <div className="flex justify-between mt-8">
          <label className="w-[60%] text-xl font-semibold leading-6 text-left text-dark">
            {PharmacyOwner.confirmLabel}
          </label>
          <div className="flex flex-col relative">
            <ToggleButtonGroup
              values={["No", "Yes"]}
              selectedValue={formik.values.incorporated}
              onButtonClick={(value: string) =>
                formik.setFieldValue("incorporated", value)
              }
            />
            {formik.errors.incorporated && (
              <div className="text-red text-xs absolute top-10">
                {formik.errors.incorporated}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 text-dark mt-[30px] items-center">
          <label className="text-sm font-normal leading-[17px] text-left">
            {PharmacyOwner.countLabel}
          </label>
          <input
            type={PharmacyOwner.countType}
            id={PharmacyOwner.countLabel}
            disabled={formik.values.incorporated !== "Yes"}
            placeholder={PharmacyOwner.countPlaceholder}
            className={`border border-greyborder rounded-lg text-sm text-right font-normal leading-[17px] p-[15px] w-[15%] h-[40px]`}
            {...formik.getFieldProps("count")}
          />
          {formik.touched.count && formik.errors.count && (
            <div className="text-red text-xs absolute -bottom-4">
              {formik.errors.count}
            </div>
          )}
        </div>
      </div>
      <div className="mt-[30px]">
        <SaveContinueBtn loading={loading} />
      </div>
      <Toaster />
    </form>
  );
}
