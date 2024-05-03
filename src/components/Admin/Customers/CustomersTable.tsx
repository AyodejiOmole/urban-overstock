'use client';

import paginatorTemplate from '@/components/Global/PaginatorTemplate';
import { formatCurrency, formatDate } from '@/helpers';
import { ICustomer } from '@/interfaces/customers';
import { customers } from '@/services/customers';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { RxPencil2 } from 'react-icons/rx';

export default function CustomersTable({
  selectedDate,
}: {
  selectedDate: Date | (Date | null)[] | Date[] | null | undefined | number;
}) {
  const [selectedCustomers, setSelectedCustomers] = useState<
    ICustomer[] | null
  >(null);
  const [rowClick, setRowClick] = useState<boolean>(true);

  const dateTemplate = (customer: ICustomer) => {
    const { created } = customer;

    const timestampInMilliseconds = created.getTime();

    return formatDate(timestampInMilliseconds);
  };

  function amountTemplate(customer: ICustomer) {
    return formatCurrency(customer.balance);
  }

  function actionTemplate(customer: ICustomer) {
    return (
      <div className='flex items-center gap-3'>
        <Link
          href={`/admin/customers/${customer.id}?edit=false`}
          className='text-xl text-neutral'
        >
          <FaEye />
        </Link>
        <Link
          href={`/admin/customers/${customer.id}?edit=true`}
          className='text-xl text-neutral'
        >
          <RxPencil2 />
        </Link>
        <button>
          <MdOutlineDelete className='text-xl' />
        </button>
      </div>
    );
  }

  function customerTemplate(customer: ICustomer) {
    return (
      <div className='flex items-center gap-4'>
        <div className='h-12 w-12 bg-gray-300 rounded-full'></div>

        <div>
          <p className='text-sm font-medium'>{customer.name}</p>
          <p className='text-sm text-neutral font-light'>{customer.email}</p>
        </div>
      </div>
    );
  }

  const dateChangeHandler = (e: any) => {
    setSelectedCustomers(e.value);
  };

  function statusTemplate(customer: ICustomer) {
    const { status } = customer;

    let styles = '';

    switch (status) {
      case 'active':
        styles = 'bg-green-100 text-green-600';
        break;
      case 'blocked':
        styles = 'bg-red-100 text-red-600';
        break;
      default:
        styles = 'bg-blue-100 text-blue-600';
    }

    return (
      <span
        className={`p-2 px-4 text-xs font-semibold rounded-full capitalize ${styles}`}
      >
        {customer.status}
      </span>
    );
  }

  return (
    <div className='card rounded-md p-4 bg-white border border-gray-200'>
      <div className='px-4 flex flex-col w-full justify-between lg:flex-row lg:items-center gap-8 mb-8'>
        <p className='font-bold text-xl text-gray-700'>Customers Table</p>
      </div>
      <DataTable
        value={customers}
        selectionMode={rowClick ? null : 'multiple'}
        selection={selectedCustomers!}
        onSelectionChange={dateChangeHandler}
        dataKey='id'
        tableStyle={{ minWidth: '50rem' }}
        paginator
        paginatorTemplate={paginatorTemplate}
        rows={20}
        rowsPerPageOptions={[20, 50, 100, 250]}
        className='rounded-md'
        sortOrder={-1}
        sortField='dateAdded'
      >
        <Column
          selectionMode='multiple'
          headerStyle={{ width: '3rem' }}
          className='border-red-500'
        ></Column>
        <Column
          field='customer.item'
          header='Customer Name'
          sortable
          body={customerTemplate}
        ></Column>
        <Column field='phone' header='Phone' sortable></Column>
        <Column field='orders' header='Orders' sortable></Column>
        <Column
          field='balance'
          header='Balance'
          body={amountTemplate}
          sortable
        ></Column>
        <Column
          field='status'
          header='Status'
          sortable
          body={statusTemplate}
        ></Column>
        <Column
          field='created'
          header='Date Joined'
          body={dateTemplate}
          sortable
        ></Column>
        <Column field='action' header='Action' body={actionTemplate}></Column>
      </DataTable>
    </div>
  );
}
