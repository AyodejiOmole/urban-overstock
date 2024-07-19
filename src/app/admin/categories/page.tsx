'use server';

import React from 'react';

import Categories from '@/components/Admin/Categories/Categories';
import { ICategories } from '@/interfaces/categories';
import getAllCategories from '@/libs/categories';


export default async function AdminCategories() {
  const apiRes: Promise<ICategories | undefined> = getAllCategories();
  const categories = await apiRes;

  return (
    <section className='py-8'>
      {/* <PageHeading /> */}
      

      {/* Categories */}
      <Categories categories={categories} />
    </section>
  );
}
