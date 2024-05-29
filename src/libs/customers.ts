'use server';
import ENDPOINTS from '@/config/ENDPOINTS';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default async function getAllCustomers() {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;
//   {{URL}}/api/v1/user/customer?size=10&page=0

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.CUSTOMERS}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

    // cache: 'no-store',
  });

  const res = await apiRes.json();

  if (!res.status) {
    throw new Error('Failed to fetch customers')
  };

  return res.data;
}

export async function getSingleCustomerOrderHistory(customerId: number) {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;
//   {{URL}}/api/v1/user/customer?size=10&page=0

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.USER_ORDER_HISTORY}/${customerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

    cache: 'no-store',
  });

  const res = await apiRes.json();

  if (!res.status) {
    throw new Error('Failed to fetch customer order history')
  };

  return res.data;
}

export async function getSingleCustomer(customerId: string) {
  const token = getCookie('urban-token', { cookies });

  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL;

  const apiRes = await fetch(`${baseUrl}/api/v1/${ENDPOINTS.CUSTOMERS}/${customerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, max-age=0',
    },

    cache: 'no-store',
  });

  const res = await apiRes.json();

  if (!res.status) {
    throw new Error('Failed to fetch customer details!')
    // console.log(res);
  };

  return res.data;
}
