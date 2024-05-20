'use client';
import TextInput from '@/components/Global/TextInput';
import DatePicker from '@/components/Shared/DatePicker';
import { IProducts } from '@/interfaces/products';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import ProductsTable from './ProductsTable';

export default function Products({
  products,
}: {
  products: IProducts | undefined;
}) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

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
            placeholder='Search product...'
            leftIcon={<CiSearch />}
            onChange={debouncedSearch}
            value={searchValue}
          />
        </div>

        {/* <DatePicker handleSelectDate={handleSelectDate} /> */}
      </div>

      {/* Products Table */}
      <ProductsTable
        selectedDate={selectedDate}
        products={products}
        searchValue={searchValue.toLowerCase()}
      />
    </section>
  );
}
