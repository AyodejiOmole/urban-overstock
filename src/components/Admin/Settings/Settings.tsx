'use client';
import { IAdminShippingAddress } from '@/interfaces/shipping-address';
import React from 'react'
import SettingsForm from './SettingsForm';
import Pagination from '@/components/Shared/Pagination';
// import { useState, useEffect } from 'react';
// import Cookies from 'universal-cookie';
// import ENDPOINTS from '@/config/ENDPOINTS';

const Setting = ({
    adminShippingAddress,
}: {
    adminShippingAddress: IAdminShippingAddress | null;
}) => {

    // const [retrievedShippingAddress, setRetrievedShippingAddress] = useState<IAdminShippingAddress | null>(null);

    // useEffect(() => {
    //     const fetchData = () => {
    //         const cookies = new Cookies();
    //         const token = cookies.get('urban-token');
    //         console.log(token);
    //         const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

    //         fetch(`${baseUrl}/api/v1/${ENDPOINTS.ADMIN_SHIPPING_ADDRESS}`, {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //               'Cache-Control': 'no-cache, max-age=0',
    //             },
            
    //             cache: 'no-store',
    //         }).then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         }).then(data => {
    //             if (data.data) {
    //                 console.log(data.data);
    //                 setRetrievedShippingAddress(data.data);
    //             }
    //         }).catch(error => {
    //             // toast.error(error);
    //             console.error('There was a problem with the fetch operation:', error);
    //         });
    //     };

    //     fetchData();
    // }, []);

    return (
        <div className='w-full justify-between lg:items-center gap-8 mb-4 py-4'>
            <div>
                <p className='text-xl font-medium text-gray-700'>Settings</p>
                <Pagination /> 
            </div>

            <SettingsForm adminShippingAddress={adminShippingAddress}/>
        </div>
    )
}

export default Setting;