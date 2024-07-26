"use client";
import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

import ENDPOINTS from "@/config/ENDPOINTS";

interface IOrdersContext {
    unreadOrders: any,
    setUnreadOrders: React.Dispatch<any>,
}

export const OrdersContext = createContext<IOrdersContext | null>(null);

const OrdersProvider = ({ children }: { children: React.ReactNode}) => {

    const [unreadOrders, setUnreadOrders] = useState<any>();

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
      }, []);

    return (
        <OrdersContext.Provider value={{ unreadOrders, setUnreadOrders}}>
            {children}
        </OrdersContext.Provider>
    );
}

export default OrdersProvider;