'use server';
import ENDPOINTS from '@/config/ENDPOINTS';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default async function getOrders() {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.ORDERS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

    cache: 'no-store',
    cache: 'no-store',
    // next: {
    //   revalidate: 10,
    // },
  });

  const res = await apiRes.json();

  if (!res.status) throw new Error('Failed to fetch orders');

  return res.data;
}

export async function getSingleOrder(orderId: string) {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.ORDERS}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

    // cache: 'no-store',
    // next: {
    //   revalidate: 10,
    // },
  });

  const res = await apiRes.json();

  if (!res.status) throw new Error('Failed to fetch orders');

  return res.data;
}

export async function getCancelledOrders() {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.ORDERS}/cancel-request`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

    cache: 'no-store',
    // next: {
    //   revalidate: 10,
    // },
  });

  const res = await apiRes.json();

  if (!res.status) throw new Error('Failed to fetch cancelled orders');

  return res.data;
}

export async function getSingleCancelRequest(orderId: string) {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.CANCEL_REQUEST}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

    cache: 'no-store',
    // next: {
    //   revalidate: 10,
    // },
  });

  const res = await apiRes.json();

  if (!res.status) throw new Error('Failed to fetch cancel request.');

  return res.data;
}
