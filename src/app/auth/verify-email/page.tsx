'use client';
import Button from '@/components/Global/Button';
import AutoAdvancingInput from '@/components/Shared/AutoAdvancingInput';
import ENDPOINTS from '@/config/ENDPOINTS';
import AuthLayout from '@/layouts/AuthLayout';
import storeCookies from '@/libs/cookies';
import { tokenExpiryTime } from '@/libs/otp';
import HTTPService from '@/services/http';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';

export default function VerifyEmail() {
  const cookies = new Cookies();
  const httpService = new HTTPService();
  const [otpValue, setOptValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState('');

  const params = useSearchParams();
  const { replace } = useRouter();

  useEffect(() => {
    const role = params.get('role');

    if (!role) redirect('/');
    else setUserRole(role);
  }, [params]);

  const handleOtpValueChange = (value: string) => {
    setOptValue(value);
  };

  async function verifyOtp() {
    if (otpValue) {
      setIsLoading(true);

      const email = cookies.get('urban-email');
      const secretReference = cookies.get('urban-secret-reference');

      try {
        setIsLoading(true);

        const res = await httpService.post(ENDPOINTS.CONFIRM_EMAIL_OTP, {
          token: otpValue.trim(),
          email,
          secretReference,
        });

        if (res.error) toast.error(res.error);
        if (res.data) {
          toast.success('OTP Verified Successfully');

          storeCookies([{ key: 'urban-token', value: res.data.token }]);

          setTimeout(() => {
            replace(`/${userRole}`);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
        throw new Error('Invalid or expired token');
      }
      setIsLoading(false);
    } else toast.error('Invalid OTP. Clear all fields and try again.');
  }

  const resendOtp = async () => {
    const email = cookies.get('urban-email');
    if (email)
      try {
        toast.loading('Loading...');
        const res = await httpService.post(ENDPOINTS.RESEND_OTP, { email });

        console.log(res);

        toast.dismiss();

        if (res.status === 200) {
          cookies.remove('urban-secret-reference');
          cookies.set('urban-secret-reference', res.data.secretReference, {
            path: '/',
            expires: tokenExpiryTime,
          });

          toast.success('OTP successfully sent');
        }
      } catch (error) {
        console.log(error);
        throw new Error('Invalid User');
      }
    else
      toast.error(
        'Cannot resend OTP at the moment. Please contact customer support'
      );
  };

  return (
    <AuthLayout
      pageName='Enter Code'
      greetingText='Verification Sent'
      altPage='verify-email'
      altPageText='Didn`t get the code?'
      altPageUrl=''
    >
      <div className='w-full max-w-lg mx-auto'>
        <p className='text-center font-light mb-8 text-lg'>
          Please, enter the verification code sent to your email address.
        </p>

        <AutoAdvancingInput
          numberOfBoxes={4}
          onInputChange={handleOtpValueChange}
        />
        <div className='flex items-center justify-center p-4 mb-6 text-sm mt-4'>
          <span>Didn`t get the code?</span>
          <button
            type='button'
            className='px-2 text-primary-2 font-medium'
            onClick={resendOtp}
          >
            Resend
          </button>
        </div>

        <Button block rounded onClick={verifyOtp} loading={isLoading}>
          Send
        </Button>
      </div>
    </AuthLayout>
  );
}
