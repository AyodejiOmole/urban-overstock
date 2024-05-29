import Orders from '@/components/Admin/Orders/Orders';
import { ICancelledOrders } from '@/interfaces/cancelled-orders';
import React from 'react';
import CancelledOrdersDisplay from '@/components/Admin/Orders/CancelledOrders';
import { getCancelledOrders } from '@/libs/orders';

export default async function CancelledOrders() {
  const apiCancelRes: Promise<ICancelledOrders[] | null> = getCancelledOrders();
  const cancelledOrders = await apiCancelRes;

  return (
    <section>
      {/* <div className='justify-between flex flex-wrap items-center gap-4 mb-2 w-full'>
        <div className='w-full max-w-md'>
          <TextInput
            placeholder='Search orders...'
            leftIcon={<CiSearch />}
            onChange={debouncedSearch}
            value={searchValue}
          />
        </div>
      </div> */}
      <CancelledOrdersDisplay orders={cancelledOrders!} />
    </section>
  );
}
