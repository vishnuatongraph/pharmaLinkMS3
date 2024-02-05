import { btnProps } from "@/utils/types/types";
import SpinnerLoader from "./SpinnerLoader";

const ButtonComponent = (props: btnProps) => {
  const {
    children,
    // selected = false,
    type = "submit",
    buttonTextStyle,
    loading,
    bgColor,
    textColor,
    ...rest
  } = props;

  return (
    <>
      <button
        type={type}
        className={`cursor-pointer ${textColor} ${bgColor} border-[1px] w-[170px] sm:w-[210px] h-[54px] rounded-[10px] px-2 sm:px-[20px] py-[10px]`}
        {...rest}
      >
        {loading === "true" ? (
          <p className="flex justify-center">
            <SpinnerLoader isPageLoader={false} />
          </p>
        ) : (
          <p
            className={`${buttonTextStyle} font-inter text-base sm:text-lg font-medium leading-[22px] tracking-normal`}
          >
            {children}
          </p>
        )}
      </button>
    </>
  );
};

export default ButtonComponent;
