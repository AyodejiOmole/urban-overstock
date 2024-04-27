'use server';
import CategoryDetails from '@/components/Admin/Categories/CategoryDetails';

import React from 'react';

export default async function AdminCategoryDetails({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section>
      {/* Category Details */}
      <CategoryDetails />
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
