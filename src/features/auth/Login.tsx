import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import ControlledTextInput from "../../components/ControlledTextInput";
import FormComponent from "../../components/FormComponent";
import { loginSchema, type LoginSchemaType } from "./authSchema";
import useLogin from "./useLogin";
import theme from "../../theme/theme";
import authResponseHandler from "./authResponseHandler";
import type { AxiosError } from "axios";
const Login = () => {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const methods = useForm<LoginSchemaType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
    },
  });

  const handleLogin = (data: LoginSchemaType) => {
    login(data, {
      onSuccess: (res) => {
        authResponseHandler(res);
        navigate("/captions");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ error: string }>;
        methods.setError("password", {
          message: axiosError.response?.data.error || "Something went wrong",
        });
      },
    });
  };

  return (
    <FormComponent methods={methods} onSubmit={handleLogin}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
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
        {isPending ? (
          <LinearProgress />
        ) : (
          <Button
            type="submit"
            sx={{
              width: "100%",
              color: "#ffffff",
            }}
            variant="contained"
            disabled={isPending}
          >
            Log in
          </Button>
        )}
      </Box>
      <Typography sx={{ fontSize: "11px", textAlign: "center", mt: "10px" }}>
        Don't have an account yet?{" "}
        <span
          style={{ color: theme.palette.primary.dark, cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </Typography>
    </FormComponent>
  );
};

export default Login;
