import React from 'react';
import { IAdminShippingAddress } from '@/interfaces/shipping-address';
import getAdminShippingAddress from '@/libs/shipping-address';
import Setting from '@/components/Admin/Settings/Settings';

export default async function Settings () {
    const apiRes: Promise<IAdminShippingAddress | null> = getAdminShippingAddress();
    const adminShippingAddress = await apiRes;

    return (
        <div>
            {/* <SettingsForm adminShippingAddress={adminShippingAddress}/> */}
            <Setting adminShippingAddress={adminShippingAddress}/>
        </div>
    )
};