export const AddUserFirstStep = async (values: any) => {
  let res = await fetch(`/api/user-profile`, {
    method: "POST",
    body: JSON.stringify(values),
  });

  return res;
};

export const UpdateUserProfileInfo = async (values: any) => {
  try {
    let res = await fetch(`/api/user-profile`, {
      method: "PUT",
      body: JSON.stringify({ ...values }),
    });

    return res;
  } catch (error) {
    return { status: 400, message: "Unknown Error occurred" };
  }
};
