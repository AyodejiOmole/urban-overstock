'use client';
import Button from '@/components/Global/Button';
import CategoryNavigation from '@/components/Shared/CategoryNavigation';
import { IOrder } from '@/interfaces/orders';
import React, { useState } from 'react';
import { LuClipboardCheck } from 'react-icons/lu';
import { PiExportBold } from 'react-icons/pi';
import { RiDeleteBin5Line, RiShoppingBasket2Line } from 'react-icons/ri';
import OrdersTable from './OrdersTable';

export default function Orders({ orders }: { orders: IOrder[] | null }) {
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);

  const handleChangeSelectedOrders = (e: any) => {
    console.log(e.value);

    setSelectedOrders(e.value);
  };

  return (
    <>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8 py-4'>
        <p className='text-xl font-medium text-gray-700'>Orders</p>
        <div className='flex items-center gap-4'>
          <Button>
            <RiShoppingBasket2Line />
            Cancelled Orders
          </Button>
          {selectedOrders.length > 0 && (
            <Button variant='outlined'>
              <LuClipboardCheck />
              Update Status
            </Button>
          )}
          {selectedOrders.length > 0 && (
            <Button variant='outlined'>
              <RiDeleteBin5Line />
              Delete
            </Button>
          )}
          <Button variant='outlined'>
            <PiExportBold />
            Export
          </Button>
        </div>
      </div>
      <div className='mb-8'>
        <CategoryNavigation
          categories={[
            'All time',
            '12 months',
            '30 days',
            '7 days',
            '24 hours',
          ]}
          defaultOption={0}
          handleCategoryChange={function (newIndex: number): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
      {/* Orders Table */}

      <OrdersTable
        orders={orders}
        handleChangeSelectedOrders={handleChangeSelectedOrders}
        selectedOrders={selectedOrders}
      />
    </>
  );
}
