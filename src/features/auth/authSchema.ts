import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
export const signUpSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Password Confirmation field is required"),
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;
export type SignUpSchemaType = yup.InferType<typeof signUpSchema>;
