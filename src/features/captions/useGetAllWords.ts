import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";
export interface IWordsContent {
  _id: string;
  national: string;
  foreign: string;
}

interface IAllWordsResponse {
  words: IWordsContent[];
}
const getAllWords = async () => {
  const response = await axiosInstance.get("/Api/Client/GetAllWords");
  return response.data;
};

const useGetAllWords = () => {
  return useQuery<IAllWordsResponse>({
    queryFn: getAllWords,
    queryKey: ["getAllWords"],
  });
};

export default useGetAllWords;
