import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";
import type { CaptionsSchema } from "./captionsSchema";

const updateWord = async ({
  id,
  data,
}: {
  id: string;
  data: CaptionsSchema;
}) => {
  const response = axiosInstance.put(`/Api/Client/EditWord/${id}`, data);
  return response;
};

const useUpdateWord = () => {
  return useMutation({
    mutationFn: updateWord,
    mutationKey: ["updateWord"],
  });
};

export default useUpdateWord;
