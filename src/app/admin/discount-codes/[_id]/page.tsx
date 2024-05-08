"use client";
import DiscountCodesTable from '@/components/Admin/DiscountCodes/DiscountCodesTable';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import Card from '@/components/Shared/Card';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Pagination from '@/components/Shared/Pagination';

export default function AdminDiscountCodeDetails() {
  const params = useSearchParams();
  const [discountCode, setDiscountCode] = useState<any>(null);
  const [discountPer, setDiscountPer] = useState<any>(null);

  useEffect(() => {
    // if (params.has('code') && params.has('percentage')) {
      
    // }

    setDiscountCode(params.get("code"));
    setDiscountPer(params.get("percentage"));
    // setDiscountCode(params.get("code"));
    // setDiscountPer(params.get("percentage"));
  }, [params]);

  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 my-8'>
        <div>
          <p className='text-xl font-medium text-gray-700'>Discount Code</p>
          <Pagination/>
        </div>
      </div>
      <Card>
        <div className='p-4'>
          <div className='flex items-center justify-end gap-4 mb-8'>
            <Button variant='outlined' size='small'>
              Deactivate
            </Button>
            <Button size='small'>Activate</Button>
          </div>

          <div>
            <p className='mb-8 text-gray-700 text-lg font-medium'>Inventory</p>

            <form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='mb-6'>
                <label
                  htmlFor='code'
                  className='text-sm text-neutral mb-2 block'
                >
                  Code
                </label>

                <TextInput id='code' placeholder={'Discount code...'} value={discountCode} disabled />
                {/* <input type="text" value={discountCode || ''} disabled /> */}

              </div>
              <div className='mb-6'>
                <label
                  htmlFor='percentage'
                  className='text-sm text-neutral mb-2 block'
                >
                  Percentage Off
                </label>
                <TextInput placeholder={'Percentage off...'} disabled value={discountPer}/>
                {/* <input type="text" value={discountPer || ''} disabled /> */}
              </div>
            </form>
          </div>
        </div>
      </Card>
    </section>
  );
}
