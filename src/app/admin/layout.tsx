'use client';

import React, { useState, useEffect, useRef, useContext } from 'react';
import { Tooltip } from 'primereact/tooltip';

import { NotificationContext } from '@/context/NotificationContext';
import { ReturnRequestContext } from '@/context/ReturnRequestContext';
import { OrdersContext } from '@/context/OrdersContext';
import Header from '@/components/Admin/Header';
import AdminSidebar from '@/components/Admin/Sidebar';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const [dropDown, setDropDown] = useState<boolean>(false);

  const logOutRef = useRef<HTMLDivElement>(null);

  const { unreadNotifications } = useContext(NotificationContext) ?? {
    unreadNotifications: 0,
  };

  const { unreadReturnRequests } = useContext(ReturnRequestContext) ?? {
    unreadReturnRequests : null
  };

  const { unreadOrders } = useContext(OrdersContext) ?? {
    unreadOrders : null
  }

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      if (!logOutRef.current?.contains(event.target as Node) && logOutRef.current !== event.target) {
        setDropDown(false);
      }
    });
    return () => {
      document.body.removeEventListener('click', () => {});
    };
  }, []);

  const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
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

          <Header 
            isOpen={sidebarOpen} 
            dropDown={dropDown} 
            setDropDown={setDropDown} 
            toggleSidebar={handleToggleSidebar} 
            unreadNotifications={unreadNotifications}
            logOutRef={logOutRef}
          />
          
            {/* <Component {...pageProps} /> */}
            {children}
        </div>
        <Tooltip target=".uo-tool-tip" />
      </div>
  );
};

