import Orders from '@/components/Admin/Orders/Orders';
import { IOrder } from '@/interfaces/orders';
import getOrders from '@/libs/orders';
import React from 'react';
import { ICancelledOrders } from '@/interfaces/cancelled-orders';
import { getCancelledOrders } from '@/libs/orders';

export default async function AdminOrders() {
  const apiRes: Promise<IOrder[] | null> = getOrders();
  const orders = await apiRes;

  const apiCancelRes: Promise<ICancelledOrders[] | null> = getCancelledOrders();
  const cancelledOrders = await apiCancelRes;

  console.log(orders);

  return (
    <section>
      <Orders orders={orders} cancelledOrdersCount={cancelledOrders?.length ?? 0}/>
    </section>
  );
}
