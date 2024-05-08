'use server';
import ENDPOINTS from '@/config/ENDPOINTS';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default async function getAllProducts() {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.PRODUCTS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

    // cache: 'no-store',
    // next: {
    //   revalidate: 10,
    // },
  });

  console.log(apiRes);

  const res = await apiRes.json();

  console.log(res);

  if (!res.status) throw new Error('Failed to fetch products');

  return res.data;
}
