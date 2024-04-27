import Button from '@/components/Global/Button';
import SellerOrdersList from '@/components/Seller/Orders/Orders';
import Card from '@/components/Shared/Card';
import Link from 'next/link';
import React from 'react';

export default function SellerOrders() {
  return (
    <Card className='p-8'>
      <div className='flex flex-col xl:flex-row xl:items-center gap-4 justify-between mb-16'>
        <div className='flex-1'>
          <p className='text-xl text-gray-800 font-semibold'>Customer Orders</p>
          <p className='font-light text-neutral text-sm'>
            All orders placed by different customers are displayed below with
            their order numbers
          </p>
        </div>

        <Link href='/seller/products/new'>
          <Button rounded>Add new product</Button>
        </Link>
      </div>

      <SellerOrdersList />
    </Card>
  );
}
