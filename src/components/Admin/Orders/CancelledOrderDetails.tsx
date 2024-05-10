import React from 'react';
import { CiLocationOn, CiLock, CiMail, CiShoppingCart } from 'react-icons/ci';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { SlPhone } from 'react-icons/sl';
import { IOrder } from '@/interfaces/orders';
import { ISingleCustomer } from '@/interfaces/customers';
import CancelledOrderTransactionTable from './CancelledOrderTransactionTable';

export default function CancelledOrderDetails({
  cancelledOrderHistory,
  cancelledOrdersDetails,
}: {
    cancelledOrderHistory: IOrder | undefined;
    cancelledOrdersDetails: any;
}) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-6'>
      {/* Column 1 */}
      <div className='lg:col-span-2'>
        <div className='p-2 border border-gray-200 bg-white rounded-lg pb-16 relative'>
          {/* <div className='bg-gray-800 p-4 h-52 rounded-lg'></div> */}
          {/* <div className='w-48 h-48 bg-gray-200 rounded-full absolute left-1/2 -translate-x-1/2 top-32'></div> */}

          <div className='pt-32 px-4'>
            <div className='p-4 text-center'>
              <p className='font-semibold text-gray-700 text-xl'>
                {/* Isaiah Ernest */}
                {cancelledOrderHistory?.receiverName}
              </p>
              <p className='text-neutral'>
                {/* @isaiah_ernest */}
                {cancelledOrderHistory?.receiverPhone}
              </p>
            </div>

            <div className='h-[2px] w-full bg-gray-200'></div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-4'>
              {/* User Id */}
              <div className='flex items-center gap-2 mt-4'>
                <div className='h-12 w-12 bg-gray-200 border-2 border-gray-100 rounded-full flex items-center justify-center text-xl text-neutral'>
                  <CiLock />
                </div>
                <div className='flex-1'>
                  <p className='text-neutral font-medium'>User ID</p>
                  <p className='text-gray-800 font-light text-sm'>
                    {/* U011012 */}
                    {cancelledOrderHistory?.userId}
                  </p>
                </div>
              </div>
              {/* User Email */}
              <div className='flex items-center gap-2 mt-4'>
                <div className='h-12 w-12 bg-gray-200 border-2 border-gray-100 rounded-full flex items-center justify-center text-xl text-neutral'>
                  <CiMail />
                </div>
                <div className='flex-1'>
                  <p className='text-neutral font-medium'>Billing Email</p>
                  <p className='text-gray-800 font-light text-sm'>
                    johndoe@gmail.com
                    {/* {customerDetails?.email} */}
                  </p>
                </div>
              </div>
              {/* Phone Number */}
              <div className='flex items-center gap-2 mt-4'>
                <div className='h-12 w-12 bg-gray-200 border-2 border-gray-100 rounded-full flex items-center justify-center text-xl text-neutral'>
                  <SlPhone />
                </div>
                <div className='flex-1'>
                  <p className='text-neutral font-medium'>Phone Number</p>
                  <p className='text-gray-800 font-light text-sm'>
                    {/* 0908 9898 990 */}
                    {cancelledOrderHistory?.receiverPhone}
                    {/* {customerDetails?.shippingAddress?.phoneNumber} */}
                  </p>
                </div>
              </div>
              {/* Delivery Address */}
              <div className='flex items-center gap-2 mt-4'>
                <div className='h-12 w-12 bg-gray-200 border-2 border-gray-100 rounded-full flex items-center justify-center text-xl text-neutral'>
                  <CiLocationOn />
                </div>
                <div className='flex-1'>
                  <p className='text-neutral font-medium'>Delivery Address</p>
                  <p className='text-gray-800 font-light text-sm'>
                    {/* 1833 Bel Meadow Drive, Fontana, California 92335, USA */}
                    {cancelledOrderHistory?.address}
                    {/* {customerDetails?.shippingAddress?.streetAddress + " " + customerDetails?.shippingAddress?.city + " " + customerDetails?.shippingAddress?.state + " " + customerDetails?.shippingAddress?.country} */}
                  </p>
                </div>
              </div>
              {/* Latest Transaction */}
              <div className='flex items-center gap-2 mt-4'>
                <div className='h-12 w-12 bg-gray-200 border-2 border-gray-100 rounded-full flex items-center justify-center text-xl text-neutral'>
                  <CiShoppingCart />
                </div>
                <div className='flex-1'>
                  <p className='text-neutral font-medium'>Latest Transaction</p>
                  <p className='text-gray-800 font-light text-sm'>
                    12 December 2023
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Column 2 */}
      <div className='lg:col-span-4'>
        <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg'>
          <CancelledOrderTransactionTable history={cancelledOrderHistory?.orderProduct}/>
        </div>
      </div>
    </div>
  );
}
