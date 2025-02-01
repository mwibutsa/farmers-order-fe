import useSWR from "swr";
import backendApi from "@/utils/backendApi";

export interface ISeed {
  id: number;
  name: string;
  description: string;
  pricePerKg: number;
  kgPerAcre: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PaginatedResponse {
  data: ISeed[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

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
  } = useSWR<PaginatedResponse>(`/seeds?page=${page}&limit=${limit}`, fetcher);

  return {
    seeds: response?.data ?? [],
    meta: response?.meta,
    isLoading,
    error,
    mutate,
  };
};

export default useSeed;
