
// import Header from '@/components/Admin/Dashboard/Header';
// import OrdersTable from '@/components/Admin/Orders/OrdersTable';
// import SalesChart from '@/components/Admin/SalesChart';
// import StatCards from '@/components/Admin/StatCards';
import React from 'react';
import AdminPage from '@/components/Admin/Dashboard/AdminPage';
import { IDashboardData } from '@/components/Admin/Dashboard/AdminPage';
import { ITopSellingProducts } from '@/interfaces/top-selling-products';
import { IOrder } from '@/interfaces/orders';
import { IGraphDetails } from '@/interfaces/graph';
import getTopChart from '@/libs/dashboard';
import { getTopProductsAndUsers } from '@/libs/dashboard';
import getOrders from '@/libs/orders';
import { getDashboardGraph } from '@/libs/dashboard';

const AdminDashboard = async () => {
  const timeFilter = '30-Days';

  const apiTopChart: Promise<IDashboardData | null> = getTopChart(timeFilter);
  const dashboardData = await apiTopChart;

  const topSellingProductsApiRes: Promise<ITopSellingProducts | undefined> = getTopProductsAndUsers();
  const topSellingProducts = await topSellingProductsApiRes;

  const apiRes: Promise<IOrder[] | null> = getOrders();
  const orders = await apiRes;

  const apiResGraph: Promise<IGraphDetails | null> = getDashboardGraph();
  const graph = await apiResGraph;

  console.log(orders);
  console.log("dashd", dashboardData)

  return (
    <section>
      <AdminPage
        dashboardData={dashboardData}
        graph={graph}
        topSellingProducts={topSellingProducts}
        orders={orders}
      />
    </section>
  );
};

export default AdminDashboard;
