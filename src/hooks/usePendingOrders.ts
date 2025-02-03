import useSWR from "swr";
import backendApi from "@/utils/backendApi";
import { PaginatedResponse } from "@/interfaces";
import { IOrder } from "@/interfaces/responses";

interface UseOrderDerDetailsProps {
  page?: number;
  limit?: number;
}

const fetcher = async (url: string) => {
  const { data } = await backendApi.get(url);
  return data;
};

const usePendingOrders = ({
  page = 1,
  limit = 5,
}: UseOrderDerDetailsProps = {}) => {
  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<PaginatedResponse<IOrder>>(
    `/orders/pending?page=${page}&limit=${limit}`,
    fetcher
  );

  return {
    orders: response?.data ?? [],
    pagination: response?.pagination,
    isLoading,
    error,
    mutate,
  };
};

export default usePendingOrders;
