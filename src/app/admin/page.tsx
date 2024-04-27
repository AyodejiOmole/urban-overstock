'use client';
import Header from '@/components/Admin/Dashboard/Header';
import OrdersTable from '@/components/Admin/Orders/OrdersTable';
import SalesChart from '@/components/Admin/SalesChart';
import StatCards from '@/components/Admin/StatCards';
import React from 'react';

const AdminDashboard = () => {
  return (
    <section>
      <Header />
      <StatCards />
      <SalesChart />
      <OrdersTable
        orders={null}
        handleChangeSelectedOrders={function (e: any): void {
          throw new Error('Function not implemented.');
        }}
        selectedOrders={[]}
      />
    </section>
  );
};

export default AdminDashboard;
