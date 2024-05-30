import CustomerDetails from '@/components/Admin/Customers/CustomerDetails/CustomerDetails';
import Button from '@/components/Global/Button';

import React from 'react';
import { getSingleCustomerOrderHistory, getSingleCustomer } from '@/libs/customers';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IOrder } from '@/interfaces/orders';
import { ISingleCustomer } from '@/interfaces/customers';
import Pagination from '@/components/Shared/Pagination';

export default async function AdminCustomerDetails({
  params,
}: {
  params: { id: string };
}) {

  const apiRes: Promise<IOrder[] | undefined> = getSingleCustomerOrderHistory(Number(params.id));
  const customerOrderHistory = await apiRes;

  const customerRes: Promise<ISingleCustomer | undefined> = getSingleCustomer(params.id);
  const customerDetails = await customerRes;

  console.log(customerOrderHistory);
  console.log(customerDetails);

  return (
    <section>
      {/* <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
        <div>
          <p className='text-xl font-bold text-gray-700'>Customer Details</p>
          <Pagination lastPage='Customer Details'/>
        </div>

        <div className='flex items-center gap-4'>
          <Button>
            <RiDeleteBin6Line />
            Delete account
          </Button>
        </div>
      </div> */}

      {/* Customer Details Section */}
      <CustomerDetails customerOrderHistory={customerOrderHistory} customerDetails={customerDetails}/>
    </section>
  );
}
