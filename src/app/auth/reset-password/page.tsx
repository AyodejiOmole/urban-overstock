'use client';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import AuthLayout from '@/layouts/AuthLayout';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsKeyFill } from 'react-icons/bs';

export default function AdminResetPassword() {
  const { replace } = useRouter();

  const handleResetPassword = () => replace('/auth/admin/reset-successful');

  return (
    <AuthLayout
      pageName='Reset Password'
      greetingText='Reset Password'
      altPage='Log In'
      altPageText='Back To'
      altPageUrl='/auth/admin/login'
    >
      <form action='' className='w-full max-w-md mx-auto'>
        <div className='my-6'>
          <label htmlFor='newPassword' className='mb-2'>
            Password
          </label>
          <TextInput
            onChange={() => {}}
            placeholder='Enter new password'
            type='password'
            id='newPassword'
            rightIcon={<BsKeyFill className='rotate-180' />}
            rounded
          />
        </div>
        {/*  */}
        <div className='my-6'>
          <label htmlFor='confirmPassword' className='mb-2'>
            Confirm Password
          </label>
          <TextInput
            onChange={() => {}}
            placeholder='Confirm password'
            type='password'
            id='confirmPassword'
            rightIcon={<BsKeyFill className='rotate-180' />}
            rounded
          />
        </div>
        {/*  */}

        <Button block onClick={handleResetPassword}>
          Reset Password
        </Button>
      </form>
    </AuthLayout>
  );
}
