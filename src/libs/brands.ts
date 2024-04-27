'use server';
import ENDPOINTS from '@/config/ENDPOINTS';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default async function getAllBrands() {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.BRAND_SETTINGS}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },

    // cache: 'no-store',
    next: {
      revalidate: 10,
    },
  });

  const res = await apiRes.json();

  if (!res.status) throw new Error('Failed to fetch brands');

  return res.data;
}
