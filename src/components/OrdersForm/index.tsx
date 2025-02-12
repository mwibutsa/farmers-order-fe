import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Modal from "../Modal";
import useLand from "@/hooks/userLand";
import SelectInput from "../SelectInput";
import useSeed from "@/hooks/useSeeds";
import { useApiCall } from "@/hooks/useApiCall";
import React from "react";
import { IOrder, ISeed } from "@/interfaces/responses";
import { IMakeOrderPayload } from "@/interfaces/payload";
import { makeOrder } from "@/lib/farmers";

type OrderFormProps = {
  selectedLand?: number;
  mutateOrders?: () => void;
};
const OrdersForm: FC<OrderFormProps> = ({ selectedLand, mutateOrders }) => {
  const { lands, isLoading: loadingLands } = useLand();
  const { seeds, isLoading: loadingSeeds } = useSeed();

  const [selectedSeed, setSelectedSeed] = useState<ISeed | null>(seeds?.[0]);

  const [payload, setPayload] = useState<IMakeOrderPayload>({
    landId: selectedLand ?? lands[0].id,
    seedId: seeds[0]?.id,
    fertilizerId: selectedSeed?.fertilizers?.[0]?.id,
  });

  useEffect(() => {
    if (payload.seedId) {
      const seed = seeds.find((seed) => seed.id === payload.seedId);
      if (seed) {
        setSelectedSeed(seed);
      }
    }
  }, [payload.seedId, seeds]);

  const changeHandler = useCallback(
    ({ target: { name, value } }: ChangeEvent<HTMLSelectElement>) => {
      setPayload((prev) => ({
        ...prev,
        [name]: +value,
      }));
    },
    []
  );

  const landOptions = useMemo(() => {
    return lands?.length
      ? lands.map((land) => ({
          id: land.id,
          name: `${land.upi}: ${land.location ?? ""}`,
          selected: land.id === selectedLand,
        }))
      : [];
  }, [lands, selectedLand]);

  const seedOptions = useMemo(() => {
    return seeds?.length
      ? seeds.map((seed) => ({
          id: seed.id,
          name: seed.name,
        }))
      : [];
  }, [seeds]);

  const fertilizerOptions = useMemo(() => {
    const fertilizers = selectedSeed?.fertilizers || [];
    return fertilizers?.length
      ? fertilizers.map((fertilizer) => ({
          id: fertilizer.id,
          name: fertilizer.name,
        }))
      : [];
  }, [selectedSeed?.fertilizers]);

  const memoizedLandInput = useMemo(
    () => (
      <SelectInput
        onChange={changeHandler}
        options={landOptions}
        label="Land"
        name="landId"
        value={payload.landId}
        disabled
      />
    ),
    [changeHandler, landOptions, payload.landId]
  );

  const memoizedSeedInput = useMemo(
    () => (
      <SelectInput
        onChange={changeHandler}
        options={seedOptions}
        label="Seed"
        name="seedId"
        value={payload.seedId}
      />
    ),
    [changeHandler, seedOptions, payload.seedId]
  );

  const memoizedFertilizerInput = useMemo(
    () => (
      <SelectInput
        onChange={changeHandler}
        options={fertilizerOptions}
        label="Fertilizer"
        name="fertilizerId"
        value={payload.fertilizerId}
      />
    ),
    [changeHandler, fertilizerOptions, payload.fertilizerId]
  );

  const { execute, isLoading } = useApiCall<IOrder, IMakeOrderPayload>();

  const disableSubmit = useMemo(() => {
    return !payload.landId || (!payload.fertilizerId && !payload.seedId);
  }, [payload]);

  const submitHandler = useCallback(
    async (afterSubmitCb?: () => void) => {
      if (disableSubmit) {
        return;
      }
      const { success } = await execute(() => makeOrder(payload));
      if (success) {
        afterSubmitCb?.();
        mutateOrders?.();
      }
    },
    [payload, disableSubmit, execute, mutateOrders]
  );

  return (
    <Modal
      onAccept={submitHandler}
      toggleLabel="Make orders"
      title="Make seed and fertilizer orders"
      loadButton={isLoading}
      disableButton={disableSubmit}
    >
      <form action="">
        {/* Land */}
        {!loadingLands && memoizedLandInput}
        {/* Seeds */}
        {!loadingSeeds && memoizedSeedInput}
        {/* Fertilizer */}
        {selectedSeed?.fertilizers?.length && !loadingSeeds ? (
          memoizedFertilizerInput
        ) : !selectedSeed?.fertilizers?.length && !loadingSeeds ? (
          <>
            {selectedSeed ? (
              <span className="text-yellow-700 pl-2 text-sm font-medium">
                There are no fertilizers for the selected seed
              </span>
            ) : (
              <span className="text-yellow-700 pl-2 text-sm font-medium">
                Select a seed to see fertilizers
              </span>
            )}
          </>
        ) : null}
      </form>
    </Modal>
  );
};
export default React.memo(OrdersForm);
