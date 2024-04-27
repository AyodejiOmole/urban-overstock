'use client';
import Button from '@/components/Global/Button';
import AuthLayout from '@/layouts/AuthLayout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import tick from '../../../../public/assets/icons/tick.png';

export default function AdminLogout() {
  return (
    <AuthLayout>
      <div className='w-full max-w-md mx-auto'>
        <Image src={tick} alt='Tick Icon' className='block w-40 mb-4 mx-auto' />
        <p className='font-bold text-4xl mb-8 text-center'>Logout Successful</p>

        <Link href='/auth/admin/login'>
          <Button block>Login</Button>
        </Link>
      </div>
    </AuthLayout>
  );
}
