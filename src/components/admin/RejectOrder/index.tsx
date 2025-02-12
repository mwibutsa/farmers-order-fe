import Modal from "@/components/Modal";
import { OrderStatus } from "@/constants/enums";
import { useApiCall } from "@/hooks/useApiCall";
import { IOrderStatusPayload } from "@/interfaces/payload";
import { IOrder } from "@/interfaces/responses";
import { updateOrderStatusHandler } from "@/lib/admin";
import { FC, memo, ReactNode, useCallback } from "react";

const RejectOrder: FC<{
  children?: ReactNode;
  orderId: number;
  afterAction?: () => void;
}> = ({ children, orderId, afterAction }) => {
  const { execute, isLoading } = useApiCall<
    { data: IOrder; status: number },
    IOrderStatusPayload
  >();

  const approveOrderHandler = useCallback(
    async (afterSubmit?: () => void) => {
      const { success } = await execute(() =>
        updateOrderStatusHandler({ orderId, status: OrderStatus.REJECTED })
      );

      if (success) {
        afterSubmit?.();
        afterAction?.();
      }
    },
    [orderId, execute, afterAction]
  );

  return (
    <Modal
      toggleLabel="Reject"
      triggerClasses="border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-1"
      title="You're about to reject farmer request."
      onAccept={approveOrderHandler}
      loadButton={isLoading}
      disableButton={isLoading}
    >
      {children}
    </Modal>
  );
};

export default memo(RejectOrder);
