'use client';
import TextInput from '@/components/Global/TextInput';
import React, { useState, useMemo, ChangeEvent } from 'react';
import { CiSearch } from 'react-icons/ci';
import CustomersTable from './CustomersTable';
import { ICustomer, ICustomers } from '@/interfaces/customers';
import { PiExportBold } from 'react-icons/pi';
import { FaPlus } from 'react-icons/fa';
import Button from '@/components/Global/Button';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import HTTPService from '@/services/http';
import { useRouter } from 'next/navigation';
import ENDPOINTS from '@/config/ENDPOINTS';

export default function Customers({
  customers,
}: {
  customers: ICustomers | undefined;
}) {
  const [selectedDate, setSelectedDate] = useState<
    Date | (Date | null)[] | Date[] | null | number | undefined
  >(null);

  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedCustomers, setSelectedCustomers] = useState<ICustomers>([]);

  const cookies = new Cookies();
  const httpService = new HTTPService();

  const router = useRouter();

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

  const handleChangeSelectedCustomer = (e: any) => {
    console.log(e.value);

    setSelectedCustomers(e.value);
  }

  async function updateCustomer(customer: ICustomers, status: string) {
    if(customer) {
      const token = cookies.get('urban-token');

      toast.loading('Updating customers...');

      // const data = orders.map((order) => {
      //   const { id } = order;
      //   return { status: status }
      // }); 

      // const res = await httpService.patch(
      //   `${ENDPOINTS.CUSTOMERS}/${customer.id}`,
      //   { status: status },
      //   `Bearer ${token}`
      // );

      // toast.dismiss();
      // if (res.status === 200) {
      //   console.log(res);
      //   toast.success('Customers successfully updated!');
      //   router.refresh();
      // } else toast.error('Cannot update customers at this time!');
    } else toast.error("Please select a customer to update!");
}

  const handleSelectDate = (
    date: Date | (Date | null)[] | Date[] | null | undefined
  ) => {
    if (date) {
      const formatted = new Date(date as Date);
      setSelectedDate(formatted.getTime());

      console.log(formatted.getTime());
    }
  };

  return (
    <div>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
        <p className='text-xl font-bold text-gray-700'>Customers</p>

        <div className='flex items-center gap-4'>
          <Button variant='outlined' color='#F2C94C' onClick={() => updateCustomer(selectedCustomers, "ACTIVATED")}>
            {/* <PiExportBold /> */}
            Block
          </Button>
          
          <Button variant='outlined' color='#F2C94C' onClick={() => updateCustomer(selectedCustomers, "SUSPENDED")}>
            {/* <FaPlus /> */}
            Unblock
          </Button>
        </div>
      </div>

      <section>
        <div className='flex items-center justify-between mb-4'>
          <div className='w-full max-w-md'>
            <TextInput
              placeholder='Search customer...'
              leftIcon={<CiSearch />}
              onChange={debouncedSearch}
            />
          </div>
        </div>

        {/* Customers Table */}
        <CustomersTable 
          selectedDate={selectedDate} 
          customers={customers}
          searchValue={searchValue.toLowerCase()}
          selectedCustomers={selectedCustomers}
          handleChangeSelectedCustomers={handleChangeSelectedCustomer}
        />
      </section>
    </div>
  );
}
