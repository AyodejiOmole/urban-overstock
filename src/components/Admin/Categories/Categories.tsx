'use client';
import TextInput from '@/components/Global/TextInput';
import { ICategories } from '@/interfaces/categories';
import React, { useState, useMemo, ChangeEvent } from 'react';
import { CiSearch } from 'react-icons/ci';
import CategoriesTable from './CategoriesTable';
import DatePicker from '@/components/Shared/DatePicker';

export default function Categories({
  categories,
}: {
  categories: ICategories | undefined;
}) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
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
      const formatted = new Date(date as Date).getTime();

      setSelectedDate(formatted);
    } else setSelectedDate(null);
  };

  return (
    <section>
      <div className='flex items-center justify-between mb-4'>
        <div className='w-full max-w-md'>
          <TextInput
            placeholder='Search categories...'
            leftIcon={<CiSearch />}
            // onChange={() => {}}
            onChange={debouncedSearch}
            ifSearchBar="bg-white"
          />
        </div>

        {/* <div><DatePicker handleSelectDate={handleSelectDate} /></div> */}
      </div>

      {/* Categories Table */}
      <CategoriesTable selectedDate={selectedDate} categories={categories} searchValue={searchValue.toLocaleLowerCase()}/>
    </section>
  );
}
