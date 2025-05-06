import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";
import type { SignUpSchemaType } from "./authSchema";

const SignUp = async (data: SignUpSchemaType) => {
  const response = await axiosInstance.post("/Api/Client/Register", data);
  return response;
};

const useSignUp = () => {
  return useMutation({
    mutationFn: SignUp,
    mutationKey: ["SignUp"],
  });
};

export default useSignUp;
