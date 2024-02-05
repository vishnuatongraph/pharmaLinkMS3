import { DegreeOptions, EducationData } from "@/utils/constants/education";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadSection from "./uploadSection";
import BackButton from "@/components/common/BackButton";
import { UpdateUserProfileInfo } from "../user-profile-api-methods";
import FormStepContext from "@/context/userProfileContext";
import { Toaster, useToast } from "@/hooks/show-toast";
import { ERROR, SUCCESS } from "@/utils/constants/general";
import SaveContinueBtn from "@/components/common/SaveContinueBtn";
import { uploadImageToBucket } from "@/utils/helpers/supabase-bucket";

const validationSchema = Yup.object().shape({
  educations: Yup.array().of(
    Yup.object().shape({
      degree: Yup.string().required("Degree is required"),
      date: Yup.date().required("Date is required"),
      experience: Yup.string().required("Experience is required"),
    })
  ),
  license: Yup.string().required("License is required"),
  pharmacyDeplomaId: Yup.string().required("please upload"),
});

const EducationSection = () => {
  const { formStepCount, nextStep, userData } = useContext(FormStepContext);

  const [loading, setLoading] = useState<boolean>(false);

  const showToast = useToast();
  useEffect(() => {
    if (userData && userData?.education) {
      formik.setValues({
        ...formik.values,
        educations: userData.education,
        [EducationData.licenceName]: userData.licence_number,
        pharmacyDeplomaId: userData.pharmacy_diploma_image,
      });
    }
  }, []);

  const initialValues = {
    educations: [{ degree: "", date: "", experience: "" }],
    license: "",
    pharmacyDeplomaId: "",
  };

  const handleFileChange = (files: [1]) => {
    const file = files?.[0];
    formik.setFieldValue("pharmacyDeplomaId", file);
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);

    const filePath = await uploadImageToBucket(values.pharmacyDeplomaId);

    if (filePath) {
      values.pharmacyDeplomaId = filePath;
    }

    const dataObj = {
      education: values.educations,
      licence_number: Number(values.license),
      pharmacy_diploma_image: values.pharmacyDeplomaId,
      completed_steps:
        userData.completed_steps > formStepCount
          ? userData.completed_steps
          : formStepCount,
    };
    let result = await UpdateUserProfileInfo(dataObj);

    if (result?.status == 200) {
      showToast(EducationData.successMessage, SUCCESS);
      nextStep();
      setLoading(false);
    } else {
      showToast(EducationData.errorMessage, ERROR);
      setLoading(false);
    }
  };

  const formik: any = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const addAcademicQualificaion = () => {
    formik.setFieldValue("educations", [
      ...formik.values.educations,
      {
        degree: "",
        date: "",
        experience: "",
      },
    ]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-full px-5 pt-[26px] pb-5 bg-white rounded-[10px]">
        <div className="font-inter w-full flex flex-col gap-5">
          <h1 className="text-2xl font-semibold leading-[29px] text-left">
            {EducationData.heading}
          </h1>
          <div>
            {formik.values.educations.map((education: any, index: number) => (
              <div key={index} className="mb-[20px]">
                <div className="flex gap-[15px] w-full">
                  <div className="flex flex-col gap-[8px] w-full text-sm font-normal leading-[17px] text-left">
                    <label className="text-dark" htmlFor="degree">
                      {EducationData.degreeLabel}
                    </label>
                    <select
                      name={`educations[${index}].degree`}
                      id={`educations[${index}].degree`}
                      className="w-full h-[40px] border rounded-lg border-greyborder p-[10px]"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.educations?.[index].degree}
                    >
                      {DegreeOptions.map((degree, degreeIndex) => {
                        return (
                          <option key={degreeIndex} value={degree.value}>
                            {degree.degreeName}
                          </option>
                        );
                      })}
                    </select>
                    <div className="relative">
                      {formik.touched.educations?.[index]?.degree &&
                        formik.errors.educations?.[index]?.degree && (
                          <div className="absolute top-[-12px] text-red text-[12px] mt-[2px]">
                            {formik.errors.educations[index]?.degree}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[8px] text-sm w-full font-normal leading-[17px] text-left">
                    <label className="text-dark">
                      {EducationData.dateLabel}
                    </label>
                    <input
                      type={EducationData.dateType}
                      placeholder={EducationData.datePlaceholder}
                      className="w-full h-[40px] border rounded-lg border-greyborder p-[15px]"
                      name={`educations[${index}].date`}
                      id={`educations[${index}].date`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.educations?.[index].date}
                    />
                    <div className="relative">
                      {formik.touched.educations?.[index]?.date &&
                        formik.errors.educations?.[index]?.date && (
                          <div className="absolute top-[-12px] text-red text-[12px] mt-1">
                            {formik.errors.educations[index].date}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] text-sm font-normal leading-[17px] text-left mt-5">
                  <label className="text-dark">
                    {EducationData.experienceLabel}
                  </label>
                  <input
                    type={EducationData.experienceType}
                    placeholder={EducationData.experiencePlaceholder}
                    className="max- w-full h-[78px] border rounded-lg border-greyborder p-[15px]"
                    name={`educations[${index}].experience`}
                    id={`educations[${index}].experience`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.educations?.[index].experience}
                  />
                  <div className="relative">
                    {formik.touched.educations?.[index]?.experience &&
                      formik.errors.educations?.[index]?.experience && (
                        <div className="absolute top-[-12px] text-red text-[12px] mt-1">
                          {formik.errors.educations[index].experience}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-[8px] items-center text-sm font-normal leading-[17px] text-left text-aqua mt-4 cursor-pointer mb-[33px]">
              <Image
                src={EducationData.icon}
                alt="add"
                onClick={() => {
                  addAcademicQualificaion();
                }}
              />
              <label>{EducationData.academicLabel}</label>
            </div>
            <UploadSection
              label={EducationData.uploadLabel}
              text={EducationData.uploadText}
              colorText={EducationData.uploadColorText}
              handleFileChange={handleFileChange}
              file={formik.values.pharmacyDeplomaId}
              blur={formik.handleBlur}
            />
            <div className="relative">
              {formik.touched.pharmacyDeplomaId &&
                formik.errors.pharmacyDeplomaId && (
                  <div className="absolute top-[-5px] text-red text-[12px] mt-1">
                    {formik.errors.pharmacyDeplomaId}
                  </div>
                )}
            </div>
            <div className="flex flex-col gap-[8px] text-sm font-normal leading-[17px] text-left mt-5">
              <label className="text-dark">{EducationData.licenceLabel}</label>
              <input
                type="text"
                placeholder={EducationData.licencePlaceholder}
                className="w-full h-[40px] border rounded-lg border-greyborder p-[4px]"
                name={EducationData.licenceName}
                id="license"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.license}
              />
              <div className="relative">
                {formik.touched.license && formik.errors.license && (
                  <div className="absolute top-[-12px] text-red text-[12px] mt-1">
                    {formik.errors.license}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 mt-8">
        <BackButton />
        <SaveContinueBtn loading={loading} />
      </div>
      <Toaster />
    </form>
  );
};

export default EducationSection;
