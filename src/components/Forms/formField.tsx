import { Field, useField } from "formik";
import cn from "classnames";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
export default function FormField({
  label,
  id,
  type,
  placeholder,
  className,
  errors,
  touched,
}: any) {
  const [field, meta] = useField(id);

  const [showPassword, setShowPassword] = useState(false);

  if (id == "termsAndCondition") {
    return (
      <>
        <div className="relative">
          <label className="flex items-center">
            <Field
              id={id}
              name="termsAndCondition"
              type={"checkbox"}
              style={{
                accentColor: "greysixty",
                cursor: "pointer",
                border: "1px lightgray",
              }}
              // aria-label={id}
              placeholder={placeholder}
              className={cn(
                "form-checkbox h-5 w-5 ",
                errors && touched && "bg-red-50",
              )}
            />
            <span className="ml-2 text-greysixty">
              I accept terms & conditions, privacy policy
            </span>
          </label>
          {meta.touched && meta.error && (
            <ErrorMessage id={id} message={meta.error} />
          )}
        </div>
      </>
    );
  }
  return (
    <>
      <div className={`flex flex-col gap-[10px] font-inter relative`}>
        <label className="text-dark font-medium">{label}</label>
        <div className="flex justify-between p-4 items-center border border-lightgray rounded-[10px]">
          <Field
            {...field}
            id={id}
            type={
              type != "password" ? type : showPassword ? "text" : "password"
            }
            aria-label={id}
            placeholder={placeholder}
            className={cn(className, errors && touched && "bg-red-50")}
          />

          {(id == "password" || id == "confirmPassword") &&
            (showPassword ? (
              <MdOutlineVisibility
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  height: "24px",
                  width: "24px",
                  opacity: "40%",
                  cursor: "pointer",
                }}
              />
            ) : (
              <MdOutlineVisibilityOff
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  height: "24px",
                  width: "24px",
                  opacity: "40%",
                  cursor: "pointer",
                }}
              />
            ))}
        </div>
        {meta.touched && meta.error && (
          <ErrorMessage id={id} message={meta.error} />
        )}
      </div>
    </>
  );
}
