'use client';
import Button from '@/components/Global/Button';
import CategoryNavigation from '@/components/Shared/CategoryNavigation';
import { IOrder } from '@/interfaces/orders';
import React, { useState, useMemo, ChangeEvent } from 'react';
import { LuClipboardCheck } from 'react-icons/lu';
import { PiExportBold } from 'react-icons/pi';
import { CiSearch } from 'react-icons/ci';
import { RiDeleteBin5Line, RiShoppingBasket2Line } from 'react-icons/ri';
import OrdersTable from './OrdersTable';
import Pagination from '@/components/Shared/Pagination';
import TextInput from '@/components/Global/TextInput';
import DatePicker from '@/components/Shared/DatePicker';
import HTTPService from '@/services/http';
import ENDPOINTS from '@/config/ENDPOINTS';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { RiDeleteBinLine } from "react-icons/ri";
import { ICancelledOrders } from '@/interfaces/cancelled-orders';
import CancelledOrdersTable from './CancelledOrdersTable';

export default function CancelledOrdersDisplay({ orders }: { orders: ICancelledOrders[] | null }) {
  const [selectedOrders, setSelectedOrders] = useState<ICancelledOrders[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);


  const httpService = new HTTPService();
  const cookies = new Cookies();

  const router = useRouter();

  const handleChangeSelectedOrders = (e: any) => {
    console.log(e.value);

    setSelectedOrders(e.value);
  };

  console.log(orders);

  return (
    <>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-4 py-4'>
        <div>
          <p className='text-xl font-medium text-gray-700'>Cancelled Orders</p>
          <Pagination /> 
        </div>
        
        {/* <div className='flex items-center gap-4'>
          <Button>
            <RiShoppingBasket2Line />
            <RiDeleteBinLine />
            Delete
          </Button>
        </div> */}
      </div>

      {/* Orders Table */}

      <CancelledOrdersTable
        orders={orders}
        handleChangeSelectedOrders={handleChangeSelectedOrders}
        selectedOrders={selectedOrders}
        selectedDate={selectedDate}
        searchValue={searchValue.toLowerCase()}
        page="cancelled orders"
        // categoryNavigation={categoryNavigation}
      />
    </>
  );
}
