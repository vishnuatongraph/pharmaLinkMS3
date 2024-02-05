import Login from "@/components/login";

export default async function Page({
  params,
}: {
  params: { userRole: string };
}) {
  return (
    <>
      <Login userRole={params.userRole} />
      {/* <h1>This is the login page</h1> */}
    </>
  );
}

// export default Login;
