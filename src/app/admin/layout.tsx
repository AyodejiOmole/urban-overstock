'use client';
import Header from '@/components/Admin/Header';
import AdminSidebar from '@/components/Admin/Sidebar';
import React, { useState, useEffect } from 'react';
import ENDPOINTS from '@/config/ENDPOINTS';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import Cookies from 'universal-cookie';
import { Tooltip } from 'primereact/tooltip';
import { IOrder } from '@/interfaces/orders';
import getOrders from '@/libs/orders';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [unreadNotifications, setUnreadNotifications] = useState<any>();

  const [unreadOrders, setUnreadOrders] = useState<any>();
  const queryClient = new QueryClient();

  const [unreadReturnRequests, setUnreadReturnRequests] = useState<any>();

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('urban-token');

    const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;
  
    fetch(`${baseUrl}/api/v1/${ENDPOINTS.NOTIFICATIONS}/count-unread`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  
      cache: 'no-store',
    })
    .then(response => response.json())
    .then(data => setUnreadNotifications(data));
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('urban-token');

    const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;
  
    fetch(`${baseUrl}/api/v1/${ENDPOINTS.ORDERS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  
      cache: 'no-store',
    })
    .then(response => response.json())
    .then(data => setUnreadOrders(data));
    
  }, [])

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('urban-token');

    const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;
  
    fetch(`${baseUrl}/api/v1/${ENDPOINTS.RETURN_REQUEST}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  
      cache: 'no-store',
    })
    .then(response => response.json())
    .then(data => setUnreadReturnRequests(data));
    
  }, [])

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='grid grid-cols-12 bg-gray-50 relative min-h-screen'>
        <div
          className={`bg-white duration-500 transition-all border-r-[1px] border-r-gray-50 w-0 h-0 ${
            sidebarOpen ? 'lg:col-span-2' : 'lg:col-span-1'
          } `}
        >
          
          <AdminSidebar
            isOpen={sidebarOpen}
            toggleSidebar={handleToggleSidebar}
            setSidebarOpen={setSidebarOpen}
            notifications={unreadNotifications}
            orders={unreadOrders}
            returnRequests={unreadReturnRequests}
          />
        </div>
        <div
          className={`duration-500 bg-gray-100 col-span-12 py-24 min-h-screen p-4 md:px-8 xl:px-16 ${
            sidebarOpen ? 'lg:col-span-10' : 'lg:col-span-11'
          }`}
        >

          <Header isOpen={sidebarOpen} toggleSidebar={handleToggleSidebar} unreadNotifications={unreadNotifications}/>
          
            {/* <Component {...pageProps} /> */}
            {children}
          {/* </QueryClientProvider> */}
        </div>
        <Tooltip target=".uo-tool-tip" />
      </div>
    </QueryClientProvider>
  );
};

