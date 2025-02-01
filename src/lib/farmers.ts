import backendApi from "@/utils/backendApi";
import { logger } from "@/utils/logger";

export interface ILoginPayload {
  phoneNumber: string;
  password: string;
}

export interface ISignUpPayload extends ILoginPayload {
  firstName: string;
  lastName: string;
}

export const loginHandler = async (payload: ILoginPayload) => {
  try {
    const { data } = await backendApi.post("/farmers/login", payload);
    return data;
  } catch (error) {
    logger(error);
  }
};

export const signUpHandler = async (payload: ISignUpPayload) => {
  try {
    const { data } = await backendApi.post("/farmers/sign-up", payload);
    return data;
  } catch (error) {
    logger(error);
  }
};