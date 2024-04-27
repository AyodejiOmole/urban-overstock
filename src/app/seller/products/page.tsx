import Button from '@/components/Global/Button';
import SellerProductList from '@/components/Seller/Products/Products';
import Card from '@/components/Shared/Card';
import Link from 'next/link';
import React from 'react';

export default function SellerProducts() {
  return (
    <Card className='p-8'>
      <div className='flex flex-col xl:flex-row xl:items-center gap-4 justify-between mb-16'>
        <div className='flex-1'>
          <p className='text-xl text-gray-800 font-medium'>
            Top Selling Product
          </p>
          <p className='font-light text-neutral text-sm'>
            All products available in your store are displayed with their
            details, prices, and other informatin
          </p>
        </div>

        <Link href='/seller/products/new'>
          <Button rounded>Add new product</Button>
        </Link>
      </div>

      <SellerProductList />
    </Card>
  );
}
