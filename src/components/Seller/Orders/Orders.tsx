'use client';
import Button from '@/components/Global/Button';
import CustomTable from '@/components/Shared/CustomTable';
import { formatCurrency, formatDate } from '@/helpers';
import { TableHeadersProps } from '@/interfaces';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';

type VData = {
  id: string | number;
  name: string;
  email: string;
  orderId: string;
  product: string;
  date: Date;
  status: 'paid' | 'refunded';
  revenue: number;
};

export default function SellerOrders() {
  const [loading, setLoading] = useState(false);

  const [tableData, setTableData] = useState<VData[]>([
    {
      id: 1,
      name: 'Adriana',
      email: 'adriana@gmail.com',
      orderId: 'EL-00552',
      product: 'Nike V22',
      date: new Date('12-25-2022'),
      status: 'paid',
      revenue: 35,
    },
    {
      id: 2,
      name: 'Vacinzo',
      email: 'vacinzo@gmail.com',
      orderId: 'EL-00551',
      product: 'Camera',
      date: new Date('12-15-2022'),
      status: 'refunded',
      revenue: 200,
    },
  ]);

  const tableHeaders: TableHeadersProps[] = [
    {
      title: 'Customer',
      field: 'name',
      body: (data: VData) => {
        return (
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 flex-shrink-0 rounded-full bg-gray-100'></div>
            <div className='flex flex-col text-dark-300'>
              <span className='text-sm'>{data.name}</span>
              <span className='text-xs text-dark-200 font-light'>
                {data.email}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Order ID',
      field: 'orderId',
      body: (data: VData) => {
        return <div className='text-neutral'>{data.orderId}</div>;
      },
    },
    {
      title: 'Product',
      field: 'product',
      body: (data: VData) => {
        return <div className='text-neutral'>{data.product}</div>;
      },
    },
    {
      title: 'Date',
      field: 'date',
      body: (data: VData) => {
        return (
          <div className='text-neutral'>{formatDate(data.date.getTime())}</div>
        );
      },
    },
    {
      title: 'Status',
      field: 'status',
      body: (data: VData) => {
        return (
          <div className='text-neutral flex items-center gap-2'>
            <div
              className={clsx(
                data.status === 'paid' && 'bg-orange-400',
                data.status === 'refunded' && 'bg-green-500',
                'h-3 w-3 rounded-full'
              )}
            ></div>
            <p className='capitalize'>{data.status}</p>
          </div>
        );
      },
    },
    {
      title: 'Revenue',
      field: 'revenue',
      body: (data: VData) => {
        return (
          <div className='text-neutral'>{formatCurrency(data.revenue)}</div>
        );
      },
    },
    {
      title: 'Action',
      field: '',
      body: (data: VData) => {
        return (
          <Link href={`/seller/orders/${data.id}`}>
            <Button
              className='rounded-full px-4 '
              size='small'
              variant='outlined'
              color='dark'
            >
              View
            </Button>
          </Link>
        );
      },
    },
  ];

  return (
    <div className='border border-gray-200 p-2 rounded-2xl'>
      <CustomTable data={tableData} headers={tableHeaders} loading={loading} />
    </div>
  );
}
