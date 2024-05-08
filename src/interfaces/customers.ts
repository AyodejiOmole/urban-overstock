// export interface ICustomer {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   orders: number;
//   balance: number;
//   status: 'blocked' | 'active';
//   created: Date;
// }

export interface ICustomer {
  id: number
  uuid: string
  firstName: string
  lastName: string
  email: string
  status: string
  createdAt: string
  orderCount: number
  orderBalance: number
}

export type ICustomers = ICustomer[];

export interface ISingleCustomer {
  id: number
  uuid: string
  firstName: string
  lastName: string
  email: string
  status: string
  createdAt: string
  orderCount: number
  orderBalance: number
  rewardPoint: number
  shippingAddress: ShippingAddress
}

export interface ShippingAddress {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
  streetAddress: string
  country: string
  state: string
  city: string
  zipCode: string
  default: boolean
  userId: number
  createdAt: string
  updatedAt: string
}

