/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import ToggleButtonGroup from "./toggleButtonGroup";
import * as Yup from "yup";
import BackButton from "@/components/common/BackButton";
import SaveContinueBtn from "@/components/common/SaveContinueBtn";
import FormStepContext from "@/context/userProfileContext";
import { UpdateUserProfileInfo } from "../user-profile-api-methods";
import { NO, YES } from "@/utils/constants/roles";
import { Toaster, useToast } from "@/hooks/show-toast";
import { ERROR, SUCCESS } from "@/utils/constants/general";
import { Toast } from "@/utils/constants/user-profile/workInformation";

const validationSchema = Yup.object({
  hourlyRate: Yup.number()
    .required("Required")
    .positive("Hourly Rate should be positive")
    .typeError("Please enter a valid number"),
  weekendBonus: Yup.number()
    .required("Required")
    .positive("Weekend Bonus should be positive")
    .typeError("Please enter a valid number"),
  eveningBonus: Yup.number()
    .required("Required")
    .positive("Evening Bonus should be positive")
    .typeError("Please enter a valid number"),
  travalRadius: Yup.string().required("Required"),
  isChargeTravelExpense: Yup.string().required("Required"),
  chargeDistance: Yup.string().when("isChargeTravelExpense", {
    is: "Yes",
    then: () =>
      Yup.string().required("This field is required when Yes is selected"),
  }),
  contractCancelationFees: Yup.string().required("Required"),
});

