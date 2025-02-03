import { IOrder, OrderStatus } from "@/interfaces/responses";
import backendApi from "@/utils/backendApi";

export const updateOrderStatusHandler = async ({
  orderId,
  status,
}: {
  orderId: number;
  status: OrderStatus;
}): Promise<{ data: IOrder; status: number }> => {
  const { data } = await backendApi.put(`/orders/${orderId}/status`, {
    status,
  });
  return data;
};
