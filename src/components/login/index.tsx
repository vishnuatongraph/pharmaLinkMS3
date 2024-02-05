"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Heading from "../common/Heading";
import LoginHeader from "../common/LoginHeader";
import Link from "next/link";
import DynamicForm from "../Forms/dynamicForm";
import loginFields from "./fields";
import LoginSchema from "./schema";
import { useState } from "react";
import useRouting from "@/hooks/routing";
import { loginHeaderDescription, showingRoles } from "@/utils/constants/roles";
import { useToast, Toaster } from "@/hooks/show-toast";
import { contents, buttonText, toast } from "@/utils/constants/login";

// import type { Database } from "@/lib/database.types";

export default function Login({ userRole }: any) {
  const showToast = useToast();

  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(false);
  const { pushToPage } = useRouting();

  let description =
    userRole == showingRoles.PHARACIST
      ? loginHeaderDescription.user
      : loginHeaderDescription.owner;

  const handleSignIn = async (formData: any) => {
    setLoading(true);
    let { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      // setErrorMsg(error.message);
      showToast(error.message, "error");
      setLoading(false);
    } else {
      showToast(toast.LOGGED_IN_SUCCESSFULLY, "success");
      setLoading(false);
      // showToast("Please  registered successfully", "success");
      pushToPage("/pricing");
    }
  };

  const forgotPassword = {
    text: "Forgot Password",
    link: "forgot-password",
  };

  return (
    <>
      <div className="lg:w-[45.8%] w-full sm:w-[70%] m-auto">
        <div className="flex flex-col justify-start items-start p-5 mx-auto max-w-[500px]">
          <Heading />

          <LoginHeader
            title={"Welcome back"}
            description={description}
            lineheight="leading-[24px]"
          >
            <Link href={`/${userRole}/register`}>
              <span
                // onClick={pushToPage(`/${userRole}/login`)}
                className="text-aqua underline"
              >
                {contents.SIGN_UP}
              </span>
            </Link>
          </LoginHeader>

          <DynamicForm
            fields={loginFields}
            onSubmit={handleSignIn}
            validationSchema={LoginSchema}
            submitButtonText={buttonText.SIGN_IN}
            additionalLink={forgotPassword}
            loading={loading}
          />
        </div>
        <Toaster />
      </div>
    </>
  );
}