function WorkInformation() {
  const { formStepCount, nextStep, userData } = useContext(FormStepContext);
  const [loading, setLoading] = useState<boolean>(false);
  const showToast = useToast();

  const initialValues = {
    hourlyRate: "",
    weekendBonus: "",
    eveningBonus: "",
    travalRadius: "",
    isChargeTravelExpense: "",
    chargeDistance: "",
    contractCancelationFees: "",
  };

  useEffect(() => {
    if (userData && userData.hourly_rate) {
      formik.setValues({
        ...formik.values,
        [`isChargeTravelExpense`]: userData.isChargeTravelExpense ? YES : NO,
        [`travalRadius`]: userData.travel_radius,
        [`chargeDistance`]: userData.charge_distance,
        [`contractCancelationFees`]: userData.contract_cancellation_fees,
        [`eveningBonus`]: userData.evening_bonus,
        [`hourlyRate`]: userData.hourly_rate,
        [`weekendBonus`]: userData.weekend_bonus,
      });
    }
  }, [userData]);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const dataObj = {
      isChargeTravelExpense: values.isChargeTravelExpense === "Yes",
      travel_radius: Number(values.travalRadius),
      charge_distance: Number(values.chargeDistance),
      contract_cancellation_fees: Number(values.contractCancelationFees),
      evening_bonus: Number(values.eveningBonus),
      hourly_rate: Number(values.hourlyRate),
      weekend_bonus: Number(values.weekendBonus),
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
      showToast(Toast.errorMessage, ERROR);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col bg-white p-5 font-inter rounded-[10px]">
        <h1 className="text-2xl font-semibold leading-[29px] text-left text-dark">
          Work information
        </h1>
        <div className="flex flex-col gap-6 mt-7">
          <div className="flex flex-col gap-4 w-[53.3%]">
            <h3 className="text-xl font-semibold text-dark leading-6 text-left">
              Hourly rate & bonus
            </h3>
            <div className="flex gap-3 items-center justify-between w-full relative">
              <label
                htmlFor="hourlyRate"
                className="text-base w-full font-normal text-greysixty leading-[19px] text-left"
              >
                Hourly Rate
              </label>
              <div className="flex w-full items-center justify-end gap-3">
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  placeholder="90"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.hourlyRate}
                  className="mt-1 p-2 border border-[#E1E1E1] rounded-md w-full"
                />
                <p className="text-base font-normal text-[#28303099]">$/h</p>
              </div>
              {formik.touched.hourlyRate && formik.errors.hourlyRate && (
                <p className="text-[red] text-xs mt-1 absolute -right-[35%] w-[32%]">
                  {formik.errors.hourlyRate}
                </p>
              )}
            </div>

            <div className="flex gap-3 items-center relative">
              <label
                htmlFor="eveningBonus"
                className="text-base  w-full font-normal text-greysixty leading-[19px] text-left"
              >
                Evening Bonus
              </label>
              <div className="flex w-full items-center justify-end gap-3">
                <input
                  type="number"
                  id="eveningBonus"
                  name="eveningBonus"
                  placeholder="40"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.eveningBonus}
                  className="mt-1 p-2 border border-[#E1E1E1] rounded-md w-full"
                />
                <p className="text-base font-normal text-[#28303099]">$/h</p>
              </div>
              {formik.touched.eveningBonus && formik.errors.eveningBonus && (
                <p className="text-[red] text-xs mt-1 absolute -right-[35%] w-[32%]">
                  {formik.errors.eveningBonus}
                </p>
              )}
            </div>

            <div className="flex gap-3 items-center relative">
              <label
                htmlFor="weekendBonus"
                className="text-base font-normal  w-full text-greysixty leading-[19px] text-left"
              >
                Weekends bonus
              </label>
              <div className="flex w-full items-center justify-end gap-3">
                <input
                  type="number"
                  id="weekendBonus"
                  name="weekendBonus"
                  placeholder="40"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.weekendBonus}
                  className="mt-1 p-2 border border-[#E1E1E1] rounded-md w-full"
                />
                <p className="text-base font-normal text-[#28303099]">$/h</p>
              </div>
              {formik.touched.weekendBonus && formik.errors.weekendBonus && (
                <p className="text-[red] text-xs mt-1 absolute -right-[35%] w-[32%]">
                  {formik.errors.weekendBonus}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[30px] mt-10">
            <h3 className="text-xl font-semibold leading-6 text-dark text-left">
              Distance & Travel expenses
            </h3>
            <div className="flex flex-col gap-1 ">
              <label
                htmlFor="travalRadius"
                className="text-base font-normal text-dark leading-[19px] text-left"
              >
                Travel radius
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  id="travalRadius"
                  name="travalRadius"
                  onBlur={formik.handleBlur}
                  placeholder="90 KM"
                  onChange={formik.handleChange}
                  value={formik.values.travalRadius}
                  className="mt-1 p-2 border border-[#E1E1E1] rounded-md w-[50%]"
                />
                {formik.touched.travalRadius && formik.errors.travalRadius && (
                  <p className="text-[red] text-xs mt-1">
                    {formik.errors.travalRadius}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center border-greyborder w-full text-center">
              <label
                htmlFor="isChargeTravelExpense"
                className="text-base font-normal leading-[19px] text-dark text-left mb-[1rem]"
              >
                Do you want to charge travelling expenses?
              </label>
              <ToggleButtonGroup
                values={["No", "Yes"]}
                selectedValue={formik.values.isChargeTravelExpense}
                onButtonClick={(val: string) => {
                  formik.setFieldValue("isChargeTravelExpense", val);
                }}
              />
            </div>
            {formik.values.isChargeTravelExpense === "Yes" && (
              <div className="flex gap-2 items-center relative">
                <label
                  htmlFor="chargeDistance"
                  className="text-base font-normal text-dark leading-[19px]"
                >
                  Above
                </label>
                <input
                  type="number"
                  id="chargeDistance"
                  onBlur={formik.handleBlur}
                  name="chargeDistance"
                  onChange={formik.handleChange}
                  value={formik.values.chargeDistance}
                  className="mt-1 p-2 border border-[#E1E1E1] rounded-md w-[20%]"
                />
                <p className="text-base font-normal text-dark">
                  I would like to charge 0,61$/KM
                </p>
                {formik.touched.chargeDistance &&
                  formik.errors.chargeDistance && (
                    <p className="text-[red] text-xs mt-1 right-0 absolute w-[20%]">
                      {formik.errors.chargeDistance}
                    </p>
                  )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-[50px]">
            <h3 className="text-xl font-semibold text-dark leading-6 text-left">
              Contract cancelation fees
            </h3>
            <p className="text-base font-normal text-dark leading-[19px] text-left">
              In case of disagreement over a contract cancelation,
            </p>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="contractCancelationFees"
                className="text-base font-normal text-dark leading-[19px] text-left"
              >
                I would like to charge:
              </label>
              <input
                type="number"
                id="contractCancelationFees"
                name="contractCancelationFees"
                placeholder="$ 40"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.contractCancelationFees}
                className="mt-1 p-2 border border-[#E1E1E1] rounded-md w-[20%]"
              />
              <p className="text-base font-normal text-dark leading-[19px] text-left">
                /day canceled
              </p>
              {formik.touched.contractCancelationFees &&
                formik.errors.contractCancelationFees && (
                  <p className="text-[red] text-xs mt-1">
                    {formik.errors.contractCancelationFees}
                  </p>
                )}
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
}

export default WorkInformation;
