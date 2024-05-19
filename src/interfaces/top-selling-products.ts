export interface ITopSellingProducts {
    topProducts: ITopProduct[]
    topUsers: ITopUsers[]
}


// Top products

export interface ITopProduct {
    productId: number
    totalCount: number
    product: Product
}

export interface Product {
    id: number
    name: string
    imageUrls: string[]
    amount: number
    sku: string
    status: string
    brand: Brand
}

export interface Brand {
    id: number
    name: string
    description: any
}
  


  // Top Users

  export interface ITopUsers {
    userId: number
    orderCount: number
    totalAmount: number
    user: User
  }
  
  interface User {
    id: number
    firstname: string
    lastName: string
    email: string
  }