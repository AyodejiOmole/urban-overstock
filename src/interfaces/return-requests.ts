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
    address: string
    receiverPhone: string
    receiverName: string
  }
  // {
  //   "address": "This is one new address, Houston United States";
  //   "createdAt": "2024-05-10T01:21:58.000Z";
  //   "deliveryDate": null,
  //   "estimateDeliveryDate": null,
  //   "gift": false,
  //   "giftMessage": null,
  //   "id": 11,
  //   "orderShippingState": null,
  //   "paymentIntent": "pi_3PEi9qImhu7Go1hu34xnk0EI",
  //   "paymentMethod": "Online",
  //   "paymentStatus": "Paid",
  //   "rateId": null,
  //   "receiverName": "Edim Daniel",
  //   "receiverPhone": "08173023282",
  //   "shipmentId": null,
  //   "shippingAddressId": null,
  //   "shippingId": "SHIP53573427",
  //   "shippingMethod": "Flat Shipping",
  //   "status": "Processing",
  //   "tax": 0,
  //   "totalAmount": 190,
  //   "trackingLink": null,
  //   "trackingNumber": null,
  //   "trackingService": null,
  //   "updatedAt": "2024-05-24T10:56:10.000Z",
  //   "userId": 20,
  //   "uuid": "INV-53573427",
  // } 
  
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
  