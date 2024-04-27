import DiscountCodesTable from '@/components/Admin/DiscountCodes/DiscountCodesTable';
import React from 'react';
import PageHeading from './components/PageHeading';

export default function AdminDiscountCodes() {
  return (
    <section>
      {/* <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 my-8'>
        <p className='text-xl font-medium text-gray-700'>Discount Codes</p>
      </div> */}
      <PageHeading/>
      <DiscountCodesTable />
    </section>
  );
}
