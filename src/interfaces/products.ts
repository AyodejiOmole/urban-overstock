// export interface IProduct {
//   id: number;
//   name: string;
//   description: string;
//   categoryId: number;
//   tag: string;
//   amount: number;
//   basePrice: number;
//   discountType: string;
//   discountPercentage: number;
//   taxClass: string;
//   vatAmount: number;
//   sku: string;
//   barcode: string;
//   status: string;
//   deleted: boolean;
//   createdAt: string;
//   updatedAt: string;
//   productImages: {
//     id: number;
//     productId: number;
//     imageUrl: string;
//     color: string;
//   }[];
//   imageUrls: string[];
//   productVarations: []

//   category: {
//     name: string;
//   };
// }

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