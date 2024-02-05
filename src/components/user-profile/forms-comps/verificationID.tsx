import React, { useContext, useEffect, useState } from "react";
import {
  headings,
  questions,
  labels,
  text,
  Toast,
} from "@/utils/constants/user-profile/verificationId";
import ToggleButtonGroup from "./toggleButtonGroup";
import { useFormik, FormikValues } from "formik";
import UploadSection from "./uploadSection";
import * as Yup from "yup";
import { UpdateUserProfileInfo } from "../user-profile-api-methods";
import FormStepContext from "@/context/userProfileContext";
import BackButton from "@/components/common/BackButton";
import SaveContinueBtn from "@/components/common/SaveContinueBtn";
import { NO, YES } from "@/utils/constants/roles";
import { Toaster, useToast } from "@/hooks/show-toast";
import { ERROR, SUCCESS } from "@/utils/constants/general";
import { uploadImageToBucket } from "@/utils/helpers/supabase-bucket";

const validationSchema = Yup.object({
  verificationId: Yup.string().required("Required"),
  isLegelInCanada: Yup.string().required("Required"),
  isRegisterdAsAnActiveMember: Yup.string().required("Required"),
  haveValidProfessionalLiabilityInsurance: Yup.string().required("Required"),
  isFoundGuilty: Yup.string().required("Required"),
  isChargedWithCriminalOffence: Yup.string().required("Required"),
});

interface Formik {
  values: FormikValues;
  errors: {
    [key: string]: string;
  };
  touched: {
    [key: string]: boolean;
  };
  // eslint-disable-next-line no-unused-vars
  setValues(values: Partial<FormikValues>): void;
  // eslint-disable-next-line no-unused-vars
  handleBlur: (e: React.FocusEvent<any>) => void;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  // eslint-disable-next-line no-unused-vars
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

function VerificationID() {
  const { formStepCount, nextStep, userData } = useContext(FormStepContext);
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useToast();

  useEffect(() => {
    if (
      userData &&
      (userData.isLegal_in_canada === true ||
        userData.isLegal_in_canada === false)
    ) {
      formik.setValues({
        ...formik.values,
        isLegelInCanada: userData.isLegal_in_canada ? YES : NO,
        isRegisterdAsAnActiveMember: userData.isRegisterd_ActiveMember
          ? YES
          : NO,
        haveValidProfessionalLiabilityInsurance:
          userData.have_valid_liability_insurance ? YES : NO,
        isFoundGuilty: userData.isFound_guilty ? YES : NO,
        isChargedWithCriminalOffence: userData?.isCharged_criminal_offence
          ? YES
          : NO,
        verificationId: userData?.verification_id_image,
      });
    }
  }, [userData]);
  const initialValues = {
    isLegelInCanada: "",
    isRegisterdAsAnActiveMember: "",
    haveValidProfessionalLiabilityInsurance: "",
    isFoundGuilty: "",
    isChargedWithCriminalOffence: "",
    verificationId: "",
  };

  const handleSubmit = async (values: any) => {
    const isYes = "Yes";

    const filePath = await uploadImageToBucket(values.verificationId);

    if (filePath) {
      values.verificationId = filePath;
    }
    setLoading(true);
    const dataObj = {
      isLegal_in_canada: values.isLegelInCanada == isYes,
      isRegisterd_ActiveMember: values.isRegisterdAsAnActiveMember == isYes,
      have_valid_liability_insurance:
        values.haveValidProfessionalLiabilityInsurance == isYes,
      isFound_guilty: values.isFoundGuilty == isYes,
      isCharged_criminal_offence: values.isChargedWithCriminalOffence == isYes,
      completed_steps:
        userData.completed_steps > formStepCount
          ? userData.completed_steps
          : formStepCount,
      verification_id_image: values.verificationId,
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
    formik.setFieldValue("verificationId", file);
  };

  const formik: Formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-4 bg-white p-6 font-inter rounded-[10px]">
        <h1 className="text-2xl font-semibold text-dark leading-[29px] text-left">
          {headings.VERIFICATION_ID}
        </h1>
        <UploadSection
          label={labels.UPLOAD}
          text={text.DRAG_AND_DROP}
          colorText={text.BROWSE_FILES}
          handleFileChange={handleFileChange}
          file={formik.values.verificationId}
          blur={formik.handleBlur}
        />
        <div className="relative">
          {formik.touched.verificationId && formik.errors.verificationId && (
            <p className="absolute top-[-20px] text-[red] text-xs mt-1">
              {formik.errors.verificationId}
            </p>
          )}
        </div>
        {questions &&
          questions.map((question) => (
            <div key={question.id} className="flex flex-col gap-2 items-start">
              <h1 className="text-xl font-semibold text-dark leading-8 text-left">
                {question.question}
              </h1>
              <ToggleButtonGroup
                values={["No", "Yes"]}
                selectedValue={formik.values[question.value]}
                onButtonClick={(val: string) => {
                  formik.setFieldValue(question.value, val);
                }}
              />
              <div className="relative">
                {formik.errors[question.value] && (
                  <p className="absolute top-[-28px] text-[red] text-xs mt-1">
                    {formik.errors[question.value]}
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="flex gap-5 mt-8">
        <BackButton />
        <SaveContinueBtn loading={loading} />
      </div>
      <Toaster />
    </form>
  );
}

export default VerificationID;
