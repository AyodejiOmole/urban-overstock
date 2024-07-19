'use server';

import React from 'react';

import Pagination from '@/components/Shared/Pagination';
import CategoriesDetailsHeader from '../components/Header';
import CategoryForm from '@/components/Admin/Categories/CategoryForm';

export default async function AdminCategoryDetails({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8 py-8'>
        <div>
          <p className='text-xl font-bold text-gray-700'>Update category</p>
          <Pagination/>
        </div>

        <CategoriesDetailsHeader />
      </div>

      {/* Category Details */}
      <CategoryForm/>
    </section>
  );
};
