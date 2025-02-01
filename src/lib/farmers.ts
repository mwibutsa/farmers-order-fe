import backendApi from "@/utils/backendApi";
import { logger } from "@/utils/logger";

export interface ILoginPayload {
  phoneNumber: string;
  password: string;
}
export const loginHandler = async (payload: ILoginPayload) => {
  try {
    console.log("backendApi.baseUrl");
    const { data } = await backendApi.post("/farmers/login", payload);
    return data;
  } catch (error) {
    logger(error);
  }
};
