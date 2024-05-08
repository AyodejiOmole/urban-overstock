import Pagination from "../../../../components/Shared/Pagination"
import React from 'react';
import Button from "@/components/Global/Button";
import Link from "next/link";

export default function PageHeading() {
  return (
    <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8 py-4'>
      <div>
        {/* <div> */}
          <p className='text-xl font-bold text-gray-700'>Discounts</p>
        {/* </div> */}
       <Pagination/>
      </div>

      <Link href="/admin/discount-codes/new">
        <Button>Add discount code</Button>
      </Link>
    </div>
  );
}
