import Orders from '@/components/Admin/Orders/Orders';
import { IOrder } from '@/interfaces/orders';
import getOrders from '@/libs/orders';
import React from 'react';

export default async function AdminOrders() {
  const apiRes: Promise<IOrder[] | null> = getOrders();
  const orders = await apiRes;

  return (
    <section>
      <Orders orders={orders} />
    </section>
  );
}
