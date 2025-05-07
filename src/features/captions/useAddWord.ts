import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";
import type { CaptionsSchema } from "./captionsSchema";

const addWord = async (data: CaptionsSchema) => {
  const response = await axiosInstance.post("/Api/Client/AddWord", data);
  return response.data;
};

const useAddWord = () => {
  return useMutation({
    mutationFn: addWord,
    mutationKey: ["addWord"],
  });
};

export default useAddWord;
