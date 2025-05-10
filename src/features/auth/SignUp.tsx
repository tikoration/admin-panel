import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import ControlledTextInput from "../../components/ControlledTextInput";
import FormComponent from "../../components/FormComponent";
import { signUpSchema, type SignUpSchemaType } from "./authSchema";
import useSignUp from "./useSignUp";
import theme from "../../theme/theme";
import notify from "../../utils/toastNotify";
import authResponseHandler from "./authResponseHandler";
import type { AxiosError } from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useSignUp();
  const methods = useForm<SignUpSchemaType>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleRegister = (data: SignUpSchemaType) => {
    register(data, {
      onSuccess: (res) => {
        if (res.status === 400) {
          methods.setError("username", {
            message: res.errorMessage || "Something went wrong",
          });
        } else {
          authResponseHandler(res);
          notify("User registered successfully", "success");
          navigate("/captions");
        }
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ errorMessage: string }>;
        methods.setError("username", {
          message:
            axiosError?.response?.data.errorMessage || "Something went wrong",
        });
      },
    });
  };

  return (
    <>
      <FormComponent methods={methods} onSubmit={handleRegister}>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <ControlledTextInput
            id="username"
            name="username"
            label="Username"
            disabled={isPending}
          />
          <ControlledTextInput
            id="password"
            name="password"
            label="Password"
            type="password"
            disabled={isPending}
          />
          <ControlledTextInput
            id="confirm_password"
            name="confirm_password"
            label="Confirm Password"
            type="password"
            disabled={isPending}
          />
          {isPending ? (
            <LinearProgress />
          ) : (
            <Button
              type="submit"
              sx={{
                width: "100%",
                color: "#ffffff",
              }}
              disabled={isPending}
              variant="contained"
            >
              Sign up
            </Button>
          )}
        </Box>
        <Typography sx={{ fontSize: "11px", textAlign: "center", mt: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: theme.palette.primary.dark, cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </Typography>
      </FormComponent>
    </>
  );
};

export default SignUp;
