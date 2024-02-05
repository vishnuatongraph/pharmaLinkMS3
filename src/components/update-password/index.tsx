"use client";
import Link from "next/link";
import React, { useState } from "react";
import Heading from "../common/Heading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DynamicForm from "../Forms/dynamicForm";
import resetPasswordFields from "./fields";
import ResetPasswordSchema from "./schema";
import LoginHeader from "../common/LoginHeader";
import useRouting from "@/hooks/routing";
import { useToast, Toaster } from "@/hooks/show-toast";
import { PRICING_PAGE } from "@/utils/constants/pageName";

const UpdatePassword = () => {
  const supabase = createClientComponentClient();
  const showToast = useToast();
  const [loading, setLoading] = useState(false);
  const { pushToPage } = useRouting();

  async function handleResetPassword(formData: any) {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (error) {
      showToast(error.message, "error");
      setLoading(false);
    } else {
      showToast("Password reset successfully", "success");
      pushToPage(`${PRICING_PAGE}`);
      setLoading(false);
    }
  }

  let description =
    "Enter new password for your account,then login with the new one ";

  return (
    <>
      <div className="lg:w-[40%] w-full sm:w-[70%] m-auto">
        <div className="flex flex-col justify-start items-start my-0 mx-5 md:mx-[60px] py-[50px]">
          <Heading />

          <LoginHeader title={"Reset Password"} description={description}>
            <Link href={`/`}>
              <span
                // onClick={pushToPage(`/${userRole}/login`)}
                className="text-aqua underline"
              >
                Back to home.
              </span>
            </Link>
          </LoginHeader>

          <DynamicForm
            fields={resetPasswordFields}
            onSubmit={handleResetPassword}
            validationSchema={ResetPasswordSchema}
            submitButtonText={"Update Password"}
            loading={loading}
          />
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default UpdatePassword;
