import { OrderStatus } from "./responses";

export interface ILoginPayload {
  phoneNumber: string;
  password: string;
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

export interface IOrderStatusPayload {
  orderId: number;
  status: OrderStatus;
}
