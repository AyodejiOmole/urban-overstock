'use client';
import { formatCurrency } from '@/helpers';
import { IProducts } from '@/interfaces/products';
import Image from 'next/image';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import { IProduct } from '@/interfaces/products';
import { IoIosArrowDown } from 'react-icons/io';

export const sales = [
    {
      createdAt: '2024-04-10T14:20:58.000Z',
      location: "Germany",
      id: 49,
      status: +11,
      amount: 9000,
      imageUrls: [
            'http://res.cloudinary.com/dcdddx0yp/image/upload/v1711617524/URBANFILE/a1f0kvu3ikxoykeshnns.png',
      ],
      sales: 430,
      updatedAt: '2024-04-10T15:22:04.000Z',
      uuid: 'INV-20032094',
    },
    {
        createdAt: '2024-04-10T14:20:58.000Z',
        location: "United Arab Emirates",
        id: 49,
        status: -4,
        amount: 98000,
        imageUrls: [
              'http://res.cloudinary.com/dcdddx0yp/image/upload/v1711617524/URBANFILE/a1f0kvu3ikxoykeshnns.png',
        ],
        sales: 78,
        updatedAt: '2024-04-10T15:22:04.000Z',
        uuid: 'INV-20032094',
    },
    {
        createdAt: '2024-04-10T14:20:58.000Z',
        location: "France",
        id: 49,
        status: -10,
        amount: 3670,
        imageUrls: [
              'http://res.cloudinary.com/dcdddx0yp/image/upload/v1711617524/URBANFILE/a1f0kvu3ikxoykeshnns.png',
        ],
        sales: 900,
        updatedAt: '2024-04-10T15:22:04.000Z',
        uuid: 'INV-20032094',
    },
    {
        createdAt: '2024-04-10T14:20:58.000Z',
        location: "Netherlands",
        id: 49,
        status: 14,
        amount: 3000,
        imageUrls: [
              'http://res.cloudinary.com/dcdddx0yp/image/upload/v1711617524/URBANFILE/a1f0kvu3ikxoykeshnns.png',
        ],
        sales: 119,
        updatedAt: '2024-04-10T15:22:04.000Z',
        uuid: 'INV-20032094',
    },
    {
        createdAt: '2024-04-10T14:20:58.000Z',
        location: "Indonesia",
        amount: 7000,
        id: 49,
        status: 10,
        imageUrls: [
              'http://res.cloudinary.com/dcdddx0yp/image/upload/v1711617524/URBANFILE/a1f0kvu3ikxoykeshnns.png',
        ],
        sales: 430,
        updatedAt: '2024-04-10T15:22:04.000Z',
        uuid: 'INV-20032094',
    },
    {
        createdAt: '2024-04-10T14:20:58.000Z',
        location: "Spain",
        id: 49,
        amount: 17070,
        status: 40,
        imageUrls: [
              'http://res.cloudinary.com/dcdddx0yp/image/upload/v1711617524/URBANFILE/a1f0kvu3ikxoykeshnns.png',
        ],
        sales: 430,
        updatedAt: '2024-04-10T15:22:04.000Z',
        uuid: 'INV-20032094',
    },
];  

// {
//     sales,
//   }: {
//     sales: any;
//   }

export default function SalesByLocationTable() {
    function amountTemplate(sales: any) {
        return formatCurrency(sales.amount);
    }

    function checkIfUrl(imageUrl: string) {
        if (!/^https?:\/\//.test(imageUrl) && !/^\/ /.test(imageUrl)) {
        // console.error(`Invalid image URL: ${imageUrl}`);
        // // You can also return a default image or a placeholder here
        // imageUrl = '/default-image.jpg'; // Replace with your default image
        return false;
        }
        return true;
    }

    function productTemplate(sale: any) {
        return (
        <div className='flex items-center gap-4'>
            {sale.imageUrls?.length > 0 && checkIfUrl(sale?.imageUrls[0]) ? (
            <Image
                src={sale.imageUrls[0]}
                alt={sale.description}
                width={20}
                height={20}
                className='h-12 w-12 bg-[#1b1b1b] rounded-md'
            />
            ) : (
            <div className='h-12 w-12 bg-[#1b1b1b] rounded-md'></div>
            )}
            {/* <p className='text-sm flex-1'>{product?.name}</p> */}
            <div className='flex-1'>
            <p className='text-sm font-medium'>{sale?.location}</p>
            <p className='text-neutral text-sm font-light'>
                {`${sale?.sales} sales`}
            </p>
            </div>
        </div>
        );
    }

    function salesStatusTemplate(sales: any) {
        let styles = '';

        switch (Number(sales.status) < 0) {
            case true:
                styles = 'bg-red-100 text-red-600';
                
                // styles = 'bg-green-100 text-green-600';
                break;
            case false:
                styles = 'bg-green-100 text-green-600';
                // styles = 'bg-red-100 text-red-600';
                break;
            default:
                styles = 'bg-blue-100 text-blue-600';
        }

        return (
        <span
            // className={`p-2 text-xs rounded-full ${Number(sales.sales) === 0 && 'bg-blue-100 text-blue-600'} ${Number(sales.sales) < 0 && 'bg-red-100 text-red-600'} ${Number(sales.sales) > 0 && 'bg-green-100 text-green-600'} `}
            className={`p-2 text-xs rounded-full ${styles}  `}
        >
            {`${sales.status}%`}
        </span>
        );
    }


  return (
    <div className='card rounded-xl p-4 bg-white border border-gray-200'>
      <DataTable
        value={sales}
        dataKey='uuid'
        // tableStyle={{ minWidth: '10rem' }}
        // paginator
        rows={20}
        rowsPerPageOptions={[20, 50, 100, 250]}
        className='rounded-md text-sm'
        sortOrder={-1}
        sortField='createdAt'
        sortIcon={<IoIosArrowDown />}
      >
        <Column 
            body={productTemplate} 
            // header={null}
        />
        <Column 
            field='sales' 
            body={amountTemplate}
            // header='Sales' 
            // sortable 
        />
        <Column field='status' body={salesStatusTemplate} />
      </DataTable>
    </div>
  );
}
