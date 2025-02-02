import { ILand } from "@/hooks/userLand";
import backendApi from "@/utils/backendApi";
import { logger } from "@/utils/logger";

export interface ILoginPayload {
  phoneNumber: string;
  password: string;
}
export interface ILoginResponse {
  data: {
    accessToken: string;
    expiresIn: number;
  };
  status: number;
}

export interface ISignUpPayload extends ILoginPayload {
  firstName: string;
  lastName: string;
}

export interface IAddLandPayload {
  upi: string;
  location?: string;
  landSize: number;
}

export interface IMakeOrderPayload {
  landId: number;
  seedId?: number;
  fertilizerId?: number;
}

export interface IOrderDetails {
  id: number;
}

export const loginHandler = async (
  payload: ILoginPayload
): Promise<ILoginResponse> => {
  const { data } = await backendApi.post("/farmers/login", payload);
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

export const makeOrder = async (
  payload: IMakeOrderPayload
): Promise<IOrderDetails> => {
  return backendApi.post("/orders", payload);
};
