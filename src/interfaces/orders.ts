// export interface OrderProductItem {
//   id: number;
//   orderId: number;
//   productId: number;
//   productName: string;
//   image: string;
//   color: string;
//   quantity: number;
//   amount: number;
//   total: number;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface IOrder {
//   id: number;
//   uuid: string;
//   userId: number;
//   paymentMethod: string;
//   shippingMethod: string;
//   shippingId: string;
//   receiverName: string;
//   receiverPhone: string;
//   address: string;
//   status: string;
//   paymentStatus: string;
//   gift: boolean;
//   giftMessage: null;
//   createdAt: string;
//   updatedAt: string;
//   orderProduct: OrderProductItem[];
// }

export interface IOrder {
  id: number
  uuid: string
  paymentIntent: any
  userId: number
  paymentMethod: string
  shippingMethod: string
  shippingId: string
  receiverName: string
  receiverPhone: string
  address: string
  status: string
  paymentStatus: string
  gift: boolean
  giftMessage: any
  tax: number
  totalAmount: number
  deliveryDate: string
  estimateDeliveryDate: any
  trackingService: any
  trackingNumber: any
  trackingLink: any
  createdAt: string
  updatedAt: string
  orderProduct: OrderProductItem[]
  user: User
}

export interface OrderProductItem {
  id: number
  orderId: number
  productId: number
  productName: string
  image: string
  color: string
  quantity: number
  amount: number
  total: number
  createdAt: string
  updatedAt: string
}

export interface User {
  role: string
  id: number
  uuid: string
  firstName: string
  lastName: string
  email: string
  password: string
  profileImage: any
  verified: boolean
  userType: string
  loginType: string
  status: string
  twoFactorAuth: boolean
  notificationOrders: boolean
  notificationPromotion: boolean
  notificationToken: any
  createdAt: string
  updatedAt: string
}

