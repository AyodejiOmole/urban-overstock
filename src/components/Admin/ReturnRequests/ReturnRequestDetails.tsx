"use client";
import { IReturnRequest } from '@/interfaces/return-requests';
import React from 'react'
import { CiLocationOn, CiLock, CiMail, CiShoppingCart } from 'react-icons/ci';
import { SlPhone } from 'react-icons/sl';
import Image from 'next/image';
import Button from '@/components/Global/Button';
import Pagination from '@/components/Shared/Pagination';
import Cookies from 'universal-cookie';
import HTTPService from '@/services/http';
import toast from 'react-hot-toast';
import ENDPOINTS from '@/config/ENDPOINTS';
import { DataTable } from 'primereact/datatable';
import { IoIosArrowDown } from 'react-icons/io';
import { Column } from 'primereact/column';
import paginatorTemplate from '@/components/Global/PaginatorTemplate';
import { OrderProduct } from '@/interfaces/return-requests';
import { formatCurrency } from '@/helpers';
import moment from 'moment';

const ReturnRequestDetails = ({
    returnRequestDetails,
    id
}: {
    returnRequestDetails: IReturnRequest | null
    id: string
}) => {

    const cookies = new Cookies();
    const httpService = new HTTPService();
  
    async function updateReturnRequest(returnId: string, status: string) {
      const token = cookies.get('urban-token');
  
      toast.loading('Updating...');
      const data = {
        status,
      }
  
      const res = await httpService.patch(
        `${ENDPOINTS.RETURN_REQUEST}/${returnId}`,
        data,
        `Bearer ${token}`
      );
  
      toast.dismiss();
      if (res.status === 200) {
        console.log(res);
        toast.success('Return request successfully updated!');
        // router.refresh();
      } else toast.error('Cannot update return request at this time!');
    };

    const productsTemplate = (order: OrderProduct) => {
        return (
          <div className='flex items-center gap-4'>
            <Image
              src={order.image}
              alt='image'
              width={100}
              height={100}
              className='h-12 w-12 bg-[#1b1b1b] rounded-md'
            />
            <div>
              <p className='font-medium'>{order.productName}</p>
              {/* {order.orderProduct.length > 1 && (
                <p className='text-sm flex-1'>
                  +{order.orderProduct.length} other products
                </p>
              )} */}
            </div>
          </div>
        );
    };

    function amountTemplate(order: OrderProduct) {
        return formatCurrency(order.total);
    };

    const dateTemplate = (order: OrderProduct) => {
        const { createdAt } = order;
    
        return moment(createdAt).format('MMM Do YYYY');
    };

  return (
    <section>
        <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
            <div>
            <p className='text-xl font-bold text-gray-700'>Return Request</p>
            <Pagination />
            </div>

            <div className='flex items-center gap-4'>
            <Button variant='outlined' onClick={() => updateReturnRequest(id, "Confirmed")}>
                {/* <PiExportBold /> */}
                Approve
            </Button>
            <Button variant='outlined' >
                {/* <FaPlus /> */}
                {/* <RiDeleteBin6Line /> */}
                Disapprove
            </Button>
            </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-6 gap-6'>
            {/* Column 1 */}
            <div className='lg:col-span-2'>
                <div className='p-2 border border-gray-200 bg-white rounded-xl pb-16 relative'>
                    {/* <div className='bg-gray-800 p-4 h-52 rounded-lg'></div>
                    <div className='w-48 h-48 bg-gray-200 rounded-full absolute left-1/2 -translate-x-1/2 top-32'>

                    </div> */}

                    <div className='pt-32 px-4'>
                    <div className='p-4 text-center'>
                        <p className='font-semibold text-gray-700 text-xl'>
                        {/* Isaiah Ernest */}
                        {!returnRequestDetails?.user.firstname && !returnRequestDetails?.user.lastname ? "Not provided" : returnRequestDetails?.user.firstname + " " + returnRequestDetails?.user.lastname }
                        </p>
                        <p className='text-neutral'>
                        {/* @isaiah_ernest */}
                        {returnRequestDetails?.user.email}
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
                                {returnRequestDetails?.userId}
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
                            {returnRequestDetails?.user.email}
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
                            0908 9898 990
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
                            1833 Bel Meadow Drive, Fontana, California 92335, USA
                            </p>
                        </div>
                        </div>
                        {/* Latest Transaction */}
                        <div className='flex items-center gap-2 mt-4'>
                        <div className='h-12 w-12 bg-gray-200 border-2 border-gray-100 rounded-full flex items-center justify-center text-xl text-neutral'>
                            <CiShoppingCart />
                        </div>
                        <div className='flex-1'>
                            <p className='text-neutral font-medium'>
                            Latest Transaction
                            </p>
                            <p className='text-gray-800 font-light text-sm'>
                            {/* 12 December 2023 */}
                            {returnRequestDetails?.updatedAt}
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
                    {/* <CustomerTransactionsTable /> */}
                    <DataTable
                        value={[{...returnRequestDetails?.orderProduct}]}
                        dataKey='id'
                        tableStyle={{ minWidth: '50rem' }}
                        paginator
                        rows={5}
                        paginatorTemplate={paginatorTemplate}
                        paginatorClassName='flex justify-between'
                        rowsPerPageOptions={[20, 50, 100, 250]}
                        className='rounded-xl text-sm'
                        sortOrder={-1}
                        sortField='date'
                        sortIcon={<IoIosArrowDown />}
                    >
                        <Column field='id' header='Order ID' sortable></Column>
                        <Column
                            field='order.item'
                            header='Products'
                            body={productsTemplate}
                        >
                        </Column>
                        <Column
                            field='totalAmount'
                            header='Total Amount'
                            body={amountTemplate}
                            sortable
                        ></Column>
                        <Column
                            field='date'
                            header='Date'
                            body={dateTemplate}
                            sortable
                        ></Column>
                    </DataTable>
                </div>
                {/*  */}
                <div className='my-4 p-4 sm:p-6 border border-gray-200 bg-white rounded-lg'>
                    <p className='mb-8 text-lg text-gray-700'>Images</p>

                    <div className='rounded-xl bg-gray-50 p-8 border border-gray-200'>
                    <div className='flex items-center justify-center gap-4 flex-wrap'>
                        {/* {[1, 2, 3].map((el) => ( */}
                        <Image
                            // key={el}
                            src={returnRequestDetails?.orderProduct.image ?? ""}
                            alt='image'
                            width={100}
                            height={100}
                            className='h-28 w-28'
                        />
                    {/* ))} */}
                    </div>
                    <p className='mt-8 text-center text-neutral text-lg font-light'>
                        Uploaded Images
                    </p>
                    </div>
                </div>
                {/*  */}
                <div>
                    <p className='mt-8 text-lg text-gray-700'>Reason For Returning</p>
                    <div className='my-4 p-4 sm:p-6 border border-gray-200 bg-white rounded-lg'>
                    <p>{returnRequestDetails?.reason}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ReturnRequestDetails;