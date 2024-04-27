import CategoryForm from '@/components/Admin/Categories/CategoryForm';
import Button from '@/components/Global/Button';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { FaX } from 'react-icons/fa6';
import CategoriesDetailsHeader from '../components/Header';
import Pagination from '@/components/Shared/Pagination';

export default function AdminNewCategory() {
  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8 py-8'>
        
        <div>
          {/* <p className='text-xl font-bold text-gray-700'>Add Product</p> */}
          <p className='text-xl font-bold text-gray-700'>Add Category</p>
          <Pagination/>
        </div>

        <CategoriesDetailsHeader />
      </div>

      {/* Add Category Form */}
      <CategoryForm />
    </section>
  );
}
