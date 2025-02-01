import useSWR from "swr";
import backendApi from "@/utils/backendApi";

export interface ILand {
  id: string;
  farmerId: number;
  landSize: number;
  location: string;
  upi: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PaginatedResponse {
  data: ILand[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
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
  } = useSWR<PaginatedResponse>(
    `/land/farmers-land?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    lands: response?.data ?? [],
    meta: response?.meta,
    isLoading,
    error,
    mutate,
  };
};

export default useLand;
