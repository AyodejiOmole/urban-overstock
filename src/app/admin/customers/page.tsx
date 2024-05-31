import Customers from '@/components/Admin/Customers/Customers';
import Button from '@/components/Global/Button';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { PiExportBold } from 'react-icons/pi';
import getAllCustomers from '@/libs/customers';
import { ICustomer, ICustomers } from '@/interfaces/customers';

export default async function AdminCustomers() {
  const apiRes: Promise<ICustomers | undefined> = getAllCustomers();
  const customers = await apiRes;

  console.log(customers);

  return (
    <section>
      

      {/* Categories Table */}
      <Customers 
        // customers={customers}
        customers={customers?.sort((a: ICustomer, b: ICustomer) => Date.parse(b.createdAt) - Date.parse(a.createdAt))}
      />
    </section>
  );
}
