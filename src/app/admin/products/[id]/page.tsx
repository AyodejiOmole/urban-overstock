import PageHeading from './components/PageHeading';
import React from 'react';
import { getSingleProduct } from '@/libs/products';
import { ISingleProduct } from '@/interfaces/products';
import ProductDetails from '@/components/Admin/Products/ProductDetails';

export default async function Product({ params }: { params: { id: string } }) {
  console.log(params);
  const apiRes: Promise<ISingleProduct | null> = getSingleProduct(params.id);
  const product = await apiRes;

  return (
    <section>
      <PageHeading />

      <ProductDetails productDetails={product}/>
    </section>
  );
}
