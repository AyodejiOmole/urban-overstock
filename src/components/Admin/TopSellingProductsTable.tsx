'use client';

import { formatCurrency } from '@/helpers';
import Image from 'next/image';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IProduct } from '@/interfaces/products';
import { ITopProduct } from '@/interfaces/top-selling-products';
import { useMemo } from 'react';

export default function TopSellingProductsTable({
  products,
  // categoryNavigation,
}: {
  products: ITopProduct[] | null | undefined;
  // categoryNavigation: any;
}) {

  function amountTemplate(product: ITopProduct) {
    return formatCurrency(+product.product.amount);
  }

  function productStatusTemplate(product: ITopProduct) {
    let styles = '';
  
    switch (product?.product.status.toLocaleLowerCase()) {
      case 'draft':
        styles = 'bg-gray-100 text-gray-600';
        break;
      case 'low-stock':
        styles = 'bg-orange-100 text-orange-600';
        break;
      case 'published':
        styles = 'bg-green-100 text-green-600';
        break;
      case 'out-of-stock':
        styles = 'bg-red-100 text-red-600';
        break;
      default:
        styles = 'bg-blue-100 text-blue-600';
    }
  
    return (
      <span
        className={`p-2 px-4 text-xs font-semibold rounded-full capitalize ${styles}`}
      >
        {product?.product.status}
      </span>
    );
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

  function productTemplate(product: ITopProduct) {
    return (
      <div className='flex items-center gap-4'>
        {product.product.imageUrls?.length > 0 && checkIfUrl(product?.product.imageUrls[0]) ? (
          <Image
            src={product.product.imageUrls[0]}
            alt={product.product.name}
            width={20}
            height={20}
            className='h-12 w-12 bg-[#1b1b1b] rounded-md'
          />
        ) : (
          <div className='h-12 w-12 bg-[#1b1b1b] rounded-md'></div>
        )}
        {/* <p className='text-sm flex-1'>{product?.name}</p> */}
        <div className='flex-1'>
          <p className='text-sm font-medium'>{product?.product.name}</p>
          <p className='text-neutral text-sm font-light'>
            {`SKU: ${product?.product.sku}`}
          </p>
        </div>
      </div>
    );
  }

  // const getOrdersByDate = useMemo(() => {
  //   if(categoryNavigation) {
  //     return products?.filter((item) => {
  //       const itemDate = new Date(item.);
  //       return itemDate >= categoryNavigation.startDate && itemDate <= categoryNavigation.endDate;
  //     });
  //   } else return orders;

  // }, [categoryNavigation]);

  return (
    <div className='card rounded-xl p-4 bg-white border border-gray-200'>
      <DataTable
        value={products ?? []}
        dataKey='productId'
        tableStyle={{ minWidth: '30rem' }}
        rows={10}
        rowsPerPageOptions={[20, 50, 100, 250]}
        className='rounded-md text-sm overflow-hidden'
        sortOrder={-1}
        sortField='createdAt'
        sortIcon={<IoIosArrowDown />}
      >
        <Column body={productTemplate} header='Product' />
        <Column field='totalCount' header='Sales' sortable />
        <Column
          field='product.amount'
          body={amountTemplate}
          header='Amount'
        />
        <Column
          field='product.amount'
          header='Price'
          body={amountTemplate}
          sortable
        />
        {/* <Column body='Mastercard' header='Payment' /> */}
        <Column field='product.status' header='Status' sortable body={productStatusTemplate} />
      </DataTable>
    </div>
  );
}
