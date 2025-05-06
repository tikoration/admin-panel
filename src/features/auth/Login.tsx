import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import ControlledTextInput from "../../components/ControlledTextInput";
import FormComponent from "../../components/FormComponent";
import { loginSchema, type LoginSchemaType } from "./authSchema";
import useLogin from "./useLogin";

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
      onSuccess: () => {
        navigate("/captions");
      },
    });
  };

  return (
    <>
      <FormComponent methods={methods} onSubmit={handleLogin}>
        <Box display={"flex"} flexDirection={"column"} gap={4}>
          <ControlledTextInput id="username" name="username" label="Username" />
          <ControlledTextInput
            id="password"
            name="password"
            label="Password"
            type="password"
          />
        </Box>
        <Button
          type="submit"
          sx={{
            marginTop: "10px",
            width: "100%",
          }}
          disabled={isPending}
        >
          Log in
        </Button>
        <Typography>
          Don't have an account yet?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register here
          </span>
        </Typography>
      </FormComponent>
    </>
  );
};

export default Login;
