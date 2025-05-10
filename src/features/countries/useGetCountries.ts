import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axiosInstance";

interface IFilters {
  currency: string;
}

export interface ICountriesResponse {
  region: string;
  name: {
    common: string;
  };
  capital: string;
  currencies: string;
  languages: string;
  independent: boolean;
}

const getCountries = async (params: IFilters) => {
  const currency = params.currency;
  const response = await axiosInstance.get(
    `https://restcountries.com/v3.1/${
      currency ? `currency/${currency}` : "all"
    }`
  );
  return response.data;
};

const useGetCountries = (params: IFilters) => {
  return useQuery<ICountriesResponse[]>({
    queryKey: ["getCountries", params],
    queryFn: () => getCountries(params),
  });
};

export default useGetCountries;
