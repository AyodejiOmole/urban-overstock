'use client';

import { formatCurrency } from '@/helpers';
import { IOrder, OrderProductItem } from '@/interfaces/orders';
import Image from 'next/image';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useMemo } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

export default function OrdersTable({
  orderList,
}: {
  orderList: OrderProductItem[];
}) {
  function quantityTemplate(item: OrderProductItem) {
    return `${item.quantity} pcs`;
  }
  function amountTemplate(item: OrderProductItem) {
    return formatCurrency(item.amount);
  }
  function totalTemplate(item: OrderProductItem) {
    return formatCurrency(item.total);
  }

  function productTemplate(item: OrderProductItem) {
    return (
      <div className='flex items-center gap-4'>
        <Image
          src={item.image}
          alt={item.productName}
          width={20}
          height={20}
          className='h-12 w-12 bg-[#1b1b1b] rounded-md'
        />
        <div className='div'>
          <p className='text-sm flex-1 font-medium'>{item.productName}</p>
          <p className='text-xs text-neutral'>{item.color}</p>
        </div>
      </div>
    );
  }

  const subTotal = useMemo(() => {
    if (orderList) {
      const total = orderList.reduce((a, b: OrderProductItem) => {
        return a + b.total;
      }, 0);

      return total;
    } else return 0;
  }, [orderList]);

  return (
    <div className='w-full'>
      <DataTable
        value={orderList}
        dataKey='id'
        tableStyle={{ minWidth: '50rem' }}
        className='rounded-xl text-sm'
        sortOrder={-1}
        sortField='date'
        sortIcon={<IoIosArrowDown />}
      >
        <Column
          body={productTemplate}
          header='Product'
          style={{ width: '20%' }}
          className='border-b border-b-gray-100'
        />
        <Column
          body={quantityTemplate}
          header='QTY'
          style={{ width: '20%' }}
          className='border-b border-b-gray-100'
        />
        <Column
          header='Price'
          body={amountTemplate}
          style={{ width: '20%' }}
          className='border-b border-b-gray-100'
        />
        <Column
          header='Total'
          body={totalTemplate}
          style={{ width: '20%' }}
          className='border-b border-b-gray-100'
        />
      </DataTable>

      <div className='text-gray-700 text-sm'>
        {/*  Subtotal */}
        <div className='grid grid-cols-2 sm:grid-cols-4 border-b border-b-gray-100 py-6'>
          <div className=''></div>
          <div className=''></div>
          <p className='px-4'>Subtotal</p>
          <p className='px-4'>{formatCurrency(subTotal)}</p>
        </div>
        {/* VAT */}
        <div className='grid grid-cols-2 sm:grid-cols-4 border-b border-b-gray-100 py-6'>
          <div className=''></div>
          <div className=''></div>
          <p className='px-4'>Vat(0%)</p>
          <p className='px-4'>$0.00</p>
        </div>
        {/* Shipping Rate */}
        <div className='grid grid-cols-2 sm:grid-cols-4 border-b border-b-gray-100 py-6'>
          <div className=''></div>
          <div className=''></div>
          <p className='px-4'>Shipping Rate</p>
          <p className='px-4'>$5.00</p>
        </div>
        {/* Shipping Rate */}
        <div className='grid grid-cols-2 sm:grid-cols-4 pt-6 text-gray-800'>
          <div className=''></div>
          <div className=''></div>
          <p className='px-4'>Grand Total</p>
          <p className='px-4'>{formatCurrency(subTotal + 5)}</p>
        </div>
      </div>
    </div>
  );
}
