// import { FormStepContext } from "@/app/(profile)/layout";
import FormStepContext from "@/context/userProfileContext";
import { EducationData } from "@/utils/constants/education";
import { useContext } from "react";

const BackButton = () => {
  let { previousStep } = useContext(FormStepContext);
  return (
    <>
      <button
        type="button"
        className=" text-dark text-center bg-white hover:bg-[#ddd] rounded-[10px] font-inter text-sm font-medium leading-7 w-[93px] h-[52px]"
        onClick={() => previousStep()}
      >
        {EducationData.backButton}
      </button>
    </>
  );
};

export default BackButton;
