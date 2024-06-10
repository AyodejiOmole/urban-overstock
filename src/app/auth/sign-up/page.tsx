'use client';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import { API_RESPONSES } from '@/config/API_RESPONSES';
import ENDPOINTS from '@/config/ENDPOINTS';
import AuthLayout from '@/layouts/AuthLayout';
import storeCookies from '@/libs/cookies';
import { tokenExpiryTime } from '@/libs/otp';
import HTTPService from '@/services/http';
import { validatePasswordStrength } from '@/utils';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdPerson } from 'react-icons/io';
import { IoEye, IoEyeOff, IoMailSharp } from 'react-icons/io5';
import Cookies from 'universal-cookie';
import * as Yup from 'yup';

export default function AdminSignup() {
  const cookies = new Cookies();
  const httpService = new HTTPService();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { replace } = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required().label('First Name'),
      lastName: Yup.string().required().label('Last Name'),
      email: Yup.string().email().required().label('Email'),
      password: Yup.string().min(8).required().label('Password'),
      confirmPassword: Yup.string().min(8).required().label('Confirm Password'),
    }),
    onSubmit: async (values) => {
      const { password, confirmPassword } = values;

      const passwordsMatch = password === confirmPassword;
      const passwordStrong = validatePasswordStrength(password);

      if (!passwordsMatch) toast.error(`Passwords don't match`);
      else {
        if (!passwordStrong)
          toast.error(
            `Password must contain at least one uppercase character, symbol and number`
          );
        else {
          const data = {
            ...values,
            userType: 'ADMIN',
          };

          const res = await httpService.post(ENDPOINTS.SIGN_UP, data);
          console.log(res);

          if (res.error) toast.error(API_RESPONSES.SIGN_UP[res.statusCode]);
          else if (res.data && !res.error) {
            toast.success(
              API_RESPONSES.SIGN_UP[res.statusCode] ||
                API_RESPONSES.SIGN_UP[res.status]
            );

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
              replace('/auth/verify-email?role=seller');
            }, 1000);
          }
        }
      }
    },

    validateOnChange: true,
  });

  return (
    <AuthLayout
      pageName='Signup'
      greetingText='Register Here'
      altPage='Log In'
      altPageText='Already have an account?'
      altPageUrl='/auth/admin/login'
    >
      <form onSubmit={formik.handleSubmit} className='w-full max-w-md mx-auto'>
        <div className='my-6'>
          <label htmlFor='firstName' className='mb-2'>
            First Name
          </label>
          <TextInput
            onChange={formik.handleChange}
            placeholder='Enter your First name'
            type='text'
            id='firstName'
            rightIcon={<IoMdPerson />}
            rounded
            value={formik.values.firstName}
            error={formik.errors.firstName}
          />
        </div>
        {/*  */}
        <div className='my-6'>
          <label htmlFor='lastName' className='mb-2'>
            Last Name
          </label>
          <TextInput
            placeholder='Enter your Last name'
            type='text'
            id='lastName'
            rightIcon={<IoMdPerson />}
            rounded
            onChange={formik.handleChange}
            value={formik.values.lastName}
            error={formik.errors.lastName}
          />
        </div>
        {/*  */}
        <div className='my-6'>
          <label htmlFor='email' className='mb-2'>
            Email
          </label>
          <TextInput
            placeholder='Enter your email'
            type='email'
            id='email'
            rightIcon={<IoMailSharp />}
            rounded
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
        </div>
        {/*  */}
        <div className='my-6'>
          <label htmlFor='password' className='mb-2'>
            Password
          </label>
          <TextInput
            placeholder='* * * * * *'
            type={showPassword ? 'text' : 'password'}
            id='password'
            rightIcon={showPassword ? <IoEye /> : <IoEyeOff />}
            rightIconClick={() => setShowPassword((prev) => !prev)}
            rounded
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
        </div>
        {/*  */}
        <div className='my-6'>
          <label htmlFor='confirmPassword' className='mb-2'>
            Confirm Password
          </label>
          <TextInput
            placeholder='* * * * * *'
            type={showPassword2 ? 'text' : 'password'}
            id='confirmPassword'
            rightIcon={showPassword2 ? <IoEye /> : <IoEyeOff />}
            rightIconClick={() => setShowPassword2((prev) => !prev)}
            rounded
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            error={formik.errors.confirmPassword}
          />
        </div>
        <Button block rounded type='submit' loading={formik.isSubmitting}>
          Sign Up
        </Button>
      </form>
    </AuthLayout>
  );
}
