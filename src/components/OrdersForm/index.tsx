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
import useSeed, { ISeed } from "@/hooks/useSeeds";
import { useApiCall } from "@/hooks/useApiCall";
import { IMakeOrderPayload, IOrderDetails, makeOrder } from "@/lib/farmers";

type OrderFormProps = {
  selectedLand?: number;
};
const OrdersForm: FC<OrderFormProps> = ({ selectedLand }) => {
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
      console.log("seedId", payload.seedId);
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

  const seedOptions = seeds?.length
    ? seeds.map((seed) => ({
        id: seed.id,
        name: seed.name,
      }))
    : [];

  const fertilizerOptions = useMemo(() => {
    const fertilizers = selectedSeed?.fertilizers || [];
    return fertilizers?.length
      ? fertilizers.map((fertilizer) => ({
          id: fertilizer.id,
          name: fertilizer.name,
        }))
      : [];
  }, [selectedSeed?.fertilizers]);

  const { execute, isLoading } = useApiCall<IOrderDetails, IMakeOrderPayload>();

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
      }
    },
    [payload, disableSubmit, execute]
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
        {!loadingLands && (
          <SelectInput
            onChange={changeHandler}
            options={landOptions}
            label="Land"
            name="landId"
            value={payload.landId}
            disabled
          />
        )}
        {/* Seeds */}
        {!loadingSeeds && (
          <SelectInput
            onChange={changeHandler}
            options={seedOptions}
            label="Seed"
            name="seedId"
            value={payload.seedId}
          />
        )}
        {/* Fertilizer */}
        {selectedSeed?.fertilizers?.length && !loadingSeeds ? (
          <SelectInput
            onChange={changeHandler}
            options={fertilizerOptions}
            label="Fertilizer"
            name="fertilizerId"
            value={payload.fertilizerId}
          />
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
export default OrdersForm;
