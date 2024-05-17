export interface IReturnRequest {
    id: number
    orderId: number
    orderProductId: number
    userId: number
    quantity: number
    reason: string
    damageImageUrl: string
    description: string
    status: string
    createdAt: string
    updatedAt: string
    order: Order
    orderProduct: OrderProduct
    user: User
  }
  
  export interface Order {
    id: number
    uuid: string
    paymentMethod: string
  }
  
  export interface OrderProduct {
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
    id: number
    firstname: string
    lastname: string
    email: string
  }

  export type IReturnRequests = IReturnRequest[];
  