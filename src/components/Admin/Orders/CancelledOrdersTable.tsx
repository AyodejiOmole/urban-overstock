'use client';
import Button from '@/components/Global/Button';
import { formatCurrency } from '@/helpers';
import { IOrder, OrderProductItem } from '@/interfaces/orders';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useMemo } from 'react';
import { FaEye } from 'react-icons/fa';
import { RxPencil2 } from 'react-icons/rx';
import paginatorTemplate from '@/components/Global/PaginatorTemplate';
import { IoIosArrowDown } from 'react-icons/io';
import { IReturnRequests } from '@/interfaces/return-requests';
import { ICancelledOrders } from '@/interfaces/cancelled-orders';

export default function CancelledOrdersTable({
  orders,
  page = 'orders',
  handleChangeSelectedOrders,
  selectedOrders,
  selectedDate,
  searchValue,
  categoryNavigation,
}: {
  orders: null | ICancelledOrders[];
  searchValue: string;
  selectedDate?: number | null;
  page?: 'orders' | 'return-request' | 'cancelled orders' | 'recent orders';
  handleChangeSelectedOrders?: (e: any) => void;
  selectedOrders: ICancelledOrders[];
  categoryNavigation?: any;
}) {
  const [rowClick, setRowClick] = useState<boolean>(true);

  const dateTemplate = (order: ICancelledOrders) => {
    const { createdAt } = order;

    return moment(createdAt).format('MMM Do YYYY, h:mm a');
  };

  function amountTemplate(order: ICancelledOrders) {
    // const { order } = order;

    // const totalAmount = orderProduct.reduce((a, b: OrderProductItem) => {
    //   return a + b.amount;
    // }, 0);

    return formatCurrency(order.order.totalAmount);
  }

  function actionTemplate(order: ICancelledOrders) {
    return (
      <div className='flex items-center gap-3'>
        <Link
          href={`/admin/orders/cancelled-orders/${order.id}`}
          className='text-xl text-neutral'
        >
          <FaEye />
        </Link>
      </div>
    );
  }

  function statusTemplate(order: ICancelledOrders) {
    const { status } = order;

    let styles = '';

    switch (status.toLowerCase()) {
      case 'processing':
        styles = 'bg-orange-100 text-orange-600';
        break;
      case 'shipped':
        styles = 'bg-[#E8F8FD] text-[#13B2E4]';
        break;
      case 'delivered':
        styles = 'bg-green-100 text-green-600';
        break;
      case 'cancelled' || 'refunded':
        styles = 'bg-red-100 text-red-600';
        break;
      case 'packed':
        styles = 'bg-[#E8F8FD] text-[#13B2E4]';
        break;
      default:
        styles = 'bg-purple-50 text-purple-600';
        break;
    }

    return (
      <span className={`p-2 px-4 text-xs font-medium rounded-full ${styles}`}>
        {order.status}
      </span>
    );
  }

  function productTemplate(order: ICancelledOrders) {
    return (
      <div className='flex items-center gap-4'>
        <Image
          src={order.order.orderProduct[0].image}
          alt='image'
          width={20}
          height={20}
          className='h-12 w-12 bg-[#1b1b1b] rounded-md'
        />

        <div className='div capitalize'>
          <p className='text-sm flex-1 font-medium'>
            {order.order.orderProduct[0].productName}
          </p>
          {order.order.orderProduct.length > 1 && (
            <p className='text-xs text-neutral'>
              +{order.order.orderProduct.length} other products
            </p>
          )}
        </div>
      </div>
    );
  }

  function customerTemplate(order: ICancelledOrders) {
    return (
      <div className='flex flex-col gap-2 capitalize'>
        <p className='text-sm flex-1 font-medium'>{order.order.receiverName}</p>
        <p className='text-xs text-neutral'>{order.order.receiverPhone}</p>
      </div>
    );
  }

//   const getOrdersByDate = useMemo(() => {
//     if (selectedDate) {
//       return orders?.filter(
//         (order) => moment(order.createdAt).valueOf() >= selectedDate
//       );
//     }

//     if(categoryNavigation) {
//       return orders?.filter((item) => {
//         const itemDate = new Date(item.createdAt);
//         return itemDate >= categoryNavigation.startDate && itemDate <= categoryNavigation.endDate;
//       });
//     } else return orders;

//   }, [orders, selectedDate, categoryNavigation]);

//   const getOrdersByCategoryDate = useMemo(() => {
//     if(categoryNavigation) {
//       return orders?.filter((item) => {
//         const itemDate = new Date(item.createdAt);
//         return itemDate >= categoryNavigation.startDate && itemDate <= categoryNavigation.endDate;
//       });
//     } else return orders;

//   }, [orders, categoryNavigation]);

//   const matchedOrders = useMemo(() => {
//     if (searchValue?.trim().length === 0) return getOrdersByDate;

//     return getOrdersByDate?.filter(
//       (order) =>
//         order.uuid.toLowerCase().includes(searchValue) ||
//         order.shippingId.toLowerCase().includes(searchValue) ||
//         order.orderProduct[0].productName.toLowerCase().includes(searchValue)
//     );
//     // if(selectedDate) {
      
//     // }

//     // if(categoryNavigation) {
//     //   return getOrdersByCategoryDate?.filter(
//     //     (order) =>
//     //       order.uuid.toLowerCase().includes(searchValue) ||
//     //       order.shippingId.toLowerCase().includes(searchValue)
//     //   );
//     // }
    
//   }, [searchValue, getOrdersByDate]);

  const checkBoxTemplate = () => {
    return 
  }

  return (
    <div className='card rounded-xl p-4 bg-white border border-gray-200'>
      {page.toLowerCase() === "recent orders" && (
        <div className='flex justify-between items-center mb-3'>
          <p className="text-black text-md font-semibold">Recent orders</p>
        
          <Link
            href="/admin/orders"
          >
            <Button className='text-black'>
              See more
            </Button>
          </Link>
        </div>
      )}
      <DataTable
        value={orders ?? []}
        selectionMode={rowClick ? null : 'multiple'}
        selection={selectedOrders!}
        onSelectionChange={handleChangeSelectedOrders}
        dataKey='orderId'
        tableStyle={{ minWidth: '50rem' }}
        paginator
        paginatorTemplate={paginatorTemplate}
        paginatorClassName='flex justify-between'
        rows={20}
        rowsPerPageOptions={[20, 50, 100, 250]}
        className='rounded-md text-sm'
        sortOrder={-1}
        sortField='createdAt'
        showSelectAll
        sortIcon={<IoIosArrowDown />}
        selectionAutoFocus={true}
      >
        <Column selectionMode='multiple' headerStyle={{ width: '3rem' }} className='descendant:border descendant:border-gray-800'/>
        <Column field='orderId' header='Order ID' className='text-[#F2C94C]'/>
        <Column body={productTemplate} header='Product' />
        <Column field='date' header='Date' body={dateTemplate} sortable />
        <Column
          field='customer.email'
          body={customerTemplate}
          header='Customer'
        />
        <Column
          field='totalAmount'
          header='Total'
          body={amountTemplate}
          sortable
        />
        {/* body="Mastercard" */}
        <Column header='Payment' field="order.paymentMethod" />
        <Column field='status' header='Status' sortable body={statusTemplate} />
        <Column field='action' header='Action' body={actionTemplate} />
      </DataTable>
    </div>
  );
}
