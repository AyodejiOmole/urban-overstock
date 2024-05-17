import ProductForm from '@/components/Admin/Products/ProductForm';
import PageHeading from './components/PageHeading';
import React from 'react';
import { getSingleProduct } from '@/libs/products';
import { ISingleProduct } from '@/interfaces/products';
import getAllBrands from '@/libs/brands';
import getAllColors from '@/libs/colors';
import getAllSizes from '@/libs/sizes';
import { IBrands } from '@/interfaces/brands';
import { IColors } from '@/interfaces/colors';
import { ISizes } from '@/interfaces/sizes';
import getAllCategories from '@/libs/categories';
import { ICategories } from '@/interfaces/categories';
import getAllDiscountCodes from '@/libs/discount-codes';
import { IDiscountCodes } from '@/interfaces/discount-codes';
// import UpdateProductForm from '@/components/Admin/Products/UpdateProductForm';

export default async function ProductDetails({ params }: { params: { id: string } }) {
  console.log(params);
  const apiRes: Promise<ISingleProduct | undefined> = getSingleProduct(params.id);
  const product = await apiRes;

  console.log(product);

  const apiResCategories: Promise<ICategories | undefined> = getAllCategories();
  const categories = await apiResCategories;

  const apiResBrands: Promise<IBrands | undefined> = getAllBrands();
  const brands  = await apiResBrands;

  const apiResColors: Promise<IColors | undefined>  = getAllColors();
  const colors = await apiResColors;

  const apiResSizes: Promise<ISizes | undefined> = getAllSizes();
  const sizes = await apiResSizes;

  const apiResDiscounts: Promise<IDiscountCodes | undefined> = getAllDiscountCodes();
  const discounts = await apiResDiscounts;
  

  return (
    <section>
      <PageHeading/>
      <ProductForm activeProduct={product} discounts={discounts} categories={categories} brands={brands} colors={colors} sizes={sizes}/>
    </section>
  );
}
