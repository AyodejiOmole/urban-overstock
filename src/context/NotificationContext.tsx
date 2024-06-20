'use client';
import { createContext, useState, useEffect } from "react";
import React from 'react'
import Cookies from "universal-cookie";

import ENDPOINTS from "@/config/ENDPOINTS";

interface NotificationContextType {
    unreadNotifications: number;
    setUnreadNotifications:  React.Dispatch<React.SetStateAction<number>>;
}

export const NotificationContext = createContext<NotificationContextType | null>(null);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [unreadNotifications, setUnreadNotifications] = useState<number>(0);

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
        .then(data => setUnreadNotifications(data.data.count));
    }, []);

    return (
        <NotificationContext.Provider value={{ unreadNotifications, setUnreadNotifications }}>
          {children}
        </NotificationContext.Provider>
    );
}

export default NotificationProvider;