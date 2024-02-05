import React from "react";
import SpinnerLoader from "@/components/common/SpinnerLoader";

function Loading() {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <SpinnerLoader isPageLoader={true} />
    </div>
  );
}

export default Loading;
