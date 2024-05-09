import Orders from '@/components/Admin/Orders/Orders';
import { IOrder } from '@/interfaces/orders';
import getOrders from '@/libs/orders';
import React from 'react';
import CancelledOrdersDisplay from '@/components/Admin/Orders/CancelledOrders';

export default async function CancelledOrders() {
  const apiRes: Promise<IOrder[] | null> = getOrders();
  const orders = await apiRes;

  console.log(orders);

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
      <CancelledOrdersDisplay orders={orders} />
    </section>
  );
}
