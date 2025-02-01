import useSWR from "swr";
import backendApi from "@/utils/backendApi";
import { IOrderDetails } from "../lib/farmers";

interface PaginatedResponse {
  data: IOrderDetails[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface UseOrderDerDetailsProps {
  page?: number;
  limit?: number;
}

const fetcher = async (url: string) => {
  const { data } = await backendApi.get(url);
  return data;
};

const useOrderDetails = ({
  page = 1,
  limit = 5,
}: UseOrderDerDetailsProps = {}) => {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<PaginatedResponse>(
    `/orders/farmer-orders?page=${page}&limit=${limit}`,
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

export default useOrderDetails;
