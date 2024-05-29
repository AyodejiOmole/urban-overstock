// export interface ICancelledOrders {
//     id: number
//     orderId: number
//     userId: number
//     status: string
//     createdAt: string
//     updatedAt: string
//     user: User
//     order: Order
//   }
  
//   export interface User {
//     role: string
//     id: number
//     uuid: string
//     firstName: string
//     lastName: string
//     email: string
//     password: string
//     profileImage: any
//     verified: boolean
//     userType: string
//     loginType: string
//     status: string
//     twoFactorAuth: boolean
//     notificationOrders: boolean
//     notificationPromotion: boolean
//     notificationToken: string
//     createdAt: string
//     updatedAt: string
//   }
  
//   export interface Order {
//     id: number
//     uuid: string
//     paymentIntent: string
//     userId: number
//     paymentMethod: string
//     shippingMethod: string
//     shippingId: string
//     receiverName: string
//     receiverPhone: string
//     address: string
//     status: string
//     paymentStatus: string
//     gift: boolean
//     giftMessage: any
//     tax: number
//     totalAmount: number
//     deliveryDate: any
//     estimateDeliveryDate: any
//     trackingService: any
//     trackingNumber: any
//     trackingLink: any
//     createdAt: string
//     updatedAt: string
//   }

  export interface ICancelledOrders {
    id: number
    orderId: number
    userId: number
    status: string
    createdAt: string
    updatedAt: string
    user: User
    order: Order
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
  
  export interface Order {
    id: number
    uuid: string
    paymentIntent: string
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
    deliveryDate: any
    estimateDeliveryDate: any
    trackingService: any
    trackingNumber: any
    trackingLink: any
    createdAt: string
    updatedAt: string
    orderProduct: OrderProduct[]
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
  
  