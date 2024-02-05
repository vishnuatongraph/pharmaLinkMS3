import React, { useContext, useEffect, useState } from "react";
import {
  contents,
  labels,
  dropdown,
  Toast,
} from "@/utils/constants/user-profile/software-knowladge";
import Image from "next/image";
import addIcon from "../../../../public/images/addIconGray.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import SaveContinueBtn from "@/components/common/SaveContinueBtn";
import { UpdateUserProfileInfo } from "../user-profile-api-methods";
import FormStepContext from "@/context/userProfileContext";
import BackButton from "@/components/common/BackButton";
import { Toaster, useToast } from "@/hooks/show-toast";
import { ERROR, SUCCESS } from "@/utils/constants/general";

function SoftwareKnowladge() {
  const { formStepCount, nextStep, userData } = useContext(FormStepContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [softwareList, setSoftwareList] = useState<Object[]>([]);
  const showToast = useToast();

  const validationSchema =
    softwareList.length > 0
      ? Yup.object({})
      : Yup.object({
          parmacySoftware: Yup.string().required("Required"),
          levelOfKnowledge: Yup.string().required("Required"),
        });

  useEffect(() => {
    if (userData && userData.software_knowledge) {
      setSoftwareList(userData.software_knowledge);
    }
  }, [userData]);
  const initialValues = {
    parmacySoftware: "",
    levelOfKnowledge: "",
  };

  const deleteFromList = (index: number) => {
    const newArray = [
      ...softwareList.slice(0, index),
      ...softwareList.slice(index + 1),
    ];
    setSoftwareList(newArray);
  };

  const handleSubmit = async () => {
    if (softwareList.length > 0) {
      setLoading(true);
      const dataObj = {
        software_knowledge: softwareList,
        completed_steps:
          userData.completed_steps > formStepCount
            ? userData.completed_steps
            : formStepCount,
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
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleListAdd = () => {
    if (formik.values.parmacySoftware && formik.values.levelOfKnowledge) {
      setSoftwareList((prev) => [...prev, formik.values]);
      formik.resetForm();
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className=" w-full">
        <div className="flex flex-col gap-5 bg-white px-5 py-[26px] font-inter rounded-[10px]">
          <h1 className="font-semibold text-2xl leading-[29px] text-left text-dark">
            {contents.SOFTWARE_KNOWLADGE}
          </h1>
          <div className="flex gap-2 items-end">
            <div className="flex items-center gap-[10px] w-full">
              <div className="flex flex-col gap-2 w-[50%] relative">
                <label
                  htmlFor="parmacySoftware"
                  className="text-sm font-normal text-dark leading-[17px] text-left"
                >
                  {labels.PHARMACY_SOFTWARE}
                </label>
                <input
                  type="text"
                  id="parmacySoftware"
                  name="parmacySoftware"
                  placeholder="Abacus Pharmacy"
                  onChange={formik.handleChange}
                  value={formik.values.parmacySoftware}
                  className="p-2 border border-[#E1E1E1] rounded-lg w-[100%]"
                />
                {formik.touched.parmacySoftware &&
                  formik.errors.parmacySoftware && (
                    <p className="absolute top-[65px] text-[red] text-xs mt-1">
                      {formik.errors.parmacySoftware}
                    </p>
                  )}
              </div>
              <div className="flex flex-col gap-2 w-[50%] relative">
                <label
                  htmlFor="levelOfKnowledge"
                  className="text-sm font-normal text-dark leading-[17px]"
                >
                  {labels.LEVEL_OF_KNOELEDGE}
                </label>
                <select
                  id="levelOfKnowledge"
                  name="levelOfKnowledge"
                  onChange={formik.handleChange}
                  value={formik.values.levelOfKnowledge}
                  className="p-2 border border-[#E1E1E1] rounded-lg w-full"
                >
                  <option value="">Select Software Level</option>
                  {dropdown &&
                    dropdown.map((option, index) => (
                      <option value={option.value} key={index}>
                        {option.text}
                      </option>
                    ))}
                </select>
                {formik.touched.levelOfKnowledge &&
                  formik.errors.levelOfKnowledge && (
                    <p className="absolute top-[61px] text-[red] text-xs mt-1">
                      {formik.errors.levelOfKnowledge}
                    </p>
                  )}
              </div>
            </div>
            <Image
              onClick={handleListAdd}
              className="cursor-pointer"
              src={addIcon}
              width={40}
              height={40}
              alt="add"
            />
          </div>

          {softwareList &&
            softwareList.length > 0 &&
            softwareList.map((details: any, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#F7F7F7] p-4 rounded-md"
              >
                <div className="flex flex-col gap-1">
                  <h1 className="text-lg font-medium text-dark leading-[21.78px]">
                    {details?.parmacySoftware}
                  </h1>
                  <p className="text-sm font-normal text-greysixty leading-[16.94px]">
                    {details?.levelOfKnowledge}
                  </p>
                </div>
                <button onClick={() => deleteFromList(index)}>
                  <HiOutlineDotsHorizontal />
                </button>
              </div>
            ))}
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

export default SoftwareKnowladge;
