import Button from '@/components/Global/Button';
import Modal from '@/components/Global/Modal';
import TextInput from '@/components/Global/TextInput';
import { IOrder, OrderProductItem } from '@/interfaces/orders';
import clsx from 'clsx';
import moment from 'moment';
import React, { useState } from 'react';
import { BsTruck } from 'react-icons/bs';
import { CiCreditCard1, CiMail, CiUser } from 'react-icons/ci';
import { FaCartArrowDown, FaCheck } from 'react-icons/fa';
import { HiOutlineBadgeCheck } from 'react-icons/hi';
import {
  IoCheckmark,
  IoLocationOutline,
  IoPhonePortraitOutline,
} from 'react-icons/io5';
import { LuTruck } from 'react-icons/lu';
import { PiCalendarCheck } from 'react-icons/pi';
import { RiRefreshLine } from 'react-icons/ri';
import { TbFileInvoice } from 'react-icons/tb';
import OrderDetailsTable from './OrderDetailsTable';

export default function OrderDetails({ order }: { order: IOrder | null }) {
  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div>
      {/* Grid 1 */}
      <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8'>
        {/* Order Details */}
        <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-xl'>
          <p className='text-lg font-medium text-gray-700 mb-8 flex items-center justify-between'>
            <span>Order #302011</span>
            <span className='p-2 px-4 text-xs bg-blue-100 rounded-full'>
              {order?.status}
            </span>
          </p>
          {/*  */}
          <div className='text-gray-600 flex items-center justify-between gap-8 mt-2 text-sm'>
            <div className='flex items-center gap-2'>
              <div className='h-12 w-12 bg-gray-200 border-4 border-gray-100 rounded-full flex items-center justify-center text-xl'>
                <PiCalendarCheck />
              </div>
              <div className='flex-1'>
                <p>Added</p>
              </div>
            </div>
            <p>{moment(order?.createdAt).format('MMM Do YYYY, h:mm a')}</p>
          </div>
          {/*  */}
          <div className='text-gray-600 flex items-center justify-between gap-8 mt-2 text-sm'>
            <div className='flex items-center gap-2'>
              <div className='h-12 w-12 bg-gray-200 border-4 border-gray-100 rounded-full flex items-center justify-center text-xl'>
                <CiCreditCard1 />
              </div>
              <div className='flex-1'>
                <p>Payment Method</p>
              </div>
            </div>
            <p>{order?.paymentMethod}</p>
          </div>
          {/*  */}
          <div className='text-gray-600 flex items-center justify-between gap-8 mt-2 text-sm'>
            <div className='flex items-center gap-2'>
              <div className='h-12 w-12 bg-gray-200 border-4 border-gray-100 rounded-full flex items-center justify-center text-xl'>
                <LuTruck />
              </div>
              <div className='flex-1'>
                <p>Shipping Method</p>
              </div>
            </div>
            <p>{order?.shippingMethod}</p>
          </div>
          {/*  */}
        </div>
        {/* Customer Details */}
        <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-xl'>
          <p className='text-lg font-medium text-gray-700 mb-8'>Customer</p>

          {/*  */}
          <div className='text-gray-600 flex items-center justify-between gap-8 mt-2 text-sm capitalize'>
            <div className='flex items-center gap-2'>
              <div className='h-12 w-12 bg-gray-200 border-4 border-gray-100 rounded-full flex items-center justify-center text-xl'>
                <CiUser />
              </div>
              <div className='flex-1'>
                <p>Customer</p>
              </div>
            </div>
            <p>{order?.receiverName}</p>
          </div>

          {/*  */}
          <div className='text-gray-600 flex items-center justify-between gap-8 mt-2 text-sm'>
            <div className='flex items-center gap-2'>
              <div className='h-12 w-12 bg-gray-200 border-4 border-gray-100 rounded-full flex items-center justify-center text-xl'>
                <CiMail />
              </div>
              <div className='flex-1'>
                <p>Email</p>
              </div>
            </div>
            <p>josh_adam@mail.com</p>
          </div>
          {/*  */}
          <div className='text-gray-600 flex items-center justify-between gap-8 mt-2 text-sm'>
            <div className='flex items-center gap-2'>
              <div className='h-12 w-12 bg-gray-200 border-4 border-gray-100 rounded-full flex items-center justify-center text-xl'>
                <IoPhonePortraitOutline />
              </div>
              <div className='flex-1'>
                <p>Phone</p>
              </div>
            </div>
            <p>{order?.receiverPhone}</p>
          </div>
        </div>
        {/* Document */}
        <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-xl'>
          <p className='text-lg font-medium text-gray-700 mb-8'>Document</p>

          {/*  */}
          <div className='text-gray-600 flex items-center justify-between gap-8 mt-2 text-sm'>
            <div className='flex items-center gap-2'>
              <div className='h-12 w-12 bg-gray-200 border-4 border-gray-100 rounded-full flex items-center justify-center text-xl'>
                <TbFileInvoice />
              </div>
              <div className='flex-1'>
                <p>Invoice</p>
              </div>
            </div>
            <p>{order?.uuid}</p>
          </div>

          {/*  */}
          <div className='text-gray-600 flex items-center justify-between gap-8 mt-2 text-sm'>
            <div className='flex items-center gap-2'>
              <div className='h-12 w-12 bg-gray-200 border-4 border-gray-100 rounded-full flex items-center justify-center text-xl'>
                <LuTruck />
              </div>
              <div className='flex-1'>
                <p>Shipping</p>
              </div>
            </div>
            <p>{order?.shippingId}</p>
          </div>

          {/*  */}
          <div className='text-gray-600 flex items-center justify-between gap-8 mt-2 text-sm'>
            <div className='flex items-center gap-2'>
              <div className='h-12 w-12 bg-gray-200 border-4 border-gray-100 rounded-full flex items-center justify-center text-xl'>
                <HiOutlineBadgeCheck />
              </div>
              <div className='flex-1'>
                <p>Rewards</p>
              </div>
            </div>
            <p>40000 Points</p>
          </div>
        </div>
      </div>

      {/* Grid 2 */}
      <div className='grid grid-cols-1 xl:grid-cols-6 gap-4 w-full'>
        <div className='col-span-1 xl:col-span-4 w-full'>
          <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-xl w-full'>
            <p className='text-lg font-medium text-gray-700 mb-8'>Order List</p>

            <OrderDetailsTable
              orderList={order?.orderProduct as OrderProductItem[]}
            />
          </div>
        </div>
        <div className='grid md:grid-cols-2 xl:grid-cols-1 xl:col-span-2 gap-4'>
          <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-xl'>
            <p className='text-lg font-medium text-gray-700 mb-8'>Address</p>

            {/*  */}
            <div className='flex items-center gap-2 mt-6'>
              <div className='h-12 w-12 bg-gray-200 border-2 border-gray-100 rounded-full flex items-center justify-center text-xl text-neutral'>
                <IoLocationOutline />
              </div>
              <div className='flex-1'>
                <p className='text-gray-700 font-medium'>Billing</p>
                <p className='text-gray-600 text-sm font-light'>
                  {order?.address}
                </p>
              </div>
            </div>
            {/*  */}
            <div className='flex items-center gap-2 mt-6'>
              <div className='h-12 w-12 bg-gray-200 border-2 border-gray-100 rounded-full flex items-center justify-center text-xl text-neutral'>
                <IoLocationOutline />
              </div>
              <div className='flex-1'>
                <p className='text-gray-700 font-medium'>Shipping</p>
                <p className='text-gray-600 text-sm font-light'>
                  {order?.address}
                </p>
              </div>
            </div>
          </div>
          <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-xl'>
            <p className='text-lg font-medium text-gray-700 mb-8'>
              Order Status
            </p>

            {/* Order Statuses */}
            <div className='relative'>
              <div className='absolute w-0.5 h-[90%] border border-gray-200 left-6 top-2 order-border'></div>

              {/* Order Placed */}
              <div className='flex items-center gap-2 my-8 z-10 relative'>
                <div className='h-12 w-12 bg-[#eeeeff] border-2 border-[#f5f5ff] rounded-full flex items-center justify-center text-xl text-primary'>
                  <FaCartArrowDown />
                </div>
                <div className='flex-1'>
                  <p className='text-gray-600'>Order Placed</p>
                  <p className='text-neutral text-xs font-light'>
                    An order has been placed
                  </p>
                  <p className='text-neutral text-xs font-light'>
                    {moment(order?.createdAt).format('MMM Do YYYY, h:mm a')}
                  </p>
                </div>
              </div>
              {/* Order Processing */}
              <div className='flex items-center gap-2 my-8 z-10 relative'>
                <div
                  className={clsx(
                    'h-12 w-12 rounded-full flex items-center justify-center text-xl border-4',
                    order?.status.toLowerCase() === 'confirmed'
                      ? 'border-[#f5f5ff] bg-[#eeeeff] text-primary'
                      : 'bg-gray-200 border-gray-100 text-neutral'
                  )}
                >
                  <RiRefreshLine />
                </div>
                <div className='flex-1'>
                  <p className='text-gray-600'>Processing</p>
                  <p className='text-neutral text-xs font-light'>
                    Seller has processed your order
                  </p>
                  <p className='text-neutral text-xs font-light'>
                    {moment(order?.createdAt).format('MMM Do YYYY, h:mm a')}
                  </p>
                </div>
              </div>
              {/* Order Shipped */}
              <div className='flex items-center gap-2 my-8 z-10 relative'>
                <div
                  className={clsx(
                    'h-12 w-12 rounded-full flex items-center justify-center text-xl bg-gray-200 border-4 border-gray-100 text-neutral',
                    order?.status.toLowerCase() === 'shipped' &&
                      'border-[#f5f5ff] bg-[#eeeeff] text-primary'
                  )}
                >
                  <BsTruck />
                </div>
                <div className='flex-1'>
                  <p className='text-gray-600'>Shipped</p>

                  <p className='text-neutral text-xs font-light'>
                    {order?.status.toLowerCase() === 'shipped' ? (
                      <span>
                        {moment(order?.updatedAt).format('MMM Do YYYY, h:mm a')}
                      </span>
                    ) : (
                      <span>DD/MM/YY, 00:00</span>
                    )}
                  </p>
                </div>
              </div>
              {/* Order Delivered */}
              <div className='flex items-center gap-2 my-8 z-10 relative'>
                <div
                  className={clsx(
                    'h-12 w-12 rounded-full flex items-center justify-center text-xl bg-gray-200 border-4 border-gray-100 text-neutral',
                    order?.status.toLowerCase() === 'delivered' &&
                      'border-[#f5f5ff] bg-[#eeeeff] text-primary'
                  )}
                >
                  <IoCheckmark />
                </div>
                <div className='flex-1'>
                  <p className='text-gray-600'>Delivered</p>

                  <p className='text-neutral text-xs font-light'>
                    {order?.status.toLowerCase() === 'delivered' ? (
                      <span>
                        {moment(order?.updatedAt).format('MMM Do YYYY, h:mm a')}
                      </span>
                    ) : (
                      <span>DD/MM/YY, 00:00</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2 flex-wrap'>
              <Button onClick={openModal}>Update Status</Button>
              <Button variant='outlined'>Cancel Orer</Button>
            </div>

            {/* Update Status Modal */}
            <Modal
              isOpen={modalOpen}
              handleClose={closeModal}
              title='Status Update'
            >
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 items-center'>
                <div className='mb-6'>
                  <label
                    htmlFor='courierName'
                    className='text-sm text-neutral mb-2 block'
                  >
                    Courier Name
                  </label>
                  <TextInput
                    id='courierName'
                    onChange={() => {}}
                    value={''}
                    error={''}
                  />
                </div>
                {/*  */}
                <div className='mb-6'>
                  <label
                    htmlFor='trackingNumber'
                    className='text-sm text-neutral mb-2 block'
                  >
                    Tracking Number
                  </label>
                  <TextInput
                    id='trackingNumber'
                    onChange={() => {}}
                    value={''}
                    error={''}
                  />
                </div>
              </div>

              <div className='mb-6'>
                <label
                  htmlFor='shippingUrl'
                  className='text-sm text-neutral mb-2 block'
                >
                  Shipping Tracking URL
                </label>
                <TextInput
                  id='shippingUrl'
                  onChange={() => {}}
                  value={''}
                  error={''}
                />
              </div>

              <div className='mb-6'>
                <label
                  htmlFor='estimatedDeliveryDate'
                  className='text-sm text-neutral mb-2 block'
                >
                  Estimated Delivery Date
                </label>
                <TextInput
                  id='estimatedDeliveryDate'
                  onChange={() => {}}
                  value={''}
                  error={''}
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='note'
                  className='text-sm text-neutral mb-2 block'
                >
                  Note
                </label>
                <textarea id='note' onChange={() => {}} value={''} />
              </div>

              <div className='flex items-center gap-2'>
                <Button>Update</Button>
                <Button variant='outlined' onClick={closeModal}>
                  Cancel
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
