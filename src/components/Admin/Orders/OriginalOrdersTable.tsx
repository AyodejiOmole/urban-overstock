'use client';
import Button from '@/components/Global/Button';
import { formatCurrency } from '@/helpers';
import { IOrder, OrderProductItem } from '@/interfaces/orders';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta, DataTablePageEvent } from 'primereact/datatable';
import React, { useState, useMemo, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import paginatorTemplate from '@/components/Global/PaginatorTemplate';
import { IoIosArrowDown } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import ENDPOINTS from '@/config/ENDPOINTS';
import Cookies from 'universal-cookie';

interface LazyTableState {
    first: number;
    rows: number;
    page?: number | undefined;
    pageCount?: number;
    sortField?: string;
    sortOrder?: number;
    filters?: DataTableFilterMeta;
}

export default function OriginalOrdersTable({
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
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [lazyOrders, setLazyOrders] = useState<IOrder[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lazyState, setlazyState] = useState<LazyTableState>({
    first: 0,
    rows: 10,
    page: 1,
    // pageCount: 100,
    // sortField: null,
    // sortOrder: null,
    // filters: {
    //     name: { value: '', matchMode: 'contains' },
    //     'country.name': { value: '', matchMode: 'contains' },
    //     company: { value: '', matchMode: 'contains' },
    //     'representative.name': { value: '', matchMode: 'contains' }
    // }
    });

    let networkTimeout: string | number | NodeJS.Timeout | null | undefined = null;

    useEffect(() => {
        loadLazyData();
    }, [lazyState]);

    const loadLazyData = () => {
        setLoading(true);

        if (networkTimeout) {
            clearTimeout(networkTimeout);
        }

        //imitate delay of a backend call
        networkTimeout = setTimeout(() => {
            // CustomerService.getCustomers({ lazyEvent: JSON.stringify(lazyState) }).then((data) => {
            //     setTotalRecords(data.totalRecords);
            //     setCustomers(data.customers);
            //     setLoading(false);
            // });
            const fetchData = () => {
                const cookies = new Cookies();
                const token = cookies.get('urban-token');
                console.log(token);
                const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;
        
                fetch(`${baseUrl}/api/v1/${ENDPOINTS.ORDERS}?page=${lazyState.page}&size=${lazyState.rows}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: 'no-store',
                }).then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }).then(data => {
                    if (data.data) {
                        console.log(data.data);
                        setLazyOrders(data.data);
                        setLoading(false);
                    }
                }).catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            };
        
            fetchData();
        }, Math.random() * 1000 + 250);
    };

    // const onPage = (event: any) => {
    //     setlazyState(event);
    // };

  const onPage = (event: DataTablePageEvent) => {
      setlazyState({
        first: 0,
        rows: 10,
        page: lazyState?.page ? lazyState.page++ : 1,
      });
      console.log(event);
      // setlazyState(event);
  };

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
      return lazyOrders?.filter(
        (order) => moment(order.createdAt).valueOf() >= selectedDate
      );
    }

    if(categoryNavigation) {
      return lazyOrders?.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= categoryNavigation.startDate && itemDate <= categoryNavigation.endDate;
      });
    } else return lazyOrders;

  }, [lazyOrders, selectedDate, categoryNavigation]);

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
  }, [searchValue, getOrdersByDate]);

  const checkBoxTemplate = () => {
    return 
  }

  const router = useRouter();

  return (
    <div className='card rounded-xl p-4 bg-white border border-gray-200'>
      <DataTable
        value={matchedOrders ?? []}
        lazy
        first={lazyState.first} 
        onPage={onPage}
        loading={loading}
        totalRecords={totalRecords}
        selectionMode={rowClick ? null : 'multiple'}
        selection={selectedOrders!}
        onSelectionChange={handleChangeSelectedOrders}
        dataKey='uuid'
        tableStyle={{ minWidth: '50rem' }}
        paginator
        // paginatorTemplate={paginatorTemplate}
        // paginatorClassName='flex justify-between'
        rows={10}
        // rowsPerPageOptions={[20, 50, 100, 250]}
        className='rounded-md text-sm'
        sortOrder={-1}
        sortField='createdAt'
        showSelectAll
        sortIcon={<IoIosArrowDown />}
        selectionAutoFocus={true}
        onRowClick={(e) => router.push(`/admin/orders/${e.data.id}`)}
      >
        <Column selectionMode='multiple' headerStyle={{ width: '3rem' }} className='group'/>
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
