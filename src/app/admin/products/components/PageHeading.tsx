import Button from '@/components/Global/Button';
import Pagination from '@/components/Shared/Pagination';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { PiExportBold } from 'react-icons/pi';
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function PageHeading() {
  return (
    <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8 py-4'>
      {/* <p className='text-xl font-bold text-gray-700'>Products</p> */}
      <div>
       <p className='text-xl font-bold text-gray-700'>Products</p>
       <Pagination/>
      </div>

      <div className='flex items-center gap-4'>
        <Button variant='outlined' color='primary-2'>
          {/* <PiExportBold /> */}
          Publish
        </Button>
        <Button variant='outlined' color='primary-2'>
          {/* <PiExportBold /> */}
          Unpublish
        </Button>
        <Button>
          <RiDeleteBin5Fill />
          Delete
        </Button>
        <Link href='/admin/products/new'>
          <Button>
            <FaPlus />
            Add Product
          </Button>
        </Link>
      </div>
    </div>
  );
}
