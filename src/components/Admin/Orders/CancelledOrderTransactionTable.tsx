'use client';
import Button from '@/components/Global/Button';
import { formatCurrency, formatDate } from '@/helpers';
import { IOrder, OrderProductItem } from '@/interfaces/orders';
import { orders } from '@/services/customers';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import { CiCalendarDate } from 'react-icons/ci';
import { FaEye } from 'react-icons/fa';
import paginatorTemplate from '@/components/Global/PaginatorTemplate';
import { IoIosArrowDown } from 'react-icons/io';

export default function CancelledOrderTransactionTable({
  history
}: {
  history: OrderProductItem[] | undefined,
}) {
  const [selectedOrders, setSelectedOrders] = useState<IOrder[] | null>(null);
  const [rowClick, setRowClick] = useState<boolean>(true);

  const dateTemplate = (order: OrderProductItem) => {
    const { createdAt } = order;

    return moment(createdAt).format('MMM Do YYYY');
  };

  function amountTemplate(order: OrderProductItem) {
    return formatCurrency(order.total);
  }

//   function statusTemplate(order: IOrder) {
//     const { status } = order;

//     let styles = '';

//     switch (status.toLowerCase()) {
//       case 'processing':
//         styles = 'bg-orange-100 text-orange-600';
//         break;
//       case 'shipped':
//         styles = 'bg-blue-100 text-blue-600';
//         break;
//       case 'delivered':
//         styles = 'bg-green-100 text-green-600';
//         break;
//       case 'cancelled' || 'refunded':
//         styles = 'bg-red-100 text-red-600';
//         break;
//       default:
//         styles = 'bg-blue-100 text-blue-600';
//     }

//     return (
//       <span className={`p-2 px-4 text-xs font-semibold rounded-full ${styles}`}>
//         {order.status}
//       </span>
//     );
//   }

  const orderProductsTemplate = (order: OrderProductItem) => {
    return (
      <div className='flex items-center gap-4'>
        <Image
          src={order?.image}
          alt='image'
          width={100}
          height={100}
          className='h-12 w-12 bg-[#1b1b1b] rounded-md'
        />
        <div>
          <p className='font-medium'>{order.productName}</p>
          {/* {order.orderProduct.length > 1 && (
            <p className='text-sm flex-1'>
              +{order.orderProduct.length} other products
            </p>
          )} */}
        </div>
      </div>
    );
  };

  const dateChangeHandler = (e: any) => {
    setSelectedOrders(e.value);
  };

  return (
    <div className='text-sm'>
      <div className='px-4 flex flex-col w-full justify-between lg:flex-row lg:items-center gap-8 mb-8'>
        <p className='text-xl text-gray-700 font-medium'>Transaction History</p>
        {/* <Button variant='outlined' color='dark' size='small'>
          <CiCalendarDate />
          Select Date
        </Button> */}
      </div>
      <DataTable
        value={history}
        // selectionMode={rowClick ? null : 'multiple'}
        // selection={selectedOrders!}
        // onSelectionChange={dateChangeHandler}
        dataKey='id'
        tableStyle={{ minWidth: '50rem' }}
        paginator
        rows={5}
        paginatorTemplate={paginatorTemplate}
        paginatorClassName='flex justify-between'
        rowsPerPageOptions={[20, 50, 100, 250]}
        className='rounded-xl text-sm'
        sortOrder={-1}
        sortField='date'
        sortIcon={<IoIosArrowDown />}
      >
        <Column field='id' header='Order ID' sortable></Column>
        <Column
          field='order.item'
          header='Products'
          body={orderProductsTemplate}
        ></Column>
        <Column
          field='total'
          header='Total'
          body={amountTemplate}
          sortable
        ></Column>
        <Column
          field='updatedAt'
          header='Date'
          body={dateTemplate}
          sortable
        ></Column>
      </DataTable>
    </div>
  );
}
