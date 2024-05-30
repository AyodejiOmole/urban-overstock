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
import getOrders from '@/libs/orders';
import { IOrder } from '@/interfaces/orders';
import { getDashboardGraph } from '@/libs/dashboard';
import { IGraphDetails } from '@/interfaces/graph';
import AdminPage from '@/components/Admin/Dashboard/AdminPage';
// import AdminPageWrapper from '@/components/Admin/Dashboard/AdminPageWrapper';

export interface IDashboardData {
    costomers: number
    quantity: number
    sales: number
    revenue: number
}

const AdminDashboard = async () => {
    const apiTopChart: Promise<IDashboardData | null> = getTopChart();
    const dashboardData = await apiTopChart;

    const topSellingProductsApiRes: Promise<ITopSellingProducts | undefined> = getTopProductsAndUsers();
    const topSellingProducts = await topSellingProductsApiRes;

    const apiRes: Promise<IOrder[] | null> = getOrders();
    const orders = await apiRes;

    const apiResGraph: Promise<IGraphDetails | null> = getDashboardGraph();
    const graph = await apiResGraph;

    console.log(orders);

    return (
        <section>
            {/* <AdminPage dashboardData={dashboardData} graph={graph} topSellingProducts={topSellingProducts} orders={orders}/> */}
            <Header />
            <StatCards dashboardData={dashboardData}/>
            <SalesChart graph={graph}/>
            <Sales 
                products={topSellingProducts?.topProducts} 
                // categoryNavigation={categoryNavigation}
            />
            <OrdersTable
                orders={orders?.sort((a: IOrder, b: IOrder) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 10) ?? null}
                selectedOrders={[]}
                searchValue=''
                page="recent orders"
                categoryNavigation={[]}
            />
        </section>
  );
};

export default AdminDashboard;