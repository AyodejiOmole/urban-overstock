import React from 'react';
import SettingsForm from '@/components/Admin/Settings/SettingsForm';
import { IAdminShippingAddress } from '@/interfaces/shipping-address';
import getAdminShippingAddress from '@/libs/shipping-address';

const Settings = async () => {
    const apiRes: Promise<IAdminShippingAddress | null> = getAdminShippingAddress();
    const adminShippingAddress = await apiRes;

    return (
        <div>
            <SettingsForm adminShippingAddress={adminShippingAddress}/>
        </div>
    )
}

export default Settings;