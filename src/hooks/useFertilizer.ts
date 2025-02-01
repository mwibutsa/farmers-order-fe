import useSWR from "swr";
import backendApi from "@/utils/backendApi";

export interface IFertilizer {
  id: number;
  name: string;
  description: string;
  pricePerKg: number;
  kgPerAcre: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PaginatedResponse {
  data: IFertilizer[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

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
  } = useSWR<PaginatedResponse>(
    `/fertilizers?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    fertilizers: response?.data ?? [],
    meta: response?.meta,
    isLoading,
    error,
    mutate,
  };
};

export default useFertilizer;
