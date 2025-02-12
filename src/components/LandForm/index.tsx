"use client";

import { ChangeEvent, FC, useCallback, useMemo, useState, memo } from "react";
import Input from "../Input";
import Modal from "../Modal";
import { addLandInfoHandler } from "@/lib/farmers";
import { useApiCall } from "@/hooks/useApiCall";
import { ILand } from "@/interfaces/responses";
interface LandPayload {
  upi: string;
  location?: string;
  landSize: number;
}

const LandForm: FC<{ mutate?: () => void }> = ({ mutate }) => {
  const { execute, isLoading, error } = useApiCall<ILand | undefined>();

  const [payload, setPayload] = useState<LandPayload>({
    upi: "",
    location: "",
    landSize: 0,
  });

  const onChange = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
      setPayload((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const disableSubmit = useMemo(() => {
    return +payload.landSize <= 0 || payload.upi.trim() === "";
  }, [payload]);

  const submitHandler = useCallback(
    async (afterSubmit?: () => void) => {
      if (disableSubmit) return;

      const { success } = await execute(() =>
        addLandInfoHandler({
          ...payload,
          landSize: +payload.landSize,
        })
      );

      if (success) {
        setPayload({
          landSize: 0,
          upi: "",
          location: "",
        });
        mutate?.();
        afterSubmit?.();
      }
    },
    [disableSubmit, payload, mutate, execute]
  );

  const MemoizedInputUpi = useMemo(
    () => (
      <Input
        name="upi"
        value={payload.upi}
        label="UPI"
        placeholder="UPI"
        onChange={onChange}
      />
    ),
    [payload.upi, onChange]
  );

  const MemoizedInputLandSize = useMemo(
    () => (
      <Input
        name="landSize"
        label="Land size in Acres"
        placeholder="0.5"
        onChange={onChange}
        value={payload.landSize}
        type="number"
      />
    ),
    [payload.landSize, onChange]
  );

  const MemoizedInputLocation = useMemo(
    () => (
      <Input
        name="location"
        label="Location (optional)"
        placeholder="Kigali, Rwanda"
        onChange={onChange}
        value={payload.location}
      />
    ),
    [payload.location, onChange]
  );

  return (
    <Modal
      disableButton={disableSubmit}
      loadButton={isLoading}
      toggleLabel="Add more"
      onAccept={submitHandler}
      title="Add new land information"
    >
      <form action="">
        {error && (
          <div className="text-red-500 mb-4 bg-red-100 p-2 rounded-md pl-4">
            {error.message}
          </div>
        )}
        {MemoizedInputUpi}
        {MemoizedInputLandSize}
        {MemoizedInputLocation}
      </form>
    </Modal>
  );
};

export default memo(LandForm);
