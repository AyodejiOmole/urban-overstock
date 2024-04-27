'use client';
import TextInput from '@/components/Global/TextInput';
import { ICategories } from '@/interfaces/categories';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import CategoriesTable from './CategoriesTable';

export default function Categories({
  categories,
}: {
  categories: ICategories | undefined;
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectDate = (
    date: Date | (Date | null)[] | Date[] | null | undefined
  ) => {
    if (date) {
      const formatted = new Date(date as Date);

      console.log(formatted.getTime());
    }
  };

  return (
    <section>
      <div className='flex items-center justify-between mb-4'>
        <div className='w-full max-w-md'>
          <TextInput
            placeholder='Search categories...'
            leftIcon={<CiSearch />}
            onChange={() => {}}
          />
        </div>

        <div>{/* <DatePicker handleSelectDate={handleSelectDate} /> */}</div>
      </div>

      {/* Categories Table */}
      <CategoriesTable selectedDate={selectedDate} categories={categories} />
    </section>
  );
}
