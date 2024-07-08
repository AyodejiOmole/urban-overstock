'use client';

import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useMemo } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

import { useRouter } from 'next/navigation';
import Button from '@/components/Global/Button';
import { formatCurrency } from '@/helpers';
import { IOrder, OrderProductItem } from '@/interfaces/orders';
import paginatorTemplate from '@/components/Global/PaginatorTemplate';

export default function OrdersTable({
  orders,
  page = 'orders',
  handleChangeSelectedOrders,
  selectedOrders,
  selectedDate,
  searchValue,
  categoryNavigation,
  setCurrentPage,
}: {
  orders: IOrder[] | null;
  searchValue: string;
  selectedDate?: number | null;
  page?: 'orders' | 'return-request' | 'cancelled orders' | 'recent orders';
  handleChangeSelectedOrders?: (e: any) => void;
  selectedOrders: IOrder[];
  categoryNavigation?: any;
  setCurrentPage?: any;
}) {
  const [rowClick, setRowClick] = useState<boolean>(true);

  const dateTemplate = (order: IOrder) => {
    const { createdAt } = order;

    return moment(createdAt).format('MMM Do YYYY');
  };

  function amountTemplate(order: IOrder) {
    const { orderProduct } = order;

    const totalAmount = orderProduct.reduce((a, b: OrderProductItem) => {
      return a + b.amount;
    }, 0);

    return formatCurrency(totalAmount);
  }

  function actionTemplate(order: IOrder) {
    return (
      <div className='flex items-center gap-3'>
        <Link
          href={page === "cancelled orders" ? `/admin/orders/cancelled-orders/${order.id}` : page === "recent orders" ? `/admin/orders/${order.id}` : `/admin/${page}/${order.id}`}
          className='text-xl text-neutral'
        >
          <FaEye />
        </Link>
        {/* <Link
          href={`/admin/${page}/${order.id}`}
          className='text-xl text-neutral'
        >
          <RxPencil2 />
        </Link> */}
      </div>
    );
  }

  function statusTemplate(order: IOrder) {
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

  function productTemplate(order: IOrder) {
    return (
      <div className='flex items-center gap-4'>
        <Image
          src={order.orderProduct[0].image}
          alt='image'
          width={20}
          height={20}
          className='h-12 w-12 bg-[#1b1b1b] rounded-md'
        />

        <div className='div capitalize'>
          <p className='text-sm flex-1 font-medium'>
            {order.orderProduct[0].productName}
          </p>
          {order.orderProduct.length > 1 && (
            <p className='text-xs text-neutral'>
              +{order.orderProduct.length} other products
            </p>
          )}
        </div>
      </div>
    );
  }

  function customerTemplate(order: IOrder) {
    return (
      <div className='flex flex-col gap-2 capitalize'>
        <p className='text-sm flex-1 font-medium'>{order.user.firstName + " " + order.user.lastName}</p>
        {/* <p className='text-xs text-neutral'>{order.receiverPhone}</p> */}
        <p className='text-xs text-neutral'>{order.user.email}</p>
      </div>
    );
  }

  const getOrdersByDate = useMemo(() => {
    if (selectedDate) {
      return orders?.filter(
        (order) => moment(order.createdAt).valueOf() >= selectedDate
      );
    }

    if(categoryNavigation) {
      return orders?.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= categoryNavigation.startDate && itemDate <= categoryNavigation.endDate;
      });
    } else return orders;

  }, [orders, selectedDate, categoryNavigation]);

  const getOrdersByCategoryDate = useMemo(() => {
    if(categoryNavigation) {
      return orders?.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= categoryNavigation.startDate && itemDate <= categoryNavigation.endDate;
      });
    } else return orders;

  }, [orders, categoryNavigation]);

  const matchedOrders = useMemo(() => {
    if (searchValue?.trim().length === 0) return getOrdersByDate;

    return getOrdersByDate?.filter(
      (order) =>
        order.uuid.toLowerCase().includes(searchValue) ||
        order.shippingId.toLowerCase().includes(searchValue) ||
        order.orderProduct[0].productName.toLowerCase().includes(searchValue)
    );
    // if(selectedDate) {
      
    // }

    // if(categoryNavigation) {
    //   return getOrdersByCategoryDate?.filter(
    //     (order) =>
    //       order.uuid.toLowerCase().includes(searchValue) ||
    //       order.shippingId.toLowerCase().includes(searchValue)
    //   );
    // }
    
  }, [searchValue, getOrdersByDate]);

  const checkBoxTemplate = () => {
    return 
  }

  const rowClassTemplate = (data: IOrder) => {
    return {
        'cursor-pointer': data.id
    };
  };

  const router = useRouter();

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
        value={matchedOrders ?? []}
        selectionMode={rowClick ? null : 'multiple'}
        selection={selectedOrders!}
        onSelectionChange={handleChangeSelectedOrders}
        dataKey='uuid'
        tableStyle={{ minWidth: '50rem' }}
        paginator={page !== "recent orders" ? true : false}
        paginatorTemplate={paginatorTemplate}
        paginatorClassName='flex justify-between'
        rows={10}
        rowsPerPageOptions={[20, 50, 100, 250]}
        className='rounded-md text-sm'
        sortOrder={-1}
        sortField='createdAt'
        showSelectAll
        sortIcon={<IoIosArrowDown />}
        selectionAutoFocus={true}
        onRowClick={(e) => router.push(`/admin/orders/${e.data.id}`)}
        rowClassName={rowClassTemplate}
      >
        {page !== "recent orders" && <Column selectionMode='multiple' headerStyle={{ width: '3rem' }} className='group'/>}
        <Column field='uuid' header='Order ID' className='text-[#F2C94C]'/>
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
        <Column header='Payment' field="paymentMethod" />
        <Column field='status' header='Status' sortable body={statusTemplate} />
        <Column field='action' header='Action' body={actionTemplate} />
      </DataTable>
    </div>
  );
}
