import useSWR from "swr";
import backendApi from "@/utils/backendApi";
import { PaginatedResponse } from "@/interfaces";
import { ISeed } from "@/interfaces/responses";


interface UseSeedProps {
  page?: number;
  limit?: number;
}

const fetcher = async (url: string) => {
  const { data } = await backendApi.get(url);
  return data;
};

const useSeed = ({ page = 1, limit = 5 }: UseSeedProps = {}) => {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<PaginatedResponse<ISeed>>(
    `/seeds/with-fertilizers?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    seeds: response?.data ?? [],
    meta: response?.pagination,
    isLoading,
    error,
    mutate,
  };
};

export default useSeed;
