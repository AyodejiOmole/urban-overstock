import CancelledOrderDetails from '@/components/Admin/Orders/CancelledOrderDetails';
import Button from '@/components/Global/Button';

import React from 'react';
// import { FaPlus } from 'react-icons/fa';
// import { getSingleCustomerOrderHistory, getSingleCustomer } from '@/libs/customers';

// import { PiExportBold } from 'react-icons/pi';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { IOrder } from '@/interfaces/orders';
// import { ICustomer } from '@/interfaces/customers';
// import { ISingleCustomer } from '@/interfaces/customers';

export default async function AdminCustomerDetails({
  params,
}: {
  params: { id: string };
}) {

//   const apiRes: Promise<IOrder[] | undefined> = getSingleCustomerOrderHistory(Number(params.id));
//   const customerOrderHistory = await apiRes;

//   const customerRes: Promise<ISingleCustomer | undefined> = getSingleCustomer(params.id);
//   const customerDetails = await customerRes;

//   console.log(customerOrderHistory);
//   console.log(customerDetails);

  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
        <p className='text-xl font-bold text-gray-700'>Customer Details</p>

        <div className='flex items-center gap-4'>
          <Button variant='outlined'>
            {/* <PiExportBold /> */}
            Approve
          </Button>
          <Button>
            {/* <FaPlus /> */}
            {/* <RiDeleteBin6Line /> */}
            Decline
          </Button>
        </div>
      </div>

      {/* Customer Details Section */}
      <CancelledOrderDetails cancelledOrderHistory={null} cancelledOrdersDetails={null}/>
    </section>
  );
}
