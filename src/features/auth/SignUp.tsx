import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import ControlledTextInput from "../../components/ControlledTextInput";
import FormComponent from "../../components/FormComponent";
import { signUpSchema, type SignUpSchemaType } from "./authSchema";
import useSignUp from "./useSignUp";

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
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <>
      <FormComponent methods={methods} onSubmit={handleRegister}>
        <Box display={"flex"} flexDirection={"column"} gap={4}>
          <ControlledTextInput id="username" name="username" label="Username" />
          <ControlledTextInput
            id="password"
            name="password"
            label="Password"
            type="password"
          />
          <ControlledTextInput
            id="confirm_password"
            name="confirm_password"
            label="Confirm Password"
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
          Sign up
        </Button>
        <Typography>
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </Typography>{" "}
      </FormComponent>
    </>
  );
};

export default SignUp;
