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

export default function Orders({ orders }: { orders: IOrder[] | null }) {
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // const [updateTo, setUpdateTo] = useState<string>("");
  const [cardOpen, setCardOpen] = useState<boolean>(false);

  const httpService = new HTTPService();
  const cookies = new Cookies();

  const router = useRouter();

  const handleChangeSelectedOrders = (e: any) => {
    console.log(e.value);

    setSelectedOrders(e.value);
  };

  async function bulkUpdateOrders(orders: IOrder[], status: string) {
      setCardOpen(prev => !prev);
      const token = cookies.get('urban-token');
  
      toast.loading('Updating orders...');

      const data = orders.map((order) => {
        const { id } = order;
        return { id: id, status: status }
      }); 

      const res = await httpService.patch(
        `${ENDPOINTS.ORDERS}`,
        data,
        `Bearer ${token}`
      );

      toast.dismiss();
      if (res.status === 200) {
        console.log(res);
        toast.success('Orders successfully updated!');
        router.refresh();
      } else toast.error('Cannot update orders at this time!');
  }

  // async function updateOrders(to: string) {

  // }

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
            <div className="relative">
              <Button variant='outlined' onClick={() => setCardOpen(prev => !prev)}>
                <LuClipboardCheck />
                Update Status
              </Button>

              {cardOpen && 
                <div className='absolute card z-20 rounded-xl p-4 bg-white border border-gray-200'>
                  <p onClick={() => bulkUpdateOrders(selectedOrders, "Cancel")} className='text-sm cursor-pointer p-2 text-black hover:bg-[#CFA31C] flex justify-center items-center'>Cancel</p>
                  <p onClick={() => bulkUpdateOrders(selectedOrders, "Processing")} className='text-sm cursor-pointer p-2 text-black hover:bg-[#CFA31C] flex justify-center items-center'>Processing</p>
                  <p onClick={() => bulkUpdateOrders(selectedOrders, "Shipping")} className='text-sm p-2 cursor-pointer text-black hover:bg-[#CFA31C] flex justify-center items-center'>Shipping</p>
                  <p onClick={() => bulkUpdateOrders(selectedOrders, "Delivered")} className='text-sm p-2 cursor-pointer text-black hover:bg-[#CFA31C] flex justify-center items-center'>Delivered</p>
              </div>
              }
              
            </div>
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
