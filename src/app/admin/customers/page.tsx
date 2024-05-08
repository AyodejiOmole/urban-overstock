import Customers from '@/components/Admin/Customers/Customers';
import Button from '@/components/Global/Button';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { PiExportBold } from 'react-icons/pi';
import getAllCustomers from '@/libs/customers';
import { ICustomers } from '@/interfaces/customers';

export default async function AdminCustomers() {
  const apiRes: Promise<ICustomers | undefined> = getAllCustomers();
  const customers = await apiRes;

  console.log(customers);

  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
        <p className='text-xl font-bold text-gray-700'>Customers</p>

        <div className='flex items-center gap-4'>
          <Button variant='outlined' color='#F2C94C'>
            <PiExportBold />
            Block
          </Button>
          {/* <Link href='/admin/customers/new'> */}
            <Button variant='outlined' color='#F2C94C'>
              <FaPlus />
              Unblock
            </Button>
          {/* </Link> */}
        </div>
      </div>

      {/* Categories Table */}
      <Customers customers={customers}/>
    </section>
  );
}
