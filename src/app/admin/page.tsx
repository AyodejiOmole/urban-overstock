// 'use client';
import Header from '@/components/Admin/Dashboard/Header';
import OrdersTable from '@/components/Admin/Orders/OrdersTable';
import SalesChart from '@/components/Admin/SalesChart';
import StatCards from '@/components/Admin/StatCards';
import React from 'react';
import Sales from '@/components/Admin/Sales';
import { IProducts } from '@/interfaces/products';
import getAllProducts from '@/libs/products';

const AdminDashboard = async () => {
    const apiRes: Promise<IProducts | undefined> = getAllProducts();
    const products = await apiRes;

    return (
        <section>
        <Header />
        <StatCards />
        <SalesChart />
        <Sales products={products}/>
        <OrdersTable
            orders={null}
            // handleChangeSelectedOrders={function (e: any): void {
            //     throw new Error('Function not implemented.');
            // }}
            selectedOrders={[]}
            searchValue=''
        />
        </section>
  );
};

export default AdminDashboard;