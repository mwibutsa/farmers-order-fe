import { IOrder, OrderDetail } from "@/interfaces/responses";
import { FC } from "react";

const STATUS_CLASS = {
  PENDING: "bg-gray-50 border-gray-200 text-gray-700",
  REJECTED: "text-red-500 border-red-500 bg-red-100",
  APPROVED: "text-green-500 border-green-500 bg-green-100",
};
const OrderDetails: FC<{ order: IOrder }> = ({ order }) => {
  return (
    <ul
      key={order.id}
      className="border border-gray-200 bg-white p-4 rounded-md w-64"
    >
      <li className="mb-1">
        <span className="font-bold">UPI:</span>
        <span className="font-light text-sl">{order.land.upi}</span>
      </li>
      <li className="mb-1">
        <span className="font-bold">Land Size:</span> {order.land.landSize} Are
      </li>
      {order.orderDetails.map((orderDetail: OrderDetail) => {
        return (
          <ul key={orderDetail.id}>
            {orderDetail?.seed && (
              <li className="mb-1">
                <span className="font-bold"> Seed:</span> {orderDetail.quantity}
                kg of {orderDetail?.seed?.name}
              </li>
            )}
            {orderDetail?.fertilizer && (
              <li className="mb-1">
                <span className="font-bold">Fertilizer:</span>{" "}
                {orderDetail.quantity}kg of {orderDetail.fertilizer.name}
              </li>
            )}
          </ul>
        );
      })}
      <li
        className={`${
          STATUS_CLASS[order.status]
        } border inline-block px-2 rounded-sm mt-4 text-sm font-semibold py-1`}
      >
        {order.status}
      </li>
    </ul>
  );
};

export default OrderDetails;
