"use client";
import FarmerPageWrapper from "@/components/HOC/FarmerPageWrapper";
import useOrderDetails from "@/hooks/userOrderDetails";
import { FC } from "react";
import Spinner from "@/components/Spinner";
import { IOrder } from "@/interfaces/responses";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import OrderDetails from "@/components/OrderDetails";

const FarmersDashboard: FC = () => {
  const { pagination, setPage, handleNext, handlePrev } = usePagination(1, 5);

  const {
    orders,
    isLoading,
    error,
    pagination: orderPagination,
  } = useOrderDetails(pagination);

  return (
    <FarmerPageWrapper title="Order Management">
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          {error && <div>{error}</div>}
          {orders.length ? (
            <div className="flex gap-4 flex-wrap">
              {orders.map((order: IOrder) => {
                return <OrderDetails order={order} key={order.id} />;
              })}
            </div>
          ) : null}
        </>
      )}
      <Pagination
        activePage={pagination.page}
        totalPages={orderPagination?.totalPages || 1}
        onPageChange={setPage}
        handleNext={handleNext(orderPagination?.totalPages)}
        handlePrev={handlePrev}
      />
    </FarmerPageWrapper>
  );
};

export default FarmersDashboard;
