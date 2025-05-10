import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
export const signUpSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .test("is-required", function (value) {
      if (!value) {
        return this.createError({ message: "Password is required" });
      }

      const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;
      if (value && !regex.test(value)) {
        return this.createError({
          message:
            "Password must be at least 8 characters long, contain at least one uppercase letter, and one digit",
        });
      }
      return true;
    }),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Password Confirmation field is required"),
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;
export type SignUpSchemaType = yup.InferType<typeof signUpSchema>;
