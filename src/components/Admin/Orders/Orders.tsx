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

export default function Orders({ orders }: { orders: IOrder[] | null }) {
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const handleChangeSelectedOrders = (e: any) => {
    console.log(e.value);

    setSelectedOrders(e.value);
  };

  const debouncedSearch = useMemo(() => {
    let timer: NodeJS.Timeout;

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setSearchValue(e.target.value);
      }, 500);
    };

    return handleSearchChange;
  }, []);

  const handleSelectDate = (
    date: Date | (Date | null)[] | Date[] | null | undefined
  ) => {
    if (date) {
      const formatted = new Date(date as Date).getTime();

      setSelectedDate(formatted);
    } else setSelectedDate(null);
  };

  return (
    <>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-4 py-4'>
        <div>
          <p className='text-xl font-medium text-gray-700'>Orders</p>
          <Pagination /> 
        </div>
        
        <div className='flex items-center gap-4'>
          <Button>
            <RiShoppingBasket2Line />
            Cancelled Orders
          </Button>
          {selectedOrders.length > 0 && (
            <Button variant='outlined'>
              <LuClipboardCheck />
              Update Status
            </Button>
          )}
          {/* {selectedOrders.length > 0 && (
            <Button variant='outlined'>
              <RiDeleteBin5Line />
              Delete
            </Button>
          )}
          <Button variant='outlined'>
            <PiExportBold />
            Export
          </Button> */}
        </div>
      </div>

      <div className='justify-between flex flex-wrap items-center gap-4 mb-2 w-full'>
        <div className='w-full max-w-md'>
          <TextInput
            placeholder='Search orders...'
            leftIcon={<CiSearch />}
            onChange={debouncedSearch}
            value={searchValue}
          />
        </div>

        <DatePicker handleSelectDate={handleSelectDate} />

        <div className='w-full'>
          <CategoryNavigation
            categories={[
              'All time',
              '12 months',
              '30 days',
              '7 days',
              '24 hours',
            ]}
            // className="w-full"
            defaultOption={0}
            handleCategoryChange={function (newIndex: number): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </div>
      {/* Orders Table */}

      <OrdersTable
        orders={orders}
        handleChangeSelectedOrders={handleChangeSelectedOrders}
        selectedOrders={selectedOrders}
        selectedDate={selectedDate}
        searchValue={searchValue.toLowerCase()}
      />
    </>
  );
}
