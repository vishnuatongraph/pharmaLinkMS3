import * as Yup from "yup";

import React, { useContext, useEffect, useState } from "react";
import TaxdetailsInputBox from "./taxDetailsInput";
import ToggleButtonGroup from "./toggleButtonGroup";
import { useFormik } from "formik";
import { TaxFormValues } from "@/utils/types/types";
import SaveContinueBtn from "@/components/common/SaveContinueBtn";
import BackButton from "@/components/common/BackButton";
import { UpdateUserProfileInfo } from "../user-profile-api-methods";
import FormStepContext from "@/context/userProfileContext";
import { NO, YES } from "@/utils/constants/roles";
import { Toaster, useToast } from "@/hooks/show-toast";
import { ERROR, SUCCESS } from "@/utils/constants/general";
import { Toast, labels, text } from "@/utils/constants/user-profile/taxDetails";
import UploadSection from "./uploadSection";
import { uploadImageToBucket } from "@/utils/helpers/supabase-bucket";

const TaxDetailsForm = () => {
  const { formStepCount, nextStep, userData } = useContext(FormStepContext);
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useToast();

  useEffect(() => {
    if (
      userData &&
      (userData.is_incorporated === true || userData.is_incorporated === false)
    ) {
      formik.setValues({
        ...formik.values,
        incorporated: userData.is_incorporated ? YES : NO,
        chargeTaxes: userData.isCharge_taxes ? YES : NO,
        companyName: userData.incorporated_company_name,
        enterpriseNumber: userData.incorporated_enterprise_number,
        tpsNumber: userData.tps_number,
        tvqNumber: userData.tvq_number,
        specimenCheckPic: userData.specimen_check_image,
      });
    }
  }, [userData]);
  const initialValues = {
    incorporated: "",
    chargeTaxes: "",
    companyName: "",
    enterpriseNumber: "",
    tpsNumber: "",
    tvqNumber: "",
    specimenCheckPic: "",
  };

  const validationSchema = Yup.object({
    incorporated: Yup.string().required("Please select Yes or No"),
    chargeTaxes: Yup.string().required("Please select Yes or No"),

    companyName: Yup.string().when("incorporated", {
      is: "Yes",
      then: () =>
        Yup.string().required("This field is required when Yes is selected"),
    }),
    enterpriseNumber: Yup.string().when("incorporated", {
      is: "Yes",
      then: () =>
        Yup.string().required("This field is required when Yes is selected"),
    }),
    tpsNumber: Yup.string().when("chargeTaxes", {
      is: "Yes",
      then: () =>
        Yup.string().required("This field is required when Yes is selected"),
    }),
    tvqNumber: Yup.string().when("chargeTaxes", {
      is: "Yes",
      then: () =>
        Yup.string().required("This field is required when Yes is selected"),
    }),
    specimenCheckPic: Yup.string().when("chargeTaxes", {
      is: "Yes",
      then: () => Yup.string().required("Required"),
    }),
  });

  // eslint-disable-next-line
  const handleSubmit = async (values: TaxFormValues) => {
    // Handle form submission logic here
    const isYes = "Yes";
    setLoading(true);

    const filePath = await uploadImageToBucket(values.specimenCheckPic);

    if (filePath) {
      values.specimenCheckPic = filePath;
    }

    const dataObj = {
      isCharge_taxes: values.chargeTaxes == isYes,
      is_incorporated: values.incorporated == isYes,
      incorporated_company_name: values?.companyName,
      incorporated_enterprise_number: Number(values?.enterpriseNumber),
      tps_number: Number(values?.tpsNumber),
      tvq_number: Number(values?.tvqNumber),
      completed_steps:
        userData.completed_steps > formStepCount
          ? userData.completed_steps
          : formStepCount,
      specimen_check_image: values?.specimenCheckPic,
    };
    let result = await UpdateUserProfileInfo(dataObj);
    if (result?.status == 200) {
      showToast(Toast.sucessMessage, SUCCESS);
      setLoading(false);
      nextStep();
    } else {
      setLoading(false);
      showToast(Toast.errorMessage, ERROR);
    }
  };

  const handleFileChange = (files: [1]) => {
    const file = files?.[0];
    formik.setFieldValue("specimenCheckPic", file);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="w-[100%] flex  bg-gray-100 ">
      <form onSubmit={formik.handleSubmit} className="w-[100%]">
        <div className="bg-white shadow-md rounded-[10px] px-8 pt-6 pb-8 mb-4">
          <ToggleButtonGroup
            label="Are you incorporated?"
            values={["No", "Yes"]}
            selectedValue={formik.values.incorporated}
            onButtonClick={(value: string) =>
              formik.setFieldValue("incorporated", value)
            }
          />

          {formik.values.incorporated === "Yes" && (
            <>
              <div className="flex gap-4 mb-10">
                <TaxdetailsInputBox
                  formik={formik}
                  label={"Company name"}
                  fieldName={"companyName"}
                  placeholder={"Enter company name"}
                  key={1}
                />

                <TaxdetailsInputBox
                  formik={formik}
                  label={"Quebec enterprise Number (NEQ)"}
                  fieldName={"enterpriseNumber"}
                  placeholder={"Enter NEQ"}
                  key={2}
                />
              </div>
            </>
          )}

          <ToggleButtonGroup
            label="Do you charge TPS/TVQ taxes?"
            values={["No", "Yes"]}
            selectedValue={formik.values.chargeTaxes}
            onButtonClick={(value: string) =>
              formik.setFieldValue("chargeTaxes", value)
            }
          />

          {formik.values.chargeTaxes === "Yes" && (
            <div className="flex gap-4 mb-10">
              <TaxdetailsInputBox
                formik={formik}
                label={"TPS number"}
                fieldName={"tpsNumber"}
                placeholder={"Enter TPS"}
                key={1}
              />

              <TaxdetailsInputBox
                formik={formik}
                label={"TVQ number"}
                fieldName={"tvqNumber"}
                placeholder={"Enter TVQ"}
                key={2}
              />
            </div>
          )}
        </div>
        {formik.values.chargeTaxes === "Yes" && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <UploadSection
              label={labels.UPLOAD}
              text={text.DRAG_AND_DROP}
              colorText={text.BROWSE_FILES}
              handleFileChange={handleFileChange}
              blur={formik.handleBlur}
              file={formik.values.specimenCheckPic}
            />
            <div className="relative">
              {formik.touched.specimenCheckPic &&
                formik.errors.specimenCheckPic && (
                  <p className="absolute top-[-5px] text-[red] text-xs mt-1">
                    {formik.errors.specimenCheckPic}
                  </p>
                )}
            </div>
          </div>
        )}
        <div className="flex gap-5 mt-8">
          <BackButton />
          <SaveContinueBtn loading={loading} />
        </div>
        <Toaster />
      </form>
    </div>
  );
};

export default TaxDetailsForm;
