import useSWR from "swr";
import backendApi from "@/utils/backendApi";
import { PaginatedResponse } from "@/interfaces";

export interface ILand {
  id: number;
  farmerId: number;
  landSize: number;
  location: string;
  upi: string;
  createdAt: Date;
  updatedAt: Date;
}

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
    lands: response?.data?.data ?? [],
    pagination: response?.data?.pagination,
    isLoading,
    error,
    mutate,
  };
};

export default useLand;
