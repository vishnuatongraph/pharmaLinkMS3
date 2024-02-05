"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Heading from "../common/Heading";
import LoginHeader from "../common/LoginHeader";
import Link from "next/link";
import DynamicForm from "../Forms/dynamicForm";
import { useState } from "react";
// import { loginHeaderDescription, showingRoles } from "@/utils/constants/roles";
import ForgotPasswordSchema from "./schema";
import forgotPasswordFields from "./fields";
import { UPDATE_PAGE } from "@/utils/constants/pageName";
import { Toaster, useToast } from "@/hooks/show-toast";
import { contents, buttonText, toast } from "@/utils/constants/forget-password";

// import type { Database } from "@/lib/database.types";

export default function ForgotPassword() {
  const supabase = createClientComponentClient();
  const showToast = useToast();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line

  const handleForgotPassword = async (formData: any) => {
    const redirectRoute = window.location.origin + "/" + UPDATE_PAGE;
    setLoading(true);
    // eslint-disable-next-line
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      formData.email,
      {
        redirectTo: `${redirectRoute}`,
      },
    );

    if (error) {
      showToast(error.message, "error");
      setLoading(false);
    } else {
      showToast(toast.RESET_MAIL_SENT_SUCCESSFULLY, "success");
      setLoading(false);

      // setErrorMsg("");
      // pushToPage("/pricing");
    }
    // router.refresh();
  };

  return (
    <>
      <div className="lg:w-[45.8%] w-full sm:w-[70%] m-auto">
        <div className="flex flex-col justify-start items-start my-0 mx-5 md:mx-[60px] py-[50px]">
          <Heading />

          <LoginHeader
            title={contents.FORGOT_PASSWORD}
            description={contents.SEND_EMAIL}
          >
            <Link href={`/`}>
              <span
                // onClick={pushToPage(`/${userRole}/login`)}
                className="text-aqua underline"
              >
                {contents.BACK_TO_HOME}
              </span>
            </Link>
          </LoginHeader>

          <DynamicForm
            fields={forgotPasswordFields}
            onSubmit={handleForgotPassword}
            validationSchema={ForgotPasswordSchema}
            submitButtonText={buttonText.SEND_LINK}
            loading={loading}
          />
        </div>
        <Toaster />
      </div>
    </>
  );
}
