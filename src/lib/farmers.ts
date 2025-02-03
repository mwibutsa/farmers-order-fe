import {
  IAddLandPayload,
  ILoginPayload,
  IMakeOrderPayload,
  ISignUpPayload,
} from "@/interfaces/payload";
import { ILand, ILoginResponse, IOrder } from "@/interfaces/responses";
import backendApi from "@/utils/backendApi";
import { logger } from "@/utils/logger";


export const loginHandler = async (
  payload: ILoginPayload,
  isAdmin?: boolean
): Promise<ILoginResponse> => {
  const { data } = await backendApi.post(
    isAdmin ? "/admin/login" : "/farmers/login",
    isAdmin
      ? { email: payload.phoneNumber, password: payload.password }
      : payload
  );
  return data;
};

export const signUpHandler = async (payload: ISignUpPayload) => {
  try {
    const { data } = await backendApi.post("/farmers/sign-up", payload);
    return data;
  } catch (error) {
    logger(error);
  }
};

export const addLandInfoHandler = async (
  payload: IAddLandPayload
): Promise<ILand> => {
  return backendApi.post("/land/add-land-info", payload);
};

export const makeOrder = async (payload: IMakeOrderPayload): Promise<IOrder> => {
  return backendApi.post("/orders", payload);
};
