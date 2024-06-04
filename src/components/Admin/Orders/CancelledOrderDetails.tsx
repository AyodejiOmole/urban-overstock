"use client";
"use client";
import React from 'react';
import { CiLocationOn, CiLock, CiMail, CiShoppingCart } from 'react-icons/ci';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { SlPhone } from 'react-icons/sl';
import { IOrder } from '@/interfaces/orders';
import { ISingleCustomer } from '@/interfaces/customers';
import CancelledOrderTransactionTable from './CancelledOrderTransactionTable';
import Image from 'next/image';
import Pagination from '@/components/Shared/Pagination';
import Button from '@/components/Global/Button';
import Cookies from 'universal-cookie';
import HTTPService from '@/services/http';
import toast from 'react-hot-toast';
import ENDPOINTS from '@/config/ENDPOINTS';
import { useRouter } from 'next/navigation';
import { ICancelledOrders } from '@/interfaces/cancelled-orders';
import { useState } from 'react';
import Modal from '@/components/Global/Modal';

export default function CancelledOrderDetails({
  cancelledOrderHistory,
}: {
    cancelledOrderHistory: ICancelledOrders | null;
}) {
  console.log(cancelledOrderHistory);

  const cookies = new Cookies();
  const httpService = new HTTPService();

  const [approveModal, setApproveModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);

  const router = useRouter();

  async function approveOrderRequest(id: any) {
    const token = cookies.get('urban-token');

    setApproveModal(false);

    if(id) {
        toast.loading('Approving cancel order request...');
  
        const res = await httpService.patchById(
          `${ENDPOINTS.ORDERS}/cancel-request/approved/${id}`,
          `Bearer ${token}`
        );
        toast.dismiss();
        if (res.status === 200) {
          console.log(res);
          toast.success('Cancel order request approved');
          
          router.refresh();
        } else toast.error('Cannot approve order request at this time.');
      
    }
  }

  async function cancelOrderRequest(id: any) {
    const token = cookies.get('urban-token');

    setDeclineModal(false);
   
    toast.loading('Declining cancel order request...');

    const res = await httpService.patchById(
      `${ENDPOINTS.ORDERS}/cancel-request/approved/${id}`,
      `Bearer ${token}`
    );
    toast.dismiss();
    if (res.status === 200) {
      console.log(res);
      toast.success('Cancel order request denied');
      router.refresh();
    } else toast.error('Cannot decline order request at this time');
  }

  return (
    <section>

      console.log(cancelledOrderHistory);

      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
        <div>
          <p className='text-xl font-bold text-gray-700'>Cancelled Orders</p>
          <Pagination lastPage='Details'/>
        </div>

        <div className='flex items-center gap-4'>
          {
            cancelledOrderHistory?.status.toLowerCase() === "denied" && 
            <Button variant='outlined' onClick={() => setApproveModal(true)}>
              {/* <PiExportBold /> */}
              Approve
            </Button>
          }
          

          {
            cancelledOrderHistory?.status.toLowerCase() !== "denied" && 
            <Button variant='outlined' onClick={() => setDeclineModal(true)}>
              {/* <RiDeleteBin6Line /> */}
              Deny
            </Button>
          }
        </div>
      </div>
    
      <div className='grid grid-cols-1 lg:grid-cols-6 gap-6'>
        {/* Column 1 */}
        <div className='lg:col-span-2'>
          <div className='p-2 border border-gray-200 bg-white rounded-lg pb-16 relative'>
            <div className='bg-blue-800 p-4 h-52 rounded-lg'>
              
            </div>
            <div className='w-48 h-48 bg-gray-200 rounded-full absolute left-1/2 -translate-x-1/2 top-32'>
              <Image
                src={cancelledOrderHistory?.order.orderProduct[0].image ?? " "}
                alt={"Damaged image"}
                // objectFit="cover"
                layout="fill"
                className='rounded-full'
              />
            </div>

            <div className='pt-32 px-4'>
              <div className='p-4 text-center'>
                <p className='font-semibold text-gray-700 text-xl'>
                  {/* Isaiah Ernest */}
                  {cancelledOrderHistory?.order.receiverName}
                </p>
                <p className='text-neutral'>
                  {/* @isaiah_ernest */}
                  {cancelledOrderHistory?.order.receiverPhone}
                </p>
              </div>

              <div className='h-[2px] w-full bg-gray-200'></div>
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
                      {/* johndoe@gmail.com */}
                      {cancelledOrderHistory?.user.email}
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
                      {cancelledOrderHistory?.order.receiverPhone}
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
                      {cancelledOrderHistory?.order.address}
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
                      {/* 12 December 2023 */}
                      {cancelledOrderHistory?.updatedAt}
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
            <CancelledOrderTransactionTable history={cancelledOrderHistory?.order.orderProduct}/>
          </div>

          <div>
              <p className='mt-8 text-lg text-gray-700'>Reason For Cancelling</p>
              <div className='my-4 p-4 sm:p-6 border border-gray-200 bg-white rounded-lg'>
              {/* <p>{cancelledOrderHistory?.order.orderProduct.reason}</p> */}
              {"Wrong product"}
              </div>
          </div>
        </div>
      </div>

      {/* Approve Cancel Order Modal */}
      <Modal
        isOpen={approveModal}
        handleClose={() => setApproveModal(false)}
        title='Approve cancel order request'
      > 
        <h3 className='mb-4 text-lg text-black'> Are you sure you want to approve this cancel request? </h3>
        <div className='flex items-center gap-2 justify-between'>
          <Button onClick={() => approveOrderRequest(cancelledOrderHistory?.id)}>Yes</Button>
          <Button variant='outlined' onClick={() =>  setApproveModal(false)}>
            No
          </Button>
        </div>
      </Modal>

      {/* Decline Cancel Order Modal */}
      <Modal
        isOpen={declineModal}
        handleClose={() => setDeclineModal(false)}
        title='Approve cancel order request'
      > 
        <h3 className='mb-4 text-lg text-black'> Are you sure you want to decline this cancel request? </h3>
        <div className='flex items-center gap-2 justify-between'>
          <Button onClick={() => cancelOrderRequest(cancelledOrderHistory?.id)}>Yes</Button>
          <Button variant='outlined' onClick={() =>  setDeclineModal(false)}>
            No
          </Button>
        </div>
      </Modal>

    </section>
  );
}
