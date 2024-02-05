"use client";
import useRouting from "@/hooks/routing";
import { PROFILE_PAGE } from "@/utils/constants/pageName";
import { buttonText } from "@/utils/constants/pricing";

const PricingBtn = () => {
  const { pushToPage } = useRouting();
  return (
    <>
      <button
        className="w-full h-[54px] mt-[30px] mb-[30px] text-white bg-[#2CBFCA] hover:bg-[#20989E] rounded-md"
        onClick={() => pushToPage(`/${PROFILE_PAGE}`)}
      >
        {buttonText.START_TRAILS}
      </button>
    </>
  );
};

export default PricingBtn;
