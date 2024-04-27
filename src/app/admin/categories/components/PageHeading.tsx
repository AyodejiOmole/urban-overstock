import Button from '@/components/Global/Button';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { PiExportBold } from 'react-icons/pi';
import Pagination from '@/components/Shared/Pagination';

export default function PageHeading() {
  return (
    <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
      <div>
       <p className='text-xl font-bold text-gray-700'>Categories</p>
       <Pagination/>
      </div>
      
      <div className='flex items-center gap-4'>
        {/* <Button variant='outlined' color='dark'>
          <PiExportBold />
          Export
        </Button> */}
        <Link href='/admin/categories/new'>
          <Button>
            <FaPlus />
            Add Category
          </Button>
        </Link>
      </div>
    </div>
  );
}
