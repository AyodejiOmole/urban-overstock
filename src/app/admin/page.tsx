'use client';

import Header from '@/components/Admin/Dashboard/Header';
import OrdersTable from '@/components/Admin/Orders/OrdersTable';
import SalesChart from '@/components/Admin/SalesChart';
import StatCards from '@/components/Admin/StatCards';
import React from 'react';
import Sales from '@/components/Admin/Sales';
import AdminPage from '@/components/Admin/Dashboard/AdminPage';
// import { useQuery } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'universal-cookie';
import ENDPOINTS from '@/config/ENDPOINTS';
// import { IDashboardData } from '@/interfaces/dashboard-data';
import { IDashboardData } from '@/components/Admin/Dashboard/AdminPage';
import { ITopSellingProducts } from '@/interfaces/top-selling-products';
import { IOrder } from '@/interfaces/orders';
import { IGraphDetails } from '@/interfaces/graph';

const fetchTopChart = async (type: string, token: string, baseUrl: string): Promise<{ data: IDashboardData | null }> => {
  const response = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.DASHBOARD_TOP_CHART}?type=${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Failed to fetch dashboard details!');
  return response.json();
};

const fetchTopProductsAndUsers = async (token: string, baseUrl: string): Promise<{ data: ITopSellingProducts | undefined  }> => {
  const response = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.DASHBOARD_TOP_SELLERS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Failed to fetch top selling products!');
  return response.json();
};

const fetchDashboardGraph = async (token: string, baseUrl: string): Promise<{ data: IGraphDetails | null }> => {
  const response = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.DASHBOARD_GRAPH}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Failed to fetch dashboard graph!');
  return response.json();
};

const fetchOrders = async (token: string, baseUrl: string): Promise<{ data: IOrder[] | null }> => {
  const response = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.ORDERS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('Failed to fetch orders!');
  return response.json();
};

const AdminDashboard = () => {
  const cookies = new Cookies();
  const token = cookies.get('urban-token');
  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;
  const timeFilter = '30-Days';

//   const {
//     data: dashboardData,
//     isLoading: loadingDashboardData,
//     error: dashboardDataError
//   } = useQuery({ queryKey: ['dashboardData', timeFilter], queryFn: () => fetchTopChart(timeFilter, token, baseUrl!) });

//   const {
//     data: topSellingProducts,
//     isLoading: loadingTopSellingProducts,
//     error: topSellingProductsError
//   } = useQuery({queryKey: ['topSellingProducts'], queryFn: () => fetchTopProductsAndUsers(token, baseUrl!)});

//   const {
//     data: graph,
//     isLoading: loadingGraph,
//     error: graphError
//   } = useQuery({ queryKey: ['graph'], queryFn: () => fetchDashboardGraph(token, baseUrl!)});

//   const {
//     data: orders,
//     isLoading: loadingOrders,
//     error: ordersError
//   } = useQuery({ queryKey: ['orders'], queryFn: () => fetchOrders(token, baseUrl!)});

//   if (loadingDashboardData || loadingTopSellingProducts || loadingGraph || loadingOrders) {
//     return <div>Loading...</div>;
//   }

//   if (dashboardDataError || topSellingProductsError || graphError || ordersError) {
//     return <div>Error loading data</div>;
//   }

  return (
    <section>
      <AdminPage
        // dashboardData={dashboardData!.data}
        // graph={graph!.data}
        // topSellingProducts={topSellingProducts!.data}
        // setTimeFilter={() => {}}
        // orders={orders!.data}
      />
    </section>
  );
};

export default AdminDashboard;
