import * as yup from "yup";

export const captionsSchema = yup.object().shape({
  national: yup.string().required("The field is required"),
  foreign: yup.string().required("The field is required"),
});

export type CaptionsSchema = yup.InferType<typeof captionsSchema>;
