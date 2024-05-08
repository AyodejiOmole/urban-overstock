export interface IProduct {
  id: number;
  name: string
  description: string
  categoryId: number
  brandId: number
  tag: string
  imageUrls: string[]
  amount: number
  discountType: string
  discountPercentage: number
  taxClass: string
  vatAmount: number
  quantity: number
  sku: string
  barcode: string
  status: string
  productVarations: ProductVaration[]
  createdAt: string;
  updatedAt: string;
}

export interface ProductVaration {
  id: number
  colorId: number
  imageUrl: string
  sizeOptions: SizeOption[]
}

export interface SizeOption {
  sizeId: number
  quantity: number
}

export type IProducts = IProduct[];

export interface ISingleProduct {
  id: number
  name: string
  description: string
  categoryId: number
  brandId: number
  tag: string
  imageUrls: string
  amount: number
  discountType: string
  discountPercentage: number
  taxClass: string
  vatAmount: number
  sku: string
  barcode: string
  quantity: number
  status: string
  deleted: boolean
  createdAt: string
  updatedAt: string
  productVarations: ProductVarationSingle[]
  brand: Brand
  category: Category
}

export interface ProductVarationSingle {
  id: number
  productId: number
  colorId: number
  imageUrl: string
  sizeOptions: SizeOptionSingle[]
  color: Color
}

export interface SizeOptionSingle {
  id: number
  quantity: number
  size?: Size
}

export interface Size {
  id: number
  name: string
  code: string
}

export interface Color {
  id: number
  name: string
  code: string
}

export interface Brand {
  id: number
  name: string
  description: string
}

export interface Category {
  id: number
  name: string
}
