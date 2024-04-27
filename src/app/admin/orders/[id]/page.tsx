'use client';
import Button from '@/components/Global/Button';
import ENDPOINTS from '@/config/ENDPOINTS';
import { IOrder } from '@/interfaces/orders';
import { useParams } from 'next/navigation';

import React, { useEffect, useMemo, useState } from 'react';
import { PiExportBold } from 'react-icons/pi';
import { TbFileInvoice } from 'react-icons/tb';
import Cookies from 'universal-cookie';
import OrderDetailsLoader from './components/Loader';
import OrderDetails from './components/OrderDetails';

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<IOrder | null>(null);
  const [customerData, setCustomerData] = useState();

  const cookies = useMemo(() => {
    return new Cookies();
  }, []);

  useEffect(() => {
    async function getOrderDetails() {
      if (params.id) {
        try {
          setLoading(true);
          const token = cookies.get('urban-token');

          const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

          const apiRes = await fetch(
            `${baseUrl}/api/v1/${ENDPOINTS.ORDERS}/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },

              next: {
                revalidate: 10,
              },
            }
          );

          const res = await apiRes.json();

          if (res.data) {
            setOrderData(res.data as IOrder);
          }

          console.log(res);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
    }

    getOrderDetails();
  }, [params.id, cookies]);

  return (
    <>
      {loading && <OrderDetailsLoader />}
      <section>
        <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-4 py-4'>
          <p className='text-xl font-medium text-gray-700'>Order Details</p>
          <div className='flex items-center gap-4'>
            <div className='py-3.5 px-6 rounded-xl border border-gray-200 bg-white text-sm text-gray-600'>
              {orderData?.status}
            </div>
            <Button variant='outlined' color='dark'>
              <PiExportBold />
              Export
            </Button>
            <Button>
              <TbFileInvoice />
              Invoice
            </Button>
          </div>
        </div>
        {/* Order Details */}
        <OrderDetails order={orderData} />
      </section>
    </>
  );
}

//  export async function getStaticParams
