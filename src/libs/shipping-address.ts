'use server';
import ENDPOINTS from '@/config/ENDPOINTS';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default async function getAdminShippingAddress() {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.ADMIN_SHIPPING_ADDRESS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

    cache: 'no-store',
  });

  const res = await apiRes.json();

  if (!res.status) throw new Error('Failed to fetch admin shipping address.');

  return res.data;
}