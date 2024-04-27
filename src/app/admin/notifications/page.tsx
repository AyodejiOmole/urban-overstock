import NotificationsTable from '@/components/Admin/Notifications/NotificationsTable';
// import OrdersTable from '@/components/Admin/Orders/OrdersTable';
// import ProductsTable from '@/components/Admin/Products/ProductsTable';
// import Button from '@/components/Global/Button';
// import Link from 'next/link';
import React from 'react';
// import { FaPlus } from 'react-icons/fa';
import PageHeading from "./components/PageHeading"

export default function AdminNotifications() {
  return (
    <section className='py-4'>
      <PageHeading />
      <NotificationsTable />
    </section>
  );
}
