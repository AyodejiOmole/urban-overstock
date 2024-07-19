'use client';
import Button from '@/components/Global/Button';
import CategoryNavigation from '@/components/Shared/CategoryNavigation';
import { IOrder } from '@/interfaces/orders';
import React, { useState, useMemo, ChangeEvent, useEffect } from 'react';
import { LuClipboardCheck } from 'react-icons/lu';
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
import Link from 'next/link';
import OriginalOrdersTable from './OriginalOrdersTable';

export default function Orders(
  { 
    orders, 
    cancelledOrdersCount
  }: { 
    orders: IOrder[] | null 
    cancelledOrdersCount: number
  }
) {
  const [selectedOrders, setSelectedOrders] = useState<IOrder[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // const [retrievedOrders, setRetrievedOrders] = useState<IOrder[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [categoryNavigation, setCategoryNavigation] = useState<any>();
  const [defaultFilterOption, setDefaultFilterOption] = useState(0);

  // const handleFilterOptionChange = (newIndex: number) =>
  //   setDefaultFilterOption(newIndex);

  // const [updateTo, setUpdateTo] = useState<string>("");
  const [cardOpen, setCardOpen] = useState<boolean>(false);

  const httpService = new HTTPService();
  const cookies = new Cookies();

  const router = useRouter();

  const handleChangeSelectedOrders = (e: any) => {
    console.log(e.value);

    setSelectedOrders(e.value);
  };

  function hasDeliveryTimeExceeded(deliveryDate: string): boolean {
    const fortyEightHoursAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000); // 48 hours ago
    return new Date(deliveryDate) < fortyEightHoursAgo;
  }

  async function bulkUpdateOrders(orders: IOrder[], status: string) {
      setCardOpen(prev => !prev);

      // Checks if there's an order that's been delivered and whose deivery date exceeds 48 hours
      let deliveredOrder: boolean = false;

      if(status.toLowerCase() === "cancelled") {
        const checkingOrders = orders.map((order) => {
          if(order.status.toLowerCase() === "delivered" && hasDeliveryTimeExceeded(order.deliveryDate)) {
            toast.error("You cannot cancel an order that has been delivered for more than 48 hours.");
            deliveredOrder = true;
            return;
          }
        }); 
      }

      if(status.toLowerCase() === "processing") {
        const checkingOrders = orders.map((order) => {
          if(order.status.toLowerCase() === "cancelled") {
            toast.error("You cannot set a cancelled order to processing.");
            deliveredOrder = true;
            return;
          }
        }); 
      }
      
      if(!deliveredOrder) {
        const token = cookies.get('urban-token');
        console.log(token);
  
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
  }

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

//   useEffect(() => {
//     const fetchData = () => {
//         const cookies = new Cookies();
//         const token = cookies.get('urban-token');
//         console.log(token);
//         const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

//         fetch(`${baseUrl}/api/v1/${ENDPOINTS.ORDERS}?page=${currentPage}&size=10`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//             cache: 'no-store',
//         }).then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         }).then(data => {
//             if (data.data) {
//                 console.log(data.data);
//                 setRetrievedOrders(data.data);
//             }
//         }).catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
//     };

//     fetchData();
// }, [currentPage]);

  return (
    <>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-4 py-4'>
        <div>
          <p className='text-xl font-medium text-gray-700'>Orders</p>
          <Pagination /> 
        </div>
        
        <div className='flex items-center gap-4'>
          <Link href="/admin/orders/cancelled-orders">
            <Button >
              <RiShoppingBasket2Line />
              Cancelled Orders
              {/* <div className='bg-red-500 p-1 text-xs rounded-full flex justify-center items-center'></div> */}
              
              <div className='py-1 px-[6px] bg-red-500 rounded-full text-[10px] text-white'>
                {cancelledOrdersCount}
              </div>
            </Button>
          </Link>
          {selectedOrders.length > 0 && (
            <div className="relative">
              <Button variant='outlined' onClick={() => setCardOpen(prev => !prev)}>
                <LuClipboardCheck />
                Update Status
              </Button>

              {cardOpen && 
                <div className='absolute card z-20 rounded-xl p-4 bg-white border border-gray-200'>
                  <p onClick={() => bulkUpdateOrders(selectedOrders, "Cancelled")} className='text-sm cursor-pointer p-2 text-black hover:bg-[#CFA31C] flex justify-center items-center'>Cancelled</p>
                  <p onClick={() => bulkUpdateOrders(selectedOrders, "Processing")} className='text-sm cursor-pointer p-2 text-black hover:bg-[#CFA31C] flex justify-center items-center'>Processing</p>
                  {/* <p onClick={() => bulkUpdateOrders(selectedOrders, "Shipping")} className='text-sm p-2 cursor-pointer text-black hover:bg-[#CFA31C] flex justify-center items-center'>Shipped</p>
                  <p onClick={() => bulkUpdateOrders(selectedOrders, "Delivered")} className='text-sm p-2 cursor-pointer text-black hover:bg-[#CFA31C] flex justify-center items-center'>Delivered</p> */}
                  {/* <p onClick={() => bulkUpdateOrders(selectedOrders, "Placed")} className='text-sm p-2 cursor-pointer text-black hover:bg-[#CFA31C] flex justify-center items-center'>Placed</p>
                  <p onClick={() => bulkUpdateOrders(selectedOrders, "Packed")} className='text-sm p-2 cursor-pointer text-black hover:bg-[#CFA31C] flex justify-center items-center'>Packed</p>
                  <p onClick={() => bulkUpdateOrders(selectedOrders, "Confirmed")} className='text-sm p-2 cursor-pointer text-black hover:bg-[#CFA31C] flex justify-center items-center'>Confirmed</p> */}
                  {/* [Placed, Processing, Packed, Shipping, Delivered, Cancelled, Confirmed] */}
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

      <div className='justify-between flex items-center gap-3 mb-2 w-full'>
        <div className=''>
          <TextInput
            placeholder='Search orders...'
            leftIcon={<CiSearch />}
            onChange={debouncedSearch}
            value={searchValue}
            ifSearchBar="bg-white"
          />
        </div>

        <div >
          <CategoryNavigation
            categories={[
              'All time',
              '12 months',
              '30 days',
              '7 days',
              '24 hours',
            ]}
            // className="w-full"
            defaultOption={defaultFilterOption}
            handleCategoryChange={function (newIndex: number, option): void {
                
                const now = new Date();
                let dateRange: { startDate: Date | null, endDate: Date | null } = {
                  startDate: null,
                  endDate: null,
                };
              
                switch (option) {
                  case 'All time':
                    dateRange.startDate = new Date(0); // earliest possible date
                    dateRange.endDate = now;
                    break;
                  case '12 months':
                    dateRange.startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                    dateRange.endDate = now;
                    break;
                  case '30 days':
                    dateRange.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
                    dateRange.endDate = now;
                    break;
                  case '7 days':
                    dateRange.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
                    dateRange.endDate = now;
                    break;
                  case '24 hours':
                    dateRange.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - 24);
                    dateRange.endDate = now;
                    break;
                  default:
                    return; // return null for unknown filter options
                }
                setCategoryNavigation(dateRange);
                setDefaultFilterOption(newIndex);
              // throw new Error('Function not implemented.');
            }}
            // className='w-full'
          />
        </div>
      </div>

      {/* Orders Table */}
      <OriginalOrdersTable
        handleChangeSelectedOrders={handleChangeSelectedOrders}
        selectedOrders={selectedOrders}
        selectedDate={selectedDate}
        searchValue={searchValue.toLowerCase()}
        categoryNavigation={categoryNavigation}
      />
    </>
  );
}
