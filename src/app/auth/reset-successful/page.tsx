'use client';
import Button from '@/components/Global/Button';
import AuthLayout from '@/layouts/AuthLayout';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import tick from '../../../../public/assets/icons/tick.png';

export default function AdminResetSuccessful() {
  return (
    <AuthLayout>
      <div className='w-full max-w-md mx-auto'>
        <Image src={tick} alt='Tick Icon' className='block w-40 mb-4 mx-auto' />
        <p className='font-bold text-4xl mb-8 text-center'>Reset Successful</p>
        <p className='text-lg text-neutral text-center max-w-sm mx-auto mb-8'>
          Your password has been updated successfully
        </p>

        <Link href='/auth/admin/login'>
          <Button block>Continue to Login</Button>
        </Link>
      </div>
    </AuthLayout>
  );
}
