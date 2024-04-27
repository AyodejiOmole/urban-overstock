'use server';
import Categories from '@/components/Admin/Categories/Categories';
import { ICategories } from '@/interfaces/categories';
import getAllCategories from '@/libs/categories';
import React from 'react';

import PageHeading from './components/PageHeading';

export default async function AdminCategories() {
  const apiRes: Promise<ICategories | undefined> = getAllCategories();
  const categories = await apiRes;

  return (
    <section className='py-8'>
      <PageHeading />

      {/* Categories Table */}
      <Categories categories={categories} />
    </section>
  );
}
