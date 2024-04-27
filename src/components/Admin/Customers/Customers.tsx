'use client';
import TextInput from '@/components/Global/TextInput';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import CustomersTable from './CustomersTable';

export default function Customers() {
  const [selectedDate, setSelectedDate] = useState<
    Date | (Date | null)[] | Date[] | null | number | undefined
  >(null);

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
              onChange={() => {}}
            />
          </div>
        </div>

        {/* Customers Table */}
        <CustomersTable selectedDate={selectedDate} />
      </section>
    </div>
  );
}
