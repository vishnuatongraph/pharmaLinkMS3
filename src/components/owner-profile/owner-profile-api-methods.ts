export const AddOwnerFirstStep = async (values: any) => {
  let res = await fetch(`/api/owner-profile`, {
    method: "POST",
    body: JSON.stringify(values),
  });

  return res;
};

export const UpdateOwnerProfileInfo = async (values: any) => {
  try {
    let res = await fetch(`/api/owner-profile`, {
      method: "PUT",
      body: JSON.stringify({ ...values }),
    });

    return res;
  } catch (error) {
    return { status: 400, message: "Unknown Error occurred" };
  }
};
