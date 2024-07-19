'use client';
import React, { useState } from 'react';

import Pagination from '@/components/Shared/Pagination';
import { ICancelledOrders } from '@/interfaces/cancelled-orders';
import CancelledOrdersTable from './CancelledOrdersTable';

export default function CancelledOrdersDisplay({ orders }: { orders: ICancelledOrders[] | null }) {
  const [selectedOrders, setSelectedOrders] = useState<ICancelledOrders[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const handleChangeSelectedOrders = (e: any) => {
    console.log(e.value);

    setSelectedOrders(e.value);
  };

  console.log(orders);

  return (
    <>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-4 py-4'>
        <div>
          <p className='text-xl font-medium text-gray-700'>Cancelled Orders</p>
          <Pagination /> 
        </div>
      </div>

      {/* Cancelled Orders Table */}
      <CancelledOrdersTable
        orders={orders}
        handleChangeSelectedOrders={handleChangeSelectedOrders}
        selectedOrders={selectedOrders}
        selectedDate={selectedDate}
        searchValue={searchValue.toLowerCase()}
        page="cancelled orders"
      />
    </>
  );
}
