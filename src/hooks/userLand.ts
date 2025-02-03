import useSWR from "swr";
import backendApi from "@/utils/backendApi";
import { PaginatedResponse } from "@/interfaces";
import { ILand } from "@/interfaces/responses";


interface UseLandProps {
  page?: number;
  limit?: number;
}

const fetcher = async (url: string) => {
  const { data } = await backendApi.get(url);
  return data;
};

const useLand = ({ page = 1, limit = 5 }: UseLandProps = {}) => {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<PaginatedResponse<ILand>>(
    `/land/farmers-land?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    lands: response?.data ?? [],
    pagination: response?.pagination,
    isLoading,
    error,
    mutate,
  };
};

export default useLand;
