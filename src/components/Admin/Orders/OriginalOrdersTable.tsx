'use client';

import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { DataTable, DataTableFilterMeta, DataTablePageEvent } from 'primereact/datatable';
import React, { useState, useMemo, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import { classNames } from 'primereact/utils';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { 
  PaginatorCurrentPageReportOptions, 
  PaginatorRowsPerPageDropdownOptions, 
  PaginatorNextPageLinkOptions, 
  PaginatorPageLinksOptions, 
  PaginatorPrevPageLinkOptions } 
from 'primereact/paginator';

import { formatCurrency } from '@/helpers';
import { IOrder, OrderProductItem } from '@/interfaces/orders';
import ENDPOINTS from '@/config/ENDPOINTS';

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
  page = 'orders',
  handleChangeSelectedOrders,
  selectedOrders,
  selectedDate,
  searchValue,
  categoryNavigation,
  setCurrentPage,
}: {
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
  const [totalPages, setTotalPages] = useState<number>(0);
  const [lazyOrders, setLazyOrders] = useState<IOrder[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lazyState, setlazyState] = useState<LazyTableState>({
    first: 0,
    rows: 10,
    page: 0,
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
                      console.log(data.meta);
                      setTotalRecords(data.meta.total_items);
                      setTotalPages(data.meta.total_pages);
                      console.log(data.data);
                      setLazyOrders(data.data);
                      setLoading(false);
                  }
              }).catch(error => {
                  toast.error(error.message);
                  console.error('There was a problem with the fetch operation:', error);
              });
          };
      
          fetchData();
      }, Math.random() * 1000 + 250);
  };

  const onPage = (event: DataTablePageEvent) => {
      setlazyState({
        first: lazyState.first++,
        rows: 10,
        page: lazyState?.page ? lazyState.page++ : 1,
      });
      console.log(event);
      // setlazyState(event);
  };

  const paginatorTemplateOrder = {
    layout: 'CurrentPageReport RowsPerPageDropdown PrevPageLink PageLinks NextPageLink ',
    RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
        return (
            <div className="invisible">
            {/* <Tooltip target=".slider>.p-slider-handle" content={`${options.value} / page`} position="top" event="focus" /> */}

                {/* <span className="mr-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Items per page:{' '}
                </span> */}
                {/* <Slider className="slider" value={options.value} onChange={options.onChange} min={10} max={120} step={30} style={{ width: '10rem' }} /> */}
            </div>
        );
    },
    PageLinks: (options: PaginatorPageLinksOptions) => {
        // if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
        //     const className = classNames(options.className, { 'p-disabled': true });

        //     return (
        //         <span className={classNames('border px-3 py-1 mx-1 rounded-sm cursor-pointer border-[#F2C94C]')} style={{ userSelect: 'none' }}>
        //             ...
        //         </span>
        //     );
        // }

        return (
            <span 
              className={classNames(`${options.page === lazyState.page ? "bg-[#F2C94C]" : "bg-white"} px-3 cursor-pointer py-1 mx-1 rounded-sm border border-[#F2C94C] `)} 
              onClick={() => {
                setlazyState({
                  first: 0,
                  rows: 10,
                  page: options.page === 0 ? 0 : options.page,
                });
              }}>
                {options.page + 1}
            </span>
        );
    },
    CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
        return (
            <div style={{ color: 'var(--text-color)', userSelect: 'none', width: 'auto', textAlign: 'left'}} className='text-sm text-neutral items-center my-auto mr-auto'>
                {`Showing ${lazyState.first + ((lazyState.page ?? 0) * 10)} - ${(lazyState.first + ((lazyState.page ?? 0) * 10)) + 10} from ${options.totalRecords}`}
            </div>
        );
    },
    PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
        return (
            <span 
                className={classNames('rounded-sm bg-[#F2C94C] p-2 mx-1 cursor-pointer')} 
                onClick={() => {
                    setlazyState({
                      first: 0,
                      rows: 10,
                      page: lazyState?.page ? lazyState.page === 0 ? 0 : lazyState.page - 1 : 0,
                    });
                }} 
            >
                <MdOutlineKeyboardArrowLeft color="black"/>
            </span>
        );
    },
    NextPageLink: (options: PaginatorNextPageLinkOptions) => {
        return (
            <span 
              className={classNames('rounded-sm p-2 mx-1 bg-[#F2C94C] cursor-pointer')} 
              onClick={() => {
                setlazyState({
                  first: 0,
                  rows: 10,
                  page: ((lazyState.page ?? 0) + 1) > totalPages ? lazyState.page : ((lazyState.page ?? 0) + 1),
                });
              }} 
            >
                <MdKeyboardArrowRight color="black"/>
            </span>
        );
    },
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
      <span className={`p-2 px-4 text-xs font-medium rounded-full whitespace-nowrap ${styles}`}>
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

  const matchedOrders = useMemo(() => {
    if (searchValue?.trim().length === 0) return getOrdersByDate;

    return getOrdersByDate?.filter(
      (order) =>
        order.uuid.toLowerCase().includes(searchValue) ||
        order.shippingId.toLowerCase().includes(searchValue) ||
        order.orderProduct[0].productName.toLowerCase().includes(searchValue)
    );
  }, [searchValue, getOrdersByDate]);

  const checkBoxTemplate = (data: IOrder, options: ColumnBodyOptions) => {
    options.props = "border-red-500";
    return options.column.render();
    // options.column.props.style = "border-red-500"
  }

  const router = useRouter();

  const rowClassTemplate = (data: IOrder) => {
    return {
        'cursor-pointer': data.id
    };
  };


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
        tableStyle={{ minWidth: '60rem' }}
        paginator
        paginatorTemplate={paginatorTemplateOrder}
        paginatorClassName='flex justify-between'
        rows={10}
        // rowsPerPageOptions={[20, 50, 100, 250]}
        className='rounded-md text-sm'
        sortOrder={-1}
        sortField='createdAt'
        showSelectAll
        sortIcon={<IoIosArrowDown />}
        selectionAutoFocus={true}
        onRowClick={(e) => router.push(`/admin/orders/${e.data.id}`)}
        rowClassName={rowClassTemplate}
      >
        <Column selectionMode='multiple' body={checkBoxTemplate} headerStyle={{ width: '3rem' }} className='group'/>
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
