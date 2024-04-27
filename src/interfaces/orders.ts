export interface OrderProductItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  image: string;
  color: string;
  quantity: number;
  amount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  id: number;
  uuid: string;
  userId: number;
  paymentMethod: string;
  shippingMethod: string;
  shippingId: string;
  receiverName: string;
  receiverPhone: string;
  address: string;
  status: string;
  paymentStatus: string;
  gift: boolean;
  giftMessage: null;
  createdAt: string;
  updatedAt: string;
  orderProduct: OrderProductItem[];
}
