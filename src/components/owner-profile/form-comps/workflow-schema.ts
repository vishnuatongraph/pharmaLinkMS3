import * as Yup from "yup";

export const workFlowInitialValues = {
  entrance: "",
  flowRate: "",
  workflowData: {
    day: { pharmacist: [0, 0], technician: [0, 0] },
    evening: { pharmacist: [0, 0], technician: [0, 0] },
    weekends: { pharmacist: [0, 0], technician: [0, 0] },
  },
  color: "",
  ques1: "",
  ques2: "",
  additionalInfo: "",
};
const workFlowValidationSchema = Yup.object({
  entrance: Yup.string().required("Entrance is required"),
  flowRate: Yup.string().required("Flow rate is required"),
  day: Yup.object().shape({
    pharmacist: Yup.array()
      .of(Yup.number().min(0, "Must be greater than or equal to 0"))
      .required("Pharmacist numbers are required"),
    technician: Yup.array()
      .of(Yup.number().min(0, "Must be greater than or equal to 0"))
      .required("Technician numbers are required"),
  }),
  evening: Yup.object().shape({
    pharmacist: Yup.array()
      .of(Yup.number().min(0, "Must be greater than or equal to 0"))
      .required("Pharmacist numbers are required"),
    technician: Yup.array()
      .of(Yup.number().min(0, "Must be greater than or equal to 0"))
      .required("Technician numbers are required"),
  }),
  weekend: Yup.object().shape({
    pharmacist: Yup.array()
      .of(Yup.number().min(0, "Must be greater than or equal to 0"))
      .required("Pharmacist numbers are required"),
    technician: Yup.array()
      .of(Yup.number().min(0, "Must be greater than or equal to 0"))
      .required("Technician numbers are required"),
  }),
  color: Yup.string().required("Color is required"),
  ques1: Yup.string().required("Question 1 is required"),
  ques2: Yup.string().required("Question 2 is required"),
  additionalInfo: Yup.string().required("Additional information is required"),
});

export default workFlowValidationSchema;
