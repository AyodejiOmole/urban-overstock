'use client';
import OrdersTable from '@/components/Admin/Orders/OrdersTable';
import ProductsTable from '@/components/Admin/Products/ProductsTable';
import Button from '@/components/Global/Button';
import { orders } from '@/services/customers';
import Link from 'next/link';
import React from 'react';

export default function AdminHomeSlideshow() {
  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 my-8'>
        <p className='text-xl font-medium text-gray-700'>Return Requests</p>

        {/* <ProductsTable searchValue={''} selectedDate={null} products={[]} /> */}
      </div>
      <OrdersTable
        orders={orders}
        page='return-request'
        handleChangeSelectedOrders={function (e: any): void {
          throw new Error('Function not implemented.');
        }}
        selectedOrders={[]}
      />
    </section>
  );
}
