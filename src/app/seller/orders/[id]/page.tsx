import Button from '@/components/Global/Button';
import Card from '@/components/Shared/Card';
import CustomSteps from '@/components/Shared/Steps';
import Link from 'next/link';
import { MenuItem } from 'primereact/menuitem';
import React from 'react';

export default function SellerOrderDetails() {
  const steps: MenuItem[] = [
    {
      label: 'Order Received',
    },
    {
      label: 'ID #EL-4524',
    },
    {
      label: 'Order Transmitted',
    },
    {
      label: 'Delivered',
    },
  ];

  return (
    <Card className='p-8'>
      <div className='flex flex-col xl:flex-row xl:items-center gap-4 justify-between mb-8'>
        <div className='flex-1'>
          <p className='text-xl text-gray-800 font-semibold'>Order details</p>
        </div>

        {/* <Link href='/seller/products/new'> */}
        <Button rounded>Invoice</Button>
        {/* </Link> */}
      </div>

      <div className='w-64 mb-32'>
        <div className='grid grid-cols-2 mb-4'>
          <p className='text-neutral'>Order NO: </p>
          <p className='text-gray-800'>EL-5414587</p>
        </div>
        <div className='grid grid-cols-2 mb-4'>
          <p className='text-neutral'>From: </p>
          <p className='text-gray-800'>25 Dec, 2022</p>
        </div>
        <div className='grid grid-cols-2 mb-4'>
          <p className='text-neutral'>Code: </p>
          <p className='text-gray-800'>EL005</p>
        </div>
      </div>

      {/* Order Details */}
      <div className='p-6 border border-gray-200 mx-auto max-w-5xl rounded-2xl'>
        <div className='-mt-16'>
          <CustomSteps steps={steps} readOnly />
        </div>

        <div className='grid xl:grid-cols-2 mt-12 gap-8'>
          {/* 1 */}
          <div className=''>
            <p className='text-xl text-gray-800 font-medium mb-4'>
              Product detail
            </p>
            <div className='p-4 border border-gray-100 rounded-xl'>
              <div className='flex gap-8'>
                <div className='h-16 w-16 bg-gray-200 rounded-full'></div>
                <div>
                  <p className='font-medium text-lg text-gray-800'>Shirt</p>
                  <div className='text-neutral my-2 font-light'>
                    <p>$200</p>
                    <p>Order was delivered 2 days ago</p>
                  </div>
                  <p>Delivered</p>
                </div>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className=''>
            <p className='text-xl text-gray-800 font-medium mb-4'>
              Billing Information
            </p>
            <div className='p-6 border border-gray-100 rounded-xl'>
              <div className='grid grid-cols-2 my-2'>
                <p className='text-neutral'>Company Name: </p>
                <p className='text-gray-800'>Viking Burrito</p>
              </div>
              <div className='grid grid-cols-2 my-2'>
                <p className='text-neutral'>Email Address: </p>
                <p className='text-gray-800'>oliver.viking@burrito.com</p>
              </div>
              <div className='grid grid-cols-2 my-2'>
                <p className='text-neutral'>VAT Number: </p>
                <p className='text-gray-800'>FRB1235476</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className=''>
            <p className='text-xl text-gray-800 font-medium mb-4'>
              Order Summary
            </p>
            <div className='p-6 border border-gray-100 rounded-xl'>
              <div className='grid grid-cols-2 my-2'>
                <p className='text-neutral'>Product Price: </p>
                <p className='text-gray-800'>$200</p>
              </div>
              <div className='grid grid-cols-2 my-2'>
                <p className='text-neutral'>Delivery: </p>
                <p className='text-gray-800'>$10</p>
              </div>
              <div className='grid grid-cols-2 my-2'>
                <p className='text-neutral'>Texes:</p>
                <p className='text-gray-800'>$20</p>
              </div>
              <div className='grid grid-cols-2 my-2 text-gray-800 text-lg font-medium'>
                <p className=''>Total: </p>
                <p className=''>$230</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
