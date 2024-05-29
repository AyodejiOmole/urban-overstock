import Products from '@/components/Admin/Products/Products';
import { IProducts } from '@/interfaces/products';
import getAllProducts from '@/libs/products';
import React from 'react';
import PageHeading from './components/PageHeading';


export default async function AdminProducts() {
  const apiRes: Promise<IProducts | undefined> = getAllProducts();
  const products = await apiRes;

  console.log(products);

  return (
    <section>
      {/* <PageHeading /> */}

      {/* Products */}
      <Products products={products} />
    </section>
  );
}
