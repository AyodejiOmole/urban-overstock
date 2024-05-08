import ProductForm from '@/components/Admin/Products/ProductForm';
import PageHeading from './components/PageHeading';
import React from 'react';


export default function ProductDetails({ params }: { params: { id: string } }) {
  console.log(params);

  return (
    <section>
      {/* Add Product Form */}
      <PageHeading/>
      <ProductForm activeProduct={null} productId={params.id}/>
    </section>
  );
}
