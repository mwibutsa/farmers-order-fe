import useSWR from "swr";
import backendApi from "@/utils/backendApi";
import { PaginatedResponse } from "@/interfaces";
import { IFertilizer } from "@/interfaces/responses";


interface UseFertilizerProps {
  page?: number;
  limit?: number;
}

const fetcher = async (url: string) => {
  const { data } = await backendApi.get(url);
  return data;
};

const useFertilizer = ({ page = 1, limit = 5 }: UseFertilizerProps = {}) => {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<PaginatedResponse<IFertilizer>>(
    `/fertilizers?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    fertilizers: response?.data ?? [],
    pagination: response?.pagination,
    isLoading,
    error,
    mutate,
  };
};

export default useFertilizer;
