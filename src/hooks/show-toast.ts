/* eslint-disable */
import { useEffect } from "react";
import toast, { Toast, Toaster } from "react-hot-toast";

// export

const useToast = () => {
  let position: Partial<Pick<Toast, "position">> = {
    position: "top-right",
  };

  type ShowToast = (message: string, type?: string) => void;
  const showToast: ShowToast = (message, type = "default") => {
    switch (type) {
      case "success":
        toast.success(message, position);
        break;
      case "error":
        toast.error(message, position);
        break;
      default:
        toast(message);
    }
  };

  useEffect(() => {
    // Clean up the toasts when the component unmounts
    return () => toast.dismiss();
  }, []);

  return showToast;
};

export { Toaster, useToast };
