import CancelledOrderDetails from '@/components/Admin/Orders/CancelledOrderDetails';
import React from 'react';
import { getSingleOrder } from '@/libs/orders';
import { IOrder } from '@/interfaces/orders';
import Pagination from '@/components/Shared/Pagination';
import { ICancelledOrders } from '@/interfaces/cancelled-orders';
import { getSingleCancelRequest } from '@/libs/orders';

export default async function AdminCustomerDetails({
  params,
}: {
  params: { id: string };
}) {

  // const apiRes: Promise<IOrder | undefined> = getSingleOrder(params.id);
  // const orderDetails = await apiRes;

  const apiCancelRes: Promise<ICancelledOrders | null> = getSingleCancelRequest(params.id);
  const orderDetails = await apiCancelRes;

  console.log(orderDetails);

  return (
    <section>
      {/* Customer Details Section */}
      <CancelledOrderDetails 
        cancelledOrderHistory={orderDetails} 
        // cancelledOrdersDetails={null}
      />
    </section>
  );
}
