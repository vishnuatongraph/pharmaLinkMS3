"use client";
import Link from "next/link";
import React, { useState } from "react";
import Heading from "../common/Heading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { dbRoles, showingRoles } from "@/utils/constants/roles";
import DynamicForm from "../Forms/dynamicForm";
import fields from "./fields";
import SignUpSchema from "./schema";
import LoginHeader from "../common/LoginHeader";
import { LOGIN_PAGE } from "@/utils/constants/pageName";
import { useToast, Toaster } from "@/hooks/show-toast";
import useRouting from "@/hooks/routing";
import { contents, buttonText, toast } from "@/utils/constants/register";

const SignUpForm = ({ userRole }: { userRole: string }) => {
  const showToast = useToast();
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const { pushToPage } = useRouting();

  let roleForDb =
    userRole == showingRoles.PHARACIST ? dbRoles.USER : dbRoles.OWNER;
  async function signUp(formData: any) {
    const redirectRoute =
      window.location.origin + "/" + userRole + "/" + LOGIN_PAGE;
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,

      options: {
        emailRedirectTo: `${redirectRoute}`,
        data: {
          role: roleForDb,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      },
    });

    // "aud": "authenticated",

    if (error) {
      showToast(error.message, "error");
      setLoading(false);
      return;
    }
    if (data?.user?.identities?.length == 0) {
      showToast(toast.USER_ALREADY_REGISTERD, "error");
      setLoading(false);
      return;
    } else {
      showToast(toast.USER_REGISTERD_SUCCESSFULLY, "success");

      setTimeout(() => {
        pushToPage(`${window.location.origin}/${userRole}/${LOGIN_PAGE}`);
      }, 2000);
      // showToast("Please  registered successfully", "success");
      setLoading(false);
    }
  }
  return (
    <>
      <div className="lg:w-[45.8%] w-full sm:w-[70%] m-auto">
        <div className="flex flex-col justify-start items-start p-5 mx-auto max-w-[500px]">
          <Heading />

          <LoginHeader
            title={"Sign Up"}
            description={contents.ALREADY_AN_ACCOUNT}
          >
            <Link href={`/${userRole}/login`}>
              <span
                // onClick={pushToPage(`/${userRole}/login`)}
                className="text-aqua underline"
              >
                {contents.SIGN_IN}
              </span>
            </Link>
          </LoginHeader>

          <DynamicForm
            fields={fields}
            onSubmit={signUp}
            validationSchema={SignUpSchema}
            submitButtonText={buttonText.SIGN_UP}
            loading={loading}
          />
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default SignUpForm;
