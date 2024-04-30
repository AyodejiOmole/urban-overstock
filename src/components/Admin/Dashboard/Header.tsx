'use client';
import Button from '@/components/Global/Button';
import CategoryNavigation from '@/components/Shared/CategoryNavigation';
import DatePicker from '@/components/Shared/DatePicker';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const filter_options = [
  'all time',
  '12 months',
  '30 days',
  '7 days',
  '24 hours',
];

export default function Header() {
  const [defaultFilterOption, setDefaultFilterOption] = useState(0);

  const handleFilterOptionChange = (newIndex: number) =>
    setDefaultFilterOption(newIndex);

  return (
    <div className='flex lg:flex-row gap-2 flex-col mb-4 justify-between w-full'>
      {/* flex flex-col w-full justify-between lg:flex-col 2xl:items-center gap-8 mb-8 */}
      <CategoryNavigation
        categories={filter_options}
        defaultOption={defaultFilterOption}
        handleCategoryChange={handleFilterOptionChange}
      />

      <div className='flex items-center gap-2'>
        <DatePicker handleSelectDate={(date) => console.log(date)} />

        <Link href='/admin/products/new'>
          <Button color='primary'>
            <FaPlus />
            Add Product
          </Button>
        </Link>
      </div>
    </div>
  );
}
