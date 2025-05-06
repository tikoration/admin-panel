import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";
import type { LoginSchemaType } from "./authSchema";

const login = async (data: LoginSchemaType) => {
  const response = await axiosInstance.post("/Api/Client/Login", data);
  return response;
};

const useLogin = () => {
  return useMutation({
    mutationFn: login,
    mutationKey: ["login"],
  });
};

export default useLogin;
