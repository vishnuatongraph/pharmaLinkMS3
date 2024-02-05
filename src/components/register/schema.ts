import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
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
  termsAndCondition: Yup.bool()
    .test(
      "consent",
      "You have to agree with our Terms and Conditions!",
      function (value) {
        return value === true;
      },
    )
    .required("You have to agree with our Terms and Conditions!"),
});

export default SignUpSchema;
