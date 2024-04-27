import React from 'react';
import { SlOptionsVertical } from 'react-icons/sl';

export default function Statistics() {
  return (
    <section className='my-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
      <div className='sm:col-span-2 xl:col-span-3 rounded-2xl bg-white p-4 min-h-80'></div>
      <div className='sm:col-span-2 xl:col-span-1 rounded-2xl bg-white p-4 min-h-80'>
        <div className='flex justify-between items-center'>
          <p className='text-gray-800'>Transactions</p>
          <SlOptionsVertical />
        </div>
      </div>
    </section>
  );
}
