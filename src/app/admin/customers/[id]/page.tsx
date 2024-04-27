import CustomerDetails from '@/components/Admin/Customers/CustomerDetails/CustomerDetails';
import Button from '@/components/Global/Button';

import React from 'react';
import { FaPlus } from 'react-icons/fa';

import { PiExportBold } from 'react-icons/pi';

export default function AdminCustomerDetails() {
  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
        <p className='text-xl font-bold text-gray-700'>Customer Details</p>

        <div className='flex items-center gap-4'>
          <Button variant='outlined' color='dark'>
            <PiExportBold />
            Export
          </Button>
          <Button>
            <FaPlus />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer Details Section */}
      <CustomerDetails />
    </section>
  );
}
