"use client";
import FarmerPageWrapper from "@/components/HOC/FarmerPageWrapper";
import { FC, memo, useCallback, useMemo } from "react";
import Spinner from "@/components/Spinner";
import { IOrder } from "@/interfaces/responses";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";
import OrderDetails from "@/components/OrderDetails";
import usePendingOrders from "@/hooks/usePendingOrders";

const FarmersDashboard: FC = () => {
  const { pagination, setPage, handleNext, handlePrev } = usePagination(1, 5);

  const {
    orders,
    isLoading,
    error,
    pagination: orderPagination,
  } = usePendingOrders(pagination);

  const memoizedHandleNext = useCallback(() => {
    handleNext(orderPagination?.totalPages);
  }, [handleNext, orderPagination?.totalPages]);

  const memoizedHandlePrev = useCallback(() => {
    handlePrev();
  }, [handlePrev]);

  const renderOrders = useMemo(() => {
    return orders.map((order: IOrder) => (
      <OrderDetails order={order} key={order.id} />
    ));
  }, [orders]);

  const renderError = useMemo(() => {
    return error ? <div>{error}</div> : null;
  }, [error]);

  const renderSpinner = useMemo(() => {
    return (
      <div>
        <Spinner />
      </div>
    );
  }, []);

  const wrappedContent = useMemo(() => {
    return (
      <FarmerPageWrapper title="Requested Orders" isAdmin>
        {isLoading ? (
          renderSpinner
        ) : (
          <>
            {renderError}
            {orders.length ? (
              <div className="flex gap-4 flex-wrap">{renderOrders}</div>
            ) : null}
          </>
        )}
        <Pagination
          activePage={pagination.page}
          totalPages={orderPagination?.totalPages || 1}
          onPageChange={setPage}
          handleNext={memoizedHandleNext}
          handlePrev={memoizedHandlePrev}
        />
      </FarmerPageWrapper>
    );
  }, [
    isLoading,
    renderSpinner,
    renderError,
    orders.length,
    renderOrders,
    pagination.page,
    orderPagination?.totalPages,
    setPage,
    memoizedHandleNext,
    memoizedHandlePrev,
  ]);

  return wrappedContent;
};

export default memo(FarmersDashboard);
