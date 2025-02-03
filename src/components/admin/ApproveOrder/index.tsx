import Modal from "@/components/Modal";
import { OrderStatus } from "@/constants/enums";
import { useApiCall } from "@/hooks/useApiCall";
import { IOrderStatusPayload } from "@/interfaces/payload";
import { IOrder } from "@/interfaces/responses";
import { updateOrderStatusHandler } from "@/lib/admin";
import { FC, memo, ReactNode, useCallback } from "react";

const ApproveOrder: FC<{ children?: ReactNode; orderId: number }> = ({
  children,
  orderId,
}) => {
  const { execute, isLoading } = useApiCall<
    { data: IOrder; status: number },
    IOrderStatusPayload
  >();

  const approveOrderHandler = useCallback(
    async (afterSubmit?: () => void) => {
      const { success } = await execute(() =>
        updateOrderStatusHandler({ orderId, status: OrderStatus.APPROVED })
      );

      if (success) {
        afterSubmit?.();
      }
    },
    [orderId, execute]
  );

  return (
    <Modal
      triggerClasses="py-1"
      toggleLabel="Approve"
      title="You're about to approve farmer request."
      onAccept={approveOrderHandler}
      loadButton={isLoading}
      disableButton={isLoading}
    >
      {children}
    </Modal>
  );
};

export default memo(ApproveOrder);
