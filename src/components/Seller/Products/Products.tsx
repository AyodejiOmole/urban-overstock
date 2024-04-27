'use client';
import Button from '@/components/Global/Button';
import CustomTable from '@/components/Shared/CustomTable';
import { formatCurrency, formatDate } from '@/helpers';
import { TableHeadersProps } from '@/interfaces';
import React, { useState } from 'react';

type VData = {
  id: string | number;
  name: string;
  description?: string;
  idNo: string;
  orders: number;
  price: number;
  cost: number;
  stock: number;
};

export default function SellerProducts() {
  const [loading, setLoading] = useState(false);

  const [tableData, setTableData] = useState<VData[]>([
    {
      id: 1,
      name: 'Nike V22',
      description: 'Running shoes',
      idNo: 'EL-00552',
      orders: 1500,
      price: 130,
      cost: 9500,
      stock: 100,
    },
    {
      id: 2,
      name: 'Instax Camera',
      description: 'Portable camera',
      idNo: 'EL-00551',
      orders: 1100,
      price: 45,
      cost: 4500,
      stock: 500,
    },
    {
      id: 3,
      name: 'Chair',
      description: 'Relaxing Chair',
      idNo: 'EL-00550',
      orders: 1800,
      price: 80,
      cost: 5800,
      stock: 100,
    },
  ]);

  const tableHeaders: TableHeadersProps[] = [
    {
      title: 'Product',
      field: 'name',
      body: (data: VData) => {
        return (
          <div className='flex items-center gap-2'>
            <div className='w-12 h-12 flex-shrink-0 rounded-full bg-gray-100'></div>
            <div className='flex flex-col text-dark-300'>
              <span className='text-sm'>{data.name}</span>
              <span className='text-xs text-dark-200 font-light'>
                {data.description}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: 'ID No',
      field: 'idNo',
      body: (data: VData) => {
        return <div>{data.idNo}</div>;
      },
    },
    {
      title: 'Orders',
      field: 'orders',
      body: (data: VData) => {
        return <div>{data.orders.toLocaleString()}</div>;
      },
    },
    {
      title: 'Price',
      field: 'price',
      body: (data: VData) => {
        return <div>{formatCurrency(data.price)}</div>;
      },
    },
    {
      title: 'Cost',
      field: 'cost',
      body: (data: VData) => {
        return <div>{formatCurrency(data.cost)}</div>;
      },
    },
    {
      title: 'Stock',
      field: 'stock',
      body: (data: VData) => {
        return <div>{data.stock.toLocaleString()}</div>;
      },
    },
  ];

  const leftArea = (
    <Button size='small' variant='text' color='primary-light'>
      See all
    </Button>
  );

  return (
    <div className='border border-gray-200 p-2 rounded-2xl'>
      <CustomTable
        data={tableData}
        headers={tableHeaders}
        loading={loading}
        // desktopOnly
        // selectable
      />
    </div>
  );
}
