import DiscountCodesTable from '@/components/Admin/DiscountCodes/DiscountCodesTable';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import Card from '@/components/Shared/Card';
import React from 'react';

export default function AdminDiscountCodeDetails() {
  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 my-8'>
        <p className='text-xl font-medium text-gray-700'>Discount Code</p>
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

                <TextInput id='code' placeholder={'302012'} disabled />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='percentage'
                  className='text-sm text-neutral mb-2 block'
                >
                  Percentage Off
                </label>
                <TextInput placeholder={'10'} disabled />
              </div>
            </form>
          </div>
        </div>
      </Card>
    </section>
  );
}
