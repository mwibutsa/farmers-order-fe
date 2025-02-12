import { IOrder, OrderDetail } from "@/interfaces/responses";
import { FC, useMemo } from "react";
import RejectOrder from "../admin/RejectOrder";
import ApproveOrder from "../admin/ApproveOrder";

const STATUS_CLASS = {
  PENDING: "bg-gray-50 border-gray-200 text-gray-700",
  REJECTED: "text-red-500 border-red-500 bg-red-100",
  APPROVED: "text-green-500 border-green-500 bg-green-100",
};
const OrderDetails: FC<{
  order: IOrder;
  isAdmin?: boolean;
  mutate?: () => void;
}> = ({ order, isAdmin, mutate }) => {
  const orderSummary = useMemo(() => {
    const seedsTotal = order.orderDetails.reduce(
      (acc, detail) => (detail.seed ? acc + detail.quantity : acc),
      0
    );
    const fertilizersTotal = order.orderDetails.reduce(
      (acc, detail) => (detail.fertilizer ? acc + detail.quantity : acc),
      0
    );

    const parts = [];
    if (seedsTotal) parts.push(`${seedsTotal}kg of seeds`);
    if (fertilizersTotal) parts.push(`${fertilizersTotal}kg of fertilizers`);

    return parts.length
      ? `The farmer has requested ${parts.join(" and ")}.`
      : "";
  }, [order.orderDetails]);
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
      {!isAdmin && (
        <li
          className={`${
            STATUS_CLASS[order.status]
          } border inline-block px-2 rounded-sm mt-4 text-sm font-semibold py-1`}
        >
          {order.status}
        </li>
      )}
      {isAdmin && (
        <>
          <div className="flex justify-between mt-4">
            <ApproveOrder afterAction={mutate} orderId={order.id}>
              {orderSummary}
            </ApproveOrder>
            <RejectOrder afterAction={mutate} orderId={order.id}>
              {orderSummary}
            </RejectOrder>
          </div>
        </>
      )}
    </ul>
  );
};

export default OrderDetails;
