'use client';
import React from 'react';
import { CiLocationOn, CiLock, CiMail, CiShoppingCart } from 'react-icons/ci';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { SlPhone } from 'react-icons/sl';
import CustomerStatCards from './CustomerStatCards';
import CustomerTransactionsTable from './CustomerTransactions';
import { IOrder } from '@/interfaces/orders';
import { ISingleCustomer } from '@/interfaces/customers';
import Pagination from '@/components/Shared/Pagination';
import Button from '@/components/Global/Button';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Modal from '@/components/Global/Modal';
import { useState } from 'react';

export default function CustomerDetails({
  customerOrderHistory,
  customerDetails,
}: {
  customerOrderHistory: IOrder[] | undefined,
  customerDetails: ISingleCustomer | undefined,
}) {
  console.log(customerOrderHistory);
  console.log(customerDetails);

  const [deleteAccountModal, setDeleteAccountModal] = useState(false);

  return (
    <div>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
        <div>
          <p className='text-xl font-bold text-gray-700'>Customer Details</p>
          <Pagination lastPage='Customer Details'/>
        </div>

        <div className='flex items-center gap-4'>
          <Button onClick={() => setDeleteAccountModal(true)}>
            <RiDeleteBin6Line />
            Delete account
          </Button>
        </div>
      </div>
    
      <div className='grid grid-cols-1 lg:grid-cols-6 gap-6'>
        {/* Column 1 */}
        <div className='lg:col-span-2'>
          <div className='p-2 border border-gray-200 bg-white rounded-lg pb-16 relative'>
            <div className='bg-blue-800 p-4 h-52 rounded-lg'></div>
            <div className='w-48 h-48 bg-gray-200 rounded-full absolute left-1/2 -translate-x-1/2 top-32'></div>

            <div className='pt-32 px-4'>
              <div className='p-4 text-center'>
                <p className='font-semibold text-gray-700 text-xl'>
                  {/* Isaiah Ernest */}
                  {customerDetails?.firstName + " " + customerDetails?.lastName}
                </p>
                <p className='text-neutral'>
                  {/* @isaiah_ernest */}
                  {customerDetails?.email}
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
                      {customerDetails?.uuid}
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
                      {/* johndoe@gmail.com */}
                      {customerDetails?.email}
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
                      {customerDetails?.shippingAddress?.phoneNumber}
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
                      {customerDetails?.shippingAddress?.streetAddress + " " + customerDetails?.shippingAddress?.city + " " + customerDetails?.shippingAddress?.state + " " + customerDetails?.shippingAddress?.country}
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
                      {/* 12 December 2023 */}
                      {/* {customerOrderHistory?[0].createdAt} */}
                      {customerDetails?.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Column 2 */}
        <div className='lg:col-span-4'>
          <CustomerStatCards 
            orderCount={customerDetails?.orderCount}
            orderBalance={customerDetails?.orderBalance}
            rewardPoint={customerDetails?.rewardPoint}
          />
          <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg'>
            <CustomerTransactionsTable history={customerOrderHistory}/>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <Modal
              isOpen={deleteAccountModal}
              handleClose={() => setDeleteAccountModal(false)}
              title='Cancel order'
            > 
              <h3 className='mb-4 text-lg text-black'> Are you sure you want to delete this customer? </h3>
              <div className='flex items-center gap-2 justify-between'>
                <Button 
                  // onClick={() => updateOrder(order?.id, "Cancelled")}
                >
                  Yes
                </Button>
                <Button variant='outlined' onClick={() => setDeleteAccountModal(false)}>
                  No
                </Button>
              </div>
            </Modal>
    </div>
  );
}
