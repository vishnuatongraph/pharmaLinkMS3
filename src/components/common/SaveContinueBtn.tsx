import { EducationData } from "@/utils/constants/education";
import SpinnerLoader from "./SpinnerLoader";

const SaveContinueBtn = ({ loading = false }: { loading?: boolean }) => {
  return (
    <>
      <button
        type="submit"
        className="px-4 py-2 flex gap-2 items-center text-white bg-aqua hover:bg-[#20989E] rounded-md font-inter text-sm font-medium leading-7 text-left"
      >
        {loading && (
          <>
            {" "}
            <SpinnerLoader isPageLoader={false} />
          </>
        )}
        {EducationData.saveAndContinue}
      </button>
    </>
  );
};

export default SaveContinueBtn;
