export interface ITopSellingProducts {
  topProducts: ITopProduct[]
  topOrdersLocation: ITopOrdersLocation[]
}

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
  description?: string
}

export interface ITopOrdersLocation {
  orderShippingState?: string
  orderCount: number
  totalAmount: number
}
