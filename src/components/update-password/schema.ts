import * as Yup from "yup";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Must Contain 6 Characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is Required")
    .test(
      "match",
      "Confirm Password must match the password",
      function (value) {
        return value === this.parent.password;
      },
    ),
});

export default ResetPasswordSchema;
