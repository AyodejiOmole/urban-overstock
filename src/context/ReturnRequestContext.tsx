"use client";
import { createContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

import ENDPOINTS from "@/config/ENDPOINTS";
import { IReturnRequest } from "@/interfaces/return-requests";

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
        .then(data => {
          console.log(data);
          // const returnRequests = data.data;
          // returnRequests.sort((a: IReturnRequest, b: IReturnRequest) => {
          //   return new Date(a.createdAt) > new Date(b.createdAt)
          // });

          // console.log(returnRequests[0]);

          // const latestReturnRequest = new Date(returnRequests[0].createdAt);
          // const storedLatestReturnRequest = new Date(JSON.parse(localStorage.getItem("latest-return-request") ?? "")?.returnRequest.createdAt);

          // if(latestReturnRequest > storedLatestReturnRequest) {
          //   localStorage.setItem("latest-return-request", JSON.stringify({
          //     returnRequest: returnRequests[0],
          //     viewed: false,
          //   }));
            
          //   setUnreadReturnRequests(data.data.map((request: IReturnRequest) => new Date(request.createdAt) > storedLatestReturnRequest))
          // } else {
          //   setUnreadReturnRequests([]);
          // }

          setUnreadReturnRequests(data.data);
        });
        
      }, []);

    return (
        <ReturnRequestContext.Provider value={{ unreadReturnRequests, setUnreadReturnRequests }}>
            {children}
        </ReturnRequestContext.Provider>
    )
};

export default ReturnRequestProvider;