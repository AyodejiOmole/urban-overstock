'use server';
import ENDPOINTS from '@/config/ENDPOINTS';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default async function getTopChart() {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.DASHBOARD_TOP_CHART}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

<<<<<<< HEAD
    // cache: 'no-store',
=======
    cache: 'no-store',
>>>>>>> master
    // next: {
    //   revalidate: 10,
    // },
  });

  console.log(apiRes);

  const res = await apiRes.json();

  console.log(res);

  if (!res.status) throw new Error('Failed to fetch dashboard details!');

  return res.data;
}

export async function getTopProductsAndUsers() {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.DASHBOARD_TOP_SELLERS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

<<<<<<< HEAD
    // cache: 'no-store',
=======
    cache: 'no-store',
>>>>>>> master
    // next: {
    //   revalidate: 10,
    // },
  });

  console.log(apiRes);

  const res = await apiRes.json();

  console.log(res);

  if (!res.status) throw new Error('Failed to fetch product.');

  return res.data;
}
<<<<<<< HEAD
=======

export async function getDashboardGraph() {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.DASHBOARD_GRAPH}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

    cache: 'no-store',
    // next: {
    //   revalidate: 10,
    // },
  });

  console.log(apiRes);

  const res = await apiRes.json();

  console.log(res);

  if (!res.status) throw new Error('Failed to fetch graph details.');

  return res.data;
}
>>>>>>> master
