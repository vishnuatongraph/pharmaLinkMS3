import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
// import ButtonComponent from "../../common/Button";
import {
  PersonalData,
  Toast,
  LanguagesData,
  formIcons,
  LanguageLevelOptions,
  AddLanguageOptions,
} from "@/utils/constants/personalDetails";
import SaveContinueBtn from "@/components/common/SaveContinueBtn";
import FormStepContext from "@/context/userProfileContext";
import {
  AddUserFirstStep,
  UpdateUserProfileInfo,
} from "../user-profile-api-methods";
import { getIsoDateFormat } from "@/utils/helpers/helper";
import {
  getBucketImageUrl,
  uploadImageToBucket,
} from "@/utils/helpers/supabase-bucket";
import { Toaster, useToast } from "@/hooks/show-toast";
import { ERROR, SUCCESS } from "@/utils/constants/general";
import LabelComponent from "@/components/common/Label";
import InputComponent from "@/components/common/Input";

interface FormValues {
  email: string;
  phone: string;
  date: string;
  city: string;
  languages: {
    language: string;
    level: string;
  }[];
  filePath: string;
  profilePic: File | null;
  name: string;
}

const PersonalDetails: React.FC = () => {
  const initialValues = {
    email: "",
    phone: "",
    date: "",
    city: "",
    languages: [{ language: "", level: "" }],
    name: PersonalData.heading,
  } as FormValues;

  const { nextStep, userData, formStepCount } = useContext(FormStepContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataExist, setDataExist] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [languageList, setLanguageList] = useState<
    { language: any; level: any }[]
  >([]);
  const showToast = useToast();

  const validationSchema =
    languageList.length > 0
      ? Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
          phone: Yup.string()
            .required("Required")
            .matches(/^[0-9]{10}$/, "Invalid phone number"),
          date: Yup.date().required("Required"),
          city: Yup.string().required("Required"),
        })
      : Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
          phone: Yup.string().required("Required"),
          date: Yup.date().required("Required"),
          city: Yup.string().required("Required"),
          languages: Yup.array().of(
            Yup.object().shape({
              language: Yup.string().required("Required"),
              level: Yup.string().required("Required"),
            })
          ),
        });

  useEffect(() => {
    if (userData && userData.dob && userData.id) {
      setDataExist(true);
      formik.setValues({
        ...formik.values,
        [PersonalData.emailName]: userData.email,
        [PersonalData.phoneName]: userData.phone,
        [PersonalData.dateName]: getIsoDateFormat(userData.dob),
        [PersonalData.addressName]: userData.address,
        name: userData.name,
        profilePic: userData.image,
        languages: userData.language
          ? userData.language
          : [{ language: "", level: "" }],
      });
      if (userData.language && Array.isArray(userData.language)) {
        setLanguageList(userData.language);
      }
    } else {
      if (userData.firstName && userData.lastName) {
        formik.setValues({
          ...formik.values,
          [PersonalData.emailName]: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
        });
      }
    }
  }, [userData]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    formik.setFieldValue("profilePic", file);
  };

  const getLanguagebyValue = (val: any) => {
    val = Number(val);
    const matchingOption = AddLanguageOptions.find(
      (option) => option.value === val
    );
    return matchingOption ? matchingOption.label : null;
  };

  const getLanguageLevelByValue = (val: any) => {
    val = Number(val);
    const matchingOption = LanguageLevelOptions.find(
      (option) => option.value === val
    );
    return matchingOption ? matchingOption.label : null;
  };

  const formik: any = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const filePath = await uploadImageToBucket(values.profilePic);

      if (filePath) {
        values.filePath = filePath;
      } else {
        if (typeof values?.profilePic === "string") {
          values.filePath = values?.profilePic;
        }
      }

      let result;
      if (dataExist) {
        const dataToupdate = {
          email: values.email,
          phone: values.phone,
          dob: new Date(values.date).toISOString(),
          address: values.city,
          image: values.filePath,
          language: languageList,
          name: values.name,
          completed_steps:
            userData.completed_steps > formStepCount
              ? userData.completed_steps
              : formStepCount,
        };
        result = await UpdateUserProfileInfo(dataToupdate);
      } else {
        result = await AddUserFirstStep(values);
      }
      if (result?.status == 200) {
        showToast(Toast.sucessMessage, SUCCESS);
        setLoading(false);
        nextStep();
      } else {
        setLoading(false);
        showToast(Toast.errorMessage, ERROR);
      }
    },
  });

  const handleCheckLanguage = (language: any, level: any) => {
    if (language && level) {
      setLanguageList(() => formik.values.languages);
    }
  };

  const handleAddLanguage = () => {
    formik.setFieldValue("languages", [
      ...formik.values.languages,
      {
        language: "",
        level: "",
      },
    ]);
  };

  const handleDeleteLanguage = (index: number) => {
    const newArray = [
      ...languageList.slice(0, index),
      ...languageList.slice(index + 1),
    ];
    setLanguageList(() => newArray);

    formik.setFieldValue("languages", newArray);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex gap-30 justify-between w-full rounded-[10px] p-5 bg-white">
        <div className="w-full">
          <h1 className="font-inter text-2xl font-semibold leading-29 tracking-normal text-left text-dark mb-[30px]">
            {PersonalData.mainHeading}
          </h1>
          <div>
            <div className="flex gap-[30px]">
              <div className="relative w-[116px] h-[116px]">
                <label
                  htmlFor="profileImage"
                  className=" cursor-pointer block  bg-gray-100 rounded-full overflow-hidden"
                >
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer round"
                  />
                  <Image
                    src={
                      formik.values.profilePic
                        ? typeof formik.values.profilePic === "string"
                          ? getBucketImageUrl(formik.values.profilePic)
                          : URL.createObjectURL(formik.values.profilePic)
                        : formIcons.profile
                    }
                    alt="Selected Image"
                    fill
                    style={{ objectFit: "cover", borderRadius: "9999px" }}
                  />
                  <Image
                    src={formIcons.camera}
                    alt="Camera Icon"
                    width={24}
                    height={24}
                    className="absolute bottom-0 right-0"
                  />
                </label>
              </div>

              <div className="mb-6">
                <div className="flex gap-[15px] items-baseline text-dark">
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      autoFocus
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      className="font-inter border-none outline-none text-[32px] w-[250px] font-semibold leading-[39px] text-left tracking-normal mb-4"
                    />
                  ) : (
                    <h1 className="font-inter text-[32px] font-semibold  leading-[39px] text-left tracking-normal mb-4">
                      {formik.values.name}
                    </h1>
                  )}
                  <Image
                    onClick={() => {
                      setIsEditing(true);
                    }}
                    src={formIcons.edit}
                    alt="edit"
                    className="w-[18px] h-[18px] cursor-pointer"
                  />
                </div>

                {/* Ai button comment for now */}

                {/* <ButtonComponent
                  bgColor="bg-white"
                  textColor="text-aqua"
                  selected
                  type="button"
                  buttonTextStyle="sm:text-base font-medium leading-[19px]"
                >
                  {PersonalData.aiButtonName}
                </ButtonComponent> */}
              </div>
            </div>
            <div className="min-w-[595px]">
              <div className="flex gap-[15px]">
                <div className="mb-4 w-full sm:min-w-[290px]">
                  <LabelComponent htmlFor={PersonalData.emailName}>
                    {PersonalData.emailLabel}
                  </LabelComponent>
                  <InputComponent
                    type={PersonalData.emailType}
                    id={PersonalData.emailName}
                    name={PersonalData.emailName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[PersonalData.emailName]}
                    placeholder={PersonalData.emailPlaceholder}
                  />
                  {formik.touched[PersonalData.emailName] &&
                    formik.errors[PersonalData.emailName] && (
                      <div className="text-red text-[12px] absolute">
                        {formik.errors[PersonalData.emailName]}
                      </div>
                    )}
                </div>
                <div className="mb-4 w-full sm:min-w-[290px]">
                  <LabelComponent htmlFor={PersonalData.phoneName}>
                    {PersonalData.phoneLabel}
                  </LabelComponent>
                  <InputComponent
                    type={PersonalData.phoneType}
                    id={PersonalData.phoneName}
                    name={PersonalData.phoneName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[PersonalData.phoneName]}
                    placeholder={PersonalData.phonePlaceholder}
                  />
                  {formik.touched[PersonalData.phoneName] &&
                    formik.errors[PersonalData.phoneName] && (
                      <div className="text-red text-[12px] absolute">
                        {formik.errors[PersonalData.phoneName]}
                      </div>
                    )}
                </div>
              </div>

              <div className="flex gap-[15px]">
                <div className="mb-4 w-full sm:min-w-[290px]">
                  <LabelComponent htmlFor={PersonalData.dateName}>
                    {PersonalData.dateLabel}
                  </LabelComponent>
                  <InputComponent
                    type={"date"}
                    id={PersonalData.dateName}
                    name={PersonalData.dateName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[PersonalData.dateName]}
                    placeholder={PersonalData.emailPlaceholder}
                  />
                  {formik.touched[PersonalData.dateName] &&
                    formik.errors[PersonalData.dateName] && (
                      <div className="text-red text-[12px] absolute">
                        {formik.errors[PersonalData.dateName]}
                      </div>
                    )}
                </div>
                <div className="mb-4 w-full sm:min-w-[290px]">
                  <LabelComponent htmlFor={PersonalData.addressName}>
                    {PersonalData.addressLabel}
                  </LabelComponent>
                  <InputComponent
                    type={PersonalData.addressType}
                    id={PersonalData.addressName}
                    name={PersonalData.addressName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[PersonalData.addressName]}
                    placeholder={PersonalData.addressPlaceholder}
                  />
                  {formik.touched[PersonalData.addressName] &&
                    formik.errors[PersonalData.addressName] && (
                      <div className="text-red text-[12px] absolute">
                        {formik.errors[PersonalData.addressName]}
                      </div>
                    )}
                </div>
              </div>
              <h1 className="font-inter text-base font-medium leading-[19px] text-left mt-[10px]">
                {PersonalData.languageText}
              </h1>
              {formik?.values?.languages?.map(
                (language: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-end gap-[8px] w-full mt-5"
                  >
                    <div className="flex items-end gap-[8px] w-full">
                      <div className="w-full">
                        <LabelComponent htmlFor="language">
                          {LanguagesData.addLanguage}
                        </LabelComponent>
                        <select
                          id={`languages[${index}].language`}
                          name={`languages[${index}].language`}
                          className="mt-1 p-2 w-full border  border-greyborder bg-white rounded-lg text-dark"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.languages?.[index]?.language}
                        >
                          <option value="">Select Language</option>
                          {AddLanguageOptions.map((label, index) => {
                            return (
                              <option key={index} value={label.value}>
                                {label.label}
                              </option>
                            );
                          })}
                        </select>
                        {formik.touched.languages?.[index]?.language &&
                          formik.errors.languages?.[index]?.language && (
                            <div className="text-red text-[12px] absolute">
                              {formik.errors.languages?.[index]?.language}
                            </div>
                          )}
                      </div>
                      <div className="w-full">
                        <LabelComponent htmlFor="languageLevel">
                          {LanguagesData.lenguageLevel}
                        </LabelComponent>
                        <select
                          id={`languages[${index}].level`}
                          name={`languages[${index}].level`}
                          className="mt-1 p-2 w-full border  border-greyborder bg-white rounded-lg text-dark"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.languages?.[index]?.level}
                        >
                          <option value="">Select Language Level</option>
                          {LanguageLevelOptions.map((label, index) => {
                            return (
                              <option key={index} value={label.value}>
                                {label.label}
                              </option>
                            );
                          })}
                        </select>
                        {formik.touched.languages?.[index]?.level &&
                          formik.errors.languages?.[index]?.level && (
                            <div className="text-red text-[12px] absolute">
                              {formik.errors.languages?.[index]?.level}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="flex gap-[5px] w-[20%] cursor-pointer">
                      <button
                        onClick={() => {
                          handleDeleteLanguage(index);
                        }}
                        disabled={languageList.length <= 1}
                      >
                        <Image src={formIcons.delete} alt="delete" />
                      </button>
                      <Image
                        src={formIcons.check}
                        alt="check"
                        onClick={() =>
                          handleCheckLanguage(
                            formik.values.languages?.[index]?.language,
                            formik.values.languages?.[index]?.level
                          )
                        }
                      />
                    </div>
                  </div>
                )
              )}

              <div className="flex flex-col gap-[10px] mt-5">
                <div className="flex gap-[10px] items-center">
                  <Image
                    src={formIcons.add}
                    alt="add"
                    onClick={() => handleAddLanguage()}
                    className="cursor-pointer"
                  />
                  <h1 className="text-aqua text-sm font-medium leading-[18px] tracking-normal">
                    {PersonalData.addLanguage}
                  </h1>
                </div>
                <div className="mt-15 flex flex-col gap-2">
                  {languageList &&
                    languageList.length > 0 &&
                    languageList?.map((language: any, index: number) => (
                      <div className="flex text-[18px]" key={index}>
                        <h1 className="flex text-[#283030] font-medium">
                          {getLanguagebyValue(language.language)}
                        </h1>
                        <h1 className="flex text-[#28303099] font-medium">
                          -{getLanguageLevelByValue(language.level)}
                        </h1>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[40px]">
        <SaveContinueBtn loading={loading} />
      </div>
      <Toaster />
    </form>
  );
};

export default PersonalDetails;
