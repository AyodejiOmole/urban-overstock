"use client";
import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

import ENDPOINTS from "@/config/ENDPOINTS";
import { IOrder } from "@/interfaces/orders";

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
        .then(data => {
          console.log(data);

          // const orders = data.data;
          // orders.sort((a: IOrder, b: IOrder) => new Date(a.createdAt) > new Date(b.createdAt));

          // const latestOrder = new Date(orders[0].createdAt);
          // console.log(JSON.parse(localStorage.getItem("latest-order") ?? "").createdAt);
          // const storedLatestOrders = new Date(JSON.parse(localStorage.getItem("latest-order") ?? "0")?.order.createdAt);

          // if(data.data.some((order: IOrder) => new Date(order.createdAt) > storedLatestOrders)) {
          //   const newestOrders = data.data.filter((a: IOrder) => new Date(a.createdAt) >= storedLatestOrders);
          //   console.log(newestOrders);

          //   setUnreadOrders(newestOrders);

          //   localStorage.setItem("latest-order", JSON.stringify({
          //     order: orders[0],
          //     viewed: false,
          //   }));
          // } else {
          //   setUnreadOrders([]);
          // }
          setUnreadOrders(data.data)
        });
      }, []);

    return (
        <OrdersContext.Provider value={{ unreadOrders, setUnreadOrders}}>
            {children}
        </OrdersContext.Provider>
    );
}

export default OrdersProvider;