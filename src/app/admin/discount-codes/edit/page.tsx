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
import { useSearchParams } from 'next/navigation';

export default function AddDiscountCodeDetails() {
    const cookies = new Cookies();
    const httpService = new HTTPService();
    const params = useSearchParams();

    const token = cookies.get('urban-token');

    const router = useRouter();

    const activateDiscountCode = async () => {
      toast.loading("Activating discount code...");
      try {
        const apiRes = await httpService.patchById(`${ENDPOINTS.DISCOUNT_CODE}/activate/${params.get("id")}`, `Bearer ${token}`)
        
        toast.dismiss();
        if(apiRes.status === 200) {
          toast.success("Discount code activated.");

          setTimeout(() => {
            router.push('/admin/discount-codes');
          }, 1000);
        } else toast.error('Cannot update discount codes at this time!');
      } catch (error) {
        console.log(error);
        toast.error('Cannot update discount codes at this time!');
      }
    };
    
    const deactivateDiscountCode = async () => {
      toast.loading("Deactivating discount code...");
      try {
        const apiRes = await httpService.patchById(`${ENDPOINTS.DISCOUNT_CODE}/deactivate/${params.get("id")}`, `Bearer ${token}`)
        
        toast.dismiss();
        if(apiRes.status === 200) {
          toast.success("Discount code deactivated.");

          setTimeout(() => {
            router.push('/admin/discount-codes');
          }, 1000);
        } else toast.error('Cannot update discount codes at this time!');
      } catch (error) {
        console.log(error);
        toast.error('Cannot update discount codes at this time!');
      }
    };

    const formik = useFormik({
        initialValues: {
          code: params.get("code") ?? "",
          percentage: params.get("percentage") ?? 0,
        },
        validationSchema: Yup.object({
          code: Yup.string().required().label('Code'),
          percentage: Yup.number().min(0).required().label('Percentage'),
        }),
        onSubmit: async (values) => {
          
        
            const apiRes = await httpService.patch(
              `${ENDPOINTS.DISCOUNT_CODE}/${params.get("id")}`,
              {
                code: values.code,
                percentage: values.percentage,
              },
              `Bearer ${token}`
            );
    
            if (apiRes.status === 200) {
              toast.success('Discount code updated successfully.');
    
              setTimeout(() => {
                router.push('/admin/discount-codes');
              }, 1000);
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
                    <Button variant='outlined' onClick={deactivateDiscountCode}>
                        Deactivate
                    </Button>
                    <Button variant='outlined' onClick={activateDiscountCode}>Activate</Button>
                    <Button onClick={formik.submitForm} loading={formik.isSubmitting}>Update discount</Button>
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
