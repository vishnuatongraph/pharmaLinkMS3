import { Form, Formik, FormikErrors, FormikTouched } from "formik";
import React from "react";
import FormField from "./formField";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";
import SpinnerLoader from "../common/SpinnerLoader";

interface Field {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  className: string;
}

interface DynamicFormProps {
  fields: Field[];
  /*eslint-disable-next-line */
  onSubmit: (values: any) => void;
  validationSchema: any;
  submitButtonText: string;
  additionalLink?: {
    text: string;
    link: string;
  };
  loading: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  validationSchema,
  additionalLink,
  submitButtonText,
  loading,
}) => {
  return (
    <Formik
      initialValues={Object.fromEntries(
        fields.map((field: any) => [field.id, ""]),
      )}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-6 w-full m-auto font-inter">
          {fields.map((field: any) => (
            <FormField
              key={field.id}
              label={field.label}
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              className={field.className}
              errors={
                errors[field.id] as unknown as FormikErrors<Record<string, any>>
              }
              touched={
                touched[field.id] as unknown as FormikTouched<
                  Record<string, any>
                >
              }
            />
          ))}

          {additionalLink && (
            <>
              <Link href={`/${additionalLink.link}`} className="text-end">
                <span className="text-aqua underline ">
                  {additionalLink?.text}
                </span>
              </Link>
            </>
          )}

          <button
            className="w-full h-[56px] rounded-[10px] bg-aqua hover:bg-[#20989E] text-white flex justify-center items-center gap-2"
            type="submit"
          >
            {loading ? (
              <>
                <SpinnerLoader isPageLoader={false} />
              </>
            ) : (
              <>
                <CiLogin style={{ height: "25px", width: "25px" }} />
                {submitButtonText}
              </>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
