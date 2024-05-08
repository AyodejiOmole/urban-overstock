'use client';
import TextInput from '@/components/Global/TextInput';
import React, { useState, useMemo, ChangeEvent } from 'react';
import { CiSearch } from 'react-icons/ci';
import CustomersTable from './CustomersTable';
import { ICustomers } from '@/interfaces/customers';

export default function Customers({
  customers,
}: {
  customers: ICustomers | undefined;
}) {
  const [selectedDate, setSelectedDate] = useState<
    Date | (Date | null)[] | Date[] | null | number | undefined
  >(null);

  const [searchValue, setSearchValue] = useState<string>('');

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
      const formatted = new Date(date as Date);
      setSelectedDate(formatted.getTime());

      console.log(formatted.getTime());
    }
  };

  return (
    <div>
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
        />
      </section>
    </div>
  );
}
