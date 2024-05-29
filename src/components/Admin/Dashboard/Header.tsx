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

export default function Header(
  {
    setCategoryNavigation,
    defaultFilterOption,
    setDefaultFilterOption
  }: {
    setCategoryNavigation?: any
    defaultFilterOption?: any
    setDefaultFilterOption?: any
  }
) {
  // const [defaultFilterOption, setDefaultFilterOption] = useState(0);

  // const handleFilterOptionChange = (newIndex: number) =>
  //   setDefaultFilterOption(newIndex);

  return (
    <div className='flex lg:flex-row gap-2 flex-col mb-4 justify-between w-full'>
      {/* flex flex-col w-full justify-between lg:flex-col 2xl:items-center gap-8 mb-8 */}
      <CategoryNavigation
        categories={filter_options}
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
      />

      <div className='flex items-center gap-[16px]'>
        {/* <DatePicker handleSelectDate={(date) => console.log(date)} /> */}
        <Link href='/admin/products/new'>
          <button className='rounded-[8px] h-fit w-fit text-[14px] text-[#090917] gap-[4px] flex items-center whitespace-nowrap bg-[#F2C94C] py-[10px] px-[14px] ' >
            <FaPlus />
            Add Product
          </button>
        </Link>
      </div>
    </div>
  );
}
