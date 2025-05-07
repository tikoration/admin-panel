import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";

const deleteWord = async (id: string) => {
  const response = await axiosInstance.delete(`/Api/Client/DeleteWord/${id}`);
  return response;
};

const useDeleteWord = () => {
  return useMutation({
    mutationFn: deleteWord,
    mutationKey: ["deleteWord"],
  });
};

export default useDeleteWord;
