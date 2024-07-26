"use client";
import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

import ENDPOINTS from "@/config/ENDPOINTS";

type ReturnRequestCotextType = {
    unreadReturnRequests: any;
    setUnreadReturnRequests: React.Dispatch<any>;
}

export const ReturnRequestContext = createContext<ReturnRequestCotextType | null>(null);

const ReturnRequestProvider = ({ children }: { children: React.ReactNode }) => {
    const [unreadReturnRequests, setUnreadReturnRequests] = useState<any>();

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
        
      }, []);

    return (
        <ReturnRequestContext.Provider value={{ unreadReturnRequests, setUnreadReturnRequests }}>
            {children}
        </ReturnRequestContext.Provider>
    )

}

export default ReturnRequestProvider;