import React, { useContext, useEffect, useState } from "react";
import {
  PharmacyInfoData,
  Toast,
} from "@/utils/constants/owner-profile/pharmacyInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { formIcons } from "@/utils/constants/personalDetails";
import FormStepContext from "@/context/userProfileContext";
import { UpdateOwnerProfileInfo } from "../owner-profile-api-methods";
import BackButton from "@/components/common/BackButton";
import SaveContinueBtn from "@/components/common/SaveContinueBtn";
import { Toaster, useToast } from "@/hooks/show-toast";
import { ERROR, SUCCESS } from "@/utils/constants/general";
import {
  uploadImageToBucket,
  getBucketImageUrl,
} from "@/utils/helpers/supabase-bucket";
import SetDefaultImage from "./setDefaltImage";

const validationSchema = Yup.object({
  pharmacy: Yup.string().required("pharmacy is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]{10}$/, "Invalid phone number"),
  account: Yup.string().required("account's email is required"),
  about: Yup.string().required("About information is required"),
  software: Yup.string().required("Software information is required"),
});

export default function PharmacyInfo() {
  const { formStepCount, nextStep, userData } = useContext(FormStepContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const showToast = useToast();

  useEffect(() => {
    if (userData) {
      formik.setValues({
        ...formik.values,
        pharmacy: userData.pharmacy_name,
        address: userData.pharmacy_address,
        phone: userData.pharmacy_phone,
        account: userData.accountant_email,
        about: userData.pharmacy_about,
        software: userData.pharmacy_software,
        profileImage: userData.pharmacy_image,
      });
    }
  }, [userData]);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    formik.setFieldValue("profileImage", file);
  };

  const initialValues = {
    pharmacy: "",
    address: "",
    phone: "",
    account: "",
    about: "",
    software: "",
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);

    const filePath = await uploadImageToBucket(values.profileImage);

    if (filePath) {
      values.filePath = filePath;
    } else {
      if (typeof values?.profileImage === "string") {
        values.filePath = values?.profileImage;
      }
    }

    const dataObj = {
      pharmacy_about: values.about,
      accountant_email: values.account,
      pharmacy_address: values.address,
      pharmacy_name: values.pharmacy,
      pharmacy_phone: values.phone,
      pharmacy_image: values?.filePath,
      pharmacy_software: values.software,
      completed_steps:
        userData.completed_steps > formStepCount
          ? userData.completed_steps
          : formStepCount,
    };

    let result = await UpdateOwnerProfileInfo(dataObj);

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

  const handleSaveImage = (image: string) => {
    formik.setFieldValue("profileImage", image);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-6 bg-white font-inter text-dark rounded-lg">
        <h1 className="text-2xl font-semibold leading-[29px] text-left">
          {PharmacyInfoData.mainheading}
        </h1>
        <p className="text-sm font-normal leading-[17px] text-left mt-[29px]">
          {PharmacyInfoData.heading}
        </p>
        <div className="flex gap-[26px] items-center mt-4">
          <div className="relative">
            <label
              htmlFor="profileImage"
              className="cursor-pointer block w-[116px] h-[116px] bg-gray-100 rounded-full overflow-hidden"
            >
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border border-[#F0F0F0] rounded-[58px]"
                // required
              />
              <Image
                src={
                  formik.values.profileImage
                    ? typeof formik.values.profileImage === "string"
                      ? getBucketImageUrl(formik.values.profileImage)
                      : URL.createObjectURL(formik.values.profileImage)
                    : PharmacyInfoData.profile
                }
                alt="Selected Image"
                layout="fill"
                style={{
                  objectFit: "cover",
                  border: "solid 2px #F0F0F0",
                  borderRadius: "9999px",
                }}
              />
              <Image
                src={formIcons.camera}
                alt="Camera Icon"
                width={45}
                height={45}
                className="absolute bottom-0 right-0"
              />
            </label>
          </div>
          <button
            onClick={() => {
              setShowModal(true);
            }}
            className="px-[13px] h-[44px] border border-aqua text-aqua rounded-[10px]"
          >
            {PharmacyInfoData.setButton}
          </button>
        </div>
        <div className=" flex flex-col gap-6 mt-[30px]">
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-normal leading-[17px] text-left">
              {PharmacyInfoData.pharmacyLabel}
            </label>
            <input
              type={PharmacyInfoData.pharmacyType}
              placeholder={PharmacyInfoData.pharmacyPlaceholder}
              className={`border border-greyborder rounded-lg font-family: Inter; text-sm font-normal leading-[17px] p-[15px] h-[40px]`}
              // {...formik.getFieldProps("pharmacy")}
              name="pharmacy"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pharmacy}
            />
            {formik.touched.pharmacy && formik.errors.pharmacy && (
              <div className="text-red text-xs absolute -bottom-4">
                {formik.errors.pharmacy}
              </div>
            )}
          </div>
          <div className="flex gap-[15px] relative">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-normal leading-[17px] text-left">
                {PharmacyInfoData.addressLabel}
              </label>
              <input
                type={PharmacyInfoData.addressType}
                placeholder={PharmacyInfoData.addressPlaceholder}
                className={`border border-greyborder rounded-lg font-family: Inter; text-sm font-normal leading-[17px] p-[15px] h-[40px] `}
                {...formik.getFieldProps("address")}
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red text-xs absolute -bottom-4">
                  {formik.errors.address}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-normal leading-[17px] text-left">
                {PharmacyInfoData.phoneLabel}
              </label>
              <input
                type={PharmacyInfoData.phoneType}
                placeholder={PharmacyInfoData.phonePlaceholder}
                className={`border border-greyborder rounded-lg font-family: Inter; text-sm font-normal leading-[17px] p-[15px] h-[40px]`}
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red text-xs absolute -bottom-4">
                  {formik.errors.phone}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-normal leading-[17px] text-left">
              {PharmacyInfoData.accountLabel}
            </label>
            <input
              type={PharmacyInfoData.accountType}
              placeholder={PharmacyInfoData.accountPlaceholder}
              className={`border border-greyborder rounded-lg font-family: Inter; text-sm font-normal leading-[17px] p-[15px] h-[40px]`}
              {...formik.getFieldProps("account")}
            />
            {formik.touched.account && formik.errors.account && (
              <div className="text-red text-xs absolute -bottom-4">
                {formik.errors.account}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-normal leading-[17px] text-left">
              {PharmacyInfoData.aboutLabel}
            </label>
            <input
              type={PharmacyInfoData.aboutType}
              placeholder={PharmacyInfoData.aboutPlaceholder}
              className={`border border-greyborder rounded-lg font-family: Inter; text-sm font-normal leading-[17px] p-[15px] h-[40px]`}
              {...formik.getFieldProps("about")}
            />
            {formik.touched.about && formik.errors.about && (
              <div className="text-red text-xs absolute -bottom-4">
                {formik.errors.about}
              </div>
            )}
          </div>
          <h1 className="text-xl font-semibold leading-6 text-left">
            {PharmacyInfoData.softwareHeading}
          </h1>
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm font-normal leading-[17px] text-left text-[#000000]">
              {PharmacyInfoData.softwareLabel}
            </label>
            <input
              type={PharmacyInfoData.softwareType}
              placeholder={PharmacyInfoData.softwarePlaceholder}
              className={`border border-greyborder rounded-lg font-family: Inter; text-sm font-normal leading-[17px] p-[15px] h-[40px]`}
              {...formik.getFieldProps("software")}
            />
            {formik.touched.software && formik.errors.software && (
              <div className="text-red text-xs absolute -bottom-4">
                {formik.errors.software}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-5 mt-8">
        <BackButton />
        <SaveContinueBtn loading={loading} />
      </div>
      <Toaster />
      <SetDefaultImage
        onClose={setShowModal}
        isOpen={showModal}
        onSave={handleSaveImage}
      />
    </form>
  );
}
