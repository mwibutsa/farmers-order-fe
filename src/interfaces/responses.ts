export interface ILoginResponse {
  data: {
    accessToken: string;
    expiresIn: number;
    isAdmin?: boolean;
  };
  status: number;
}

export interface ILand {
  id: number;
  farmerId: number;
  landSize: number;
  location: string;
  upi: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISeed {
  id: number;
  name: string;
  description: string;
  pricePerKg: number;
  kgPerAcre: number;
  createdAt?: Date;
  updatedAt?: Date;
  fertilizers?: {
    id: number;
    name: string;
    description: string;
    pricePerKg: number;
    kgPerAcre: number;
    createdAt?: Date;
    updatedAt?: Date;
  }[];
}

export interface IFertilizer {
  id: number;
  name: string;
  description: string;
  pricePerKg: number;
  kgPerAcre: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrderDetails {
  id: number;
  farmerId: number;
  landId: number;
}

export interface OrderDetail {
  id: number;
  orderId: number;
  fertilizerId: number | null;
  seedId: number | null;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  seed: ISeed | null;
  fertilizer: IFertilizer | null;
}

export type OrderStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface IOrder {
  id: number;
  farmerId: number;
  landId: number;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  land: ILand;
  orderDetails: OrderDetail[];
}
