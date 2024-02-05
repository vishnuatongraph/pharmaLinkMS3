import SignUp from "@/components/register";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { PRICING_PAGE } from "@/utils/constants/pageName";

export default async function Register({
  params,
}: {
  params: { userRole: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect(`/${PRICING_PAGE}`);
  }
  return (
    <>
      <SignUp userRole={params.userRole} />
    </>
  );
}
