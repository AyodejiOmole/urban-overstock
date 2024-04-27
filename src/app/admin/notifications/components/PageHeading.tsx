import Pagination from "../../../../components/Shared/Pagination"
import React from 'react';

export default function PageHeading() {
  return (
    <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8 py-4'>
      <div>
       <p className='text-xl font-bold text-gray-700'>Notificaitons</p>
       <Pagination/>
      </div>
    </div>
  );
}
