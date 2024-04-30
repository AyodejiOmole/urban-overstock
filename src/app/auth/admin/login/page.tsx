'use client';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import { API_RESPONSES } from '@/config/API_RESPONSES';
import ENDPOINTS from '@/config/ENDPOINTS';
import AuthLayout from '@/layouts/AuthLayout';
import storeCookies from '@/libs/cookies';

import HTTPService from '@/services/http';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoEye, IoEyeOff, IoMailSharp } from 'react-icons/io5';

import * as Yup from 'yup';

export default function AdminLogin() {
  const httpService = new HTTPService();

  const { replace, push } = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required().label('Email'),
      password: Yup.string().required().label('Password'),
    }),
    onSubmit: async (values) => {
      const res = await httpService.post(ENDPOINTS.SIGN_IN, values);
      console.log(res);

      if (res.error) toast.error(API_RESPONSES.SIGN_IN[res.statusCode]);
      else {

        
        if (res.status === 200 && res.data.userType === "ADMIN") {
          toast.success(
            API_RESPONSES.SIGN_IN[res.statusCode] ||
              API_RESPONSES.SIGN_IN[res.status]
          );

          storeCookies([
            {
              key: 'urban-token',
              value: res.data.token,
            },
          ]);

          localStorage.setItem('urban-admin', JSON.stringify(res.data));
          replace('/admin');
        } else {
          toast.error("You are not allowed to login as an admin!");
        }

        if (res.statusCode === 203) {
          storeCookies([
            {
              key: 'urban-email',
              value: res.data.email,
            },

            {
              key: 'urban-secret-reference',
              value: res.data.secretReference,
            },
          ]);

          setTimeout(() => {
            push('/auth/verify-email?role=admin');
          }, 1000);
        }
      }
    },

    validateOnChange: true,
  });

  return (
    <AuthLayout
      pageName='Login'
      greetingText='Welcome Back'
      altPage=''
      altPageText=''
      altPageUrl=''
    >
      <form
        action=''
        className='w-full max-w-md mx-auto'
        onSubmit={formik.handleSubmit}
      >
        <div className='my-6'>
          <label htmlFor='email' className='mb-2'>
            Email
          </label>
          <TextInput
            onChange={formik.handleChange}
            placeholder='Enter your email'
            type='email'
            id='email'
            rightIcon={<IoMailSharp />}
            rounded
            value={formik.errors.password}
            error={formik.errors.email}
          />
        </div>
        {/*  */}
        <div className='my-6'>
          <label htmlFor='password' className='mb-2'>
            Password
          </label>
          <TextInput
            onChange={formik.handleChange}
            placeholder='* * * * * *'
            type={showPassword ? 'text' : 'password'}
            id='password'
            rightIcon={showPassword ? <IoEyeOff /> : <IoEye />}
            rightIconClick={() => setShowPassword((prev) => !prev)}
            rounded
            value={formik.values.password}
            error={formik.errors.password}
          />
        </div>

        <div className='flex items-center justify-end mb-6'>
          <Link
            href='/auth/reset-password'
            className='font-semibold text-primary'
          >
            Forgot Password?
          </Link>
        </div>

        <Button block rounded loading={formik.isSubmitting} type='submit'>
          Log In
        </Button>
      </form>
    </AuthLayout>
  );
}
