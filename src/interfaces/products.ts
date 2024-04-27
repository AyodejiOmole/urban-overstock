export interface IProduct {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  tag: string;
  amount: number;
  basePrice: number;
  discountType: string;
  discountPercentage: number;
  taxClass: string;
  vatAmount: number;
  sku: string;
  barcode: string;
  status: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  productImages: {
    id: number;
    productId: number;
    imageUrl: string;
    color: string;
  }[];
  imageUrls: string[];
  productVarations: []

  category: {
    name: string;
  };
}

export type IProducts = IProduct[];
