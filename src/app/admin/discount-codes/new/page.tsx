"use client";
import DiscountCodesTable from '@/components/Admin/DiscountCodes/DiscountCodesTable';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import Card from '@/components/Shared/Card';
import React from 'react';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ENDPOINTS from '@/config/ENDPOINTS';
import HTTPService from '@/services/http';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/Shared/Pagination';

function CustomError({ error }: { error?: string }) {
    if (!error) return;
  
    return (
      <div className='text-xs font-light mt-1 ml-1 p-2'>
        <span className='text-red-600'>
          {error === "Percentage must be greater than or equal to 1" ? "Percentage field is required!": error}
        </span>
      </div>
    );
  }

export default function AddDiscountCodeDetails() {
    const cookies = new Cookies();
    const httpService = new HTTPService();

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
          code: "",
          percentage: undefined,
        },
        validationSchema: Yup.object({
          code: Yup.string().required().label('Code'),
          percentage: Yup.number().min(1).required().label('Percentage'),
        }),
        onSubmit: async (values) => {
          const token = cookies.get('urban-token');
        
            const apiRes = await httpService.post(
              ENDPOINTS.DISCOUNT_CODE,
              {
                code: values.code,
                percentage: values.percentage,
              },
              `Bearer ${token}`
            );
    
            if (apiRes.data) {
              toast.success('Discount code added successfully.');
    
              setTimeout(() => {
                router.push('/admin/discount-codes');
                // router.back();
              }, 1000);
            } else {
              toast.error(apiRes.message);
            }
            console.log(apiRes);
        },
        validateOnChange: true,
    });

    return (
        <section>
        <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 my-8'>
            <div>
                <p className='text-xl font-medium text-gray-700'>Discount Code</p>
                <Pagination/>
            </div>
        </div>
        <Card>
            <div className='p-4'>
            <div className='flex items-center justify-end gap-4 mb-8'>
                {/* <Button variant='outlined' size='small'>
                Deactivate
                </Button> */}
                <Button onClick={formik.submitForm} loading={formik.isSubmitting}>Add discount</Button>
            </div>

            <div>
                <p className='mb-8 text-gray-700 text-lg font-medium'>Inventory</p>

                <form className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='mb-6'>
                    <label
                    htmlFor='code'
                    className='text-sm text-neutral mb-2 block'
                    >
                    Code
                    </label>

                    <TextInput id='code' placeholder={'Discount code...'} value={formik.values.code} onChange={formik.handleChange} error={formik.errors.code}/>
                </div>
                <div className='mb-6'>
                    <label
                    htmlFor='percentage'
                    className='text-sm text-neutral mb-2 block'
                    >
                    Percentage Off
                    </label>
                    <TextInput id="percentage" placeholder={'Percentage...'} value={formik.values.percentage} onChange={formik.handleChange} error={formik.errors.percentage} />
                </div>
                </form>
            </div>
            </div>
        </Card>
        </section>
    );
}
