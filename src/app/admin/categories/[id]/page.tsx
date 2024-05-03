'use server';
import CategoryDetails from '@/components/Admin/Categories/CategoryDetails';
import CategoryForm from '@/components/Admin/Categories/CategoryForm';

import React from 'react';
import Pagination from '@/components/Shared/Pagination';
import CategoriesDetailsHeader from '../components/Header';

export default async function AdminCategoryDetails({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8 py-8'>
        
        <div>
          {/* <p className='text-xl font-bold text-gray-700'>Add Product</p> */}
          <p className='text-xl font-bold text-gray-700'>Update category</p>
          <Pagination/>
        </div>

        <CategoriesDetailsHeader />
      </div>

      {/* Category Details */}
      {/* <CategoryDetails /> */}
      <CategoryForm/>
    </section>
  );
}

// export async function generateStaticParams() {
//   const res: Promise<ICategories> = await getAllCategories();
//   const categories = await res;

//   console.log(categories);

//   return categories.map((category: ICategory) => ({
//     id: category.id,
//   }));
// }
