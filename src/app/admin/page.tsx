// 'use client';
import Header from '@/components/Admin/Dashboard/Header';
import OrdersTable from '@/components/Admin/Orders/OrdersTable';
import SalesChart from '@/components/Admin/SalesChart';
import StatCards from '@/components/Admin/StatCards';
import React from 'react';
import Sales from '@/components/Admin/Sales';
import { IProducts } from '@/interfaces/products';
import getAllProducts from '@/libs/products';
import getTopChart from '@/libs/dashboard';
import { ITopSellingProducts } from '@/interfaces/top-selling-products';
import { getTopProductsAndUsers } from '@/libs/dashboard';

export interface IDashboardData {
    costomers: number
    quantity: number
    sales: number
    revenue: number
}

const AdminDashboard = async () => {
    const apiRes: Promise<IProducts | undefined> = getAllProducts();
    const products = await apiRes;

    const apiTopChart: Promise<IDashboardData | null> = getTopChart();
    const dashboardData = await apiTopChart;

    const topSellingProductsApiRes: Promise<ITopSellingProducts | undefined> = getTopProductsAndUsers();
    const topSellingProducts = await topSellingProductsApiRes;

    return (
        <section>
        <Header />
        <StatCards dashboardData={dashboardData}/>
        <SalesChart />
        <Sales products={topSellingProducts?.topProducts}/>
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