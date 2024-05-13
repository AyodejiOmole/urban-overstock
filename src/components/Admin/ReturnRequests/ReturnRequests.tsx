"use client";
import Pagination from '@/components/Shared/Pagination';
import React from 'react'
import { IReturnRequests } from '@/interfaces/return-requests';
import ReturnRequestTable from './ReturnRequestTable';

const ReturnRequests = ({ orders }: {
    orders: IReturnRequests | null
}) => {
  console.log(orders);
  return (
    <section>
        <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 my-8'>
            <div>
            <p className='text-xl font-medium text-gray-700'>Return Request</p>
            <Pagination />
            </div>
        </div>
        <ReturnRequestTable
            orders={orders}
            // page='return-request'
            handleChangeSelectedOrders={function (e: any): void {
            throw new Error('Function not implemented.');
            }}
            selectedOrders={[]}
            searchValue=""
        />
    </section>
  )
}

export default ReturnRequests;