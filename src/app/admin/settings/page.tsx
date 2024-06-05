"use client";
import React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import ENDPOINTS from '@/config/ENDPOINTS';
import HTTPService from '@/services/http';
import Cookies from 'universal-cookie';
import Pagination from '@/components/Shared/Pagination';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import Link from 'next/link';
import Button from '@/components/Global/Button';
import { TfiSave } from 'react-icons/tfi';
import { FaX } from 'react-icons/fa6';
import TextInput from '@/components/Global/TextInput';

const Settings = () => {
    const cookies = new Cookies();
    const httpService = new HTTPService();

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          streetAddress: "",
          country: "",
          city: "",
          state: "",
          zipCode: "",
        },
        validationSchema: Yup.object({
          firstName: Yup.string().required().label('First Name'),
          lastName: Yup.string().required().label('Last Name'),
          streetAddress: Yup.string().required().label('Street Address'),
          country: Yup.string().required().label('Country'),
          city: Yup.string().required().label('City'),
          state: Yup.string().required().label('State'),
          zipCode: Yup.string().required().label('Zip Code'),
        }),
        onSubmit: async (values) => {
            const token = cookies.get('urban-token');

            const zipCode = String(values.zipCode);
            const data = { ...values, zipCode }
        
            const apiRes = await httpService.post(
              `${ENDPOINTS.ADMIN_SHIPPING_ADDRESS}`,
              data,
              `Bearer ${token}`
            );
    
            if (apiRes.data) {
              toast.success('Address settings updated successfully.');
    
              setTimeout(() => {
                router.push('/admin');
              }, 1000);
            }
            console.log(apiRes);
        },
        validateOnChange: true,
    });

    return (
        <div>
            <div className='w-full justify-between lg:items-center gap-8 mb-4 py-4'>
                <div>
                    <p className='text-xl font-medium text-gray-700'>Orders</p>
                    <Pagination /> 
                </div>

                 {/* address settings form */}
                <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4'>
                    <p className='text-lg font-semibold text-gray-700 mb-8'>Admin Shipping Details</p>

                    <div className='w-full items-center'>
                        <div className='mb-6'>
                            <label htmlFor='firstName' className='text-sm text-neutral mb-2 block'>
                                First Name
                            </label>
                            <TextInput
                                placeholder='Type first name...'
                                id='firstName'
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                error={formik.errors.firstName}
                                type='text'
                            />
                        </div>
                        
                        <div className='mb-6'>
                            <label
                                htmlFor='lastName'
                                className='text-sm text-neutral mb-2 block'
                            >
                                Last Name
                            </label>
                            <TextInput
                                placeholder='Type last name...'
                                id='lastName'
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                error={formik.errors.lastName}
                                type='text'
                            />
                        </div>
                        
                        <div className='mb-6'>
                            <label
                                htmlFor='streetAddress'
                                className='text-sm text-neutral mb-2 block'
                            >
                                Street Address
                            </label>
                            <TextInput
                                
                                placeholder='Type Street Address...'
                                id='streetAddress'
                                onChange={formik.handleChange}
                                value={formik.values.streetAddress}
                                error={formik.errors.streetAddress}
                                type='text'
                            />
                        </div>
                        
                        <div className='mb-6'>
                            <label
                                htmlFor='country'
                                className='text-sm text-neutral mb-2 block'
                            >
                                Country
                            </label>
                            <TextInput
                                placeholder='Enter country...'
                                id='country'
                                onChange={formik.handleChange}
                                value={formik.values.country}
                                error={formik.errors.country}
                                type="text"
                            />
                        </div>

                        <div className='mb-6'>
                            <label
                                htmlFor='state'
                                className='text-sm text-neutral mb-2 block'
                            >
                                State
                            </label>
                            <TextInput
                                placeholder='Enter State...'
                                id='state'
                                onChange={formik.handleChange}
                                value={formik.values.state}
                                error={formik.errors.state}
                                type="text"
                            />
                        </div>

                        <div className='mb-6'>
                            <label
                                htmlFor='city'
                                className='text-sm text-neutral mb-2 block'
                            >
                                City
                            </label>
                            <TextInput
                                placeholder='Enter city...'
                                id='city'
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                error={formik.errors.city}
                                type="text"
                            />
                        </div>

                        <div className='mb-6'>
                            <label
                                htmlFor='state'
                                className='text-sm text-neutral mb-2 block'
                            >
                                State
                            </label>
                            <TextInput
                                inputMode='numeric'
                                placeholder='Enter Zip Code...'
                                id='zipCode'
                                onChange={formik.handleChange}
                                value={formik.values.zipCode}
                                error={formik.errors.zipCode}
                                type="number"
                            />
                        </div>
                    </div>
                </div>

                {/* Fixed footer */}
                <div className='fixed right-0 bottom-0 w-full p-4 bg-white flex items-center justify-end'>
                    <div className='flex items-center gap-4'>
                        <Link href='/admin'>
                            <Button variant='outlined' color='dark'>
                                <FaX />
                                Cancel
                            </Button>
                        </Link>
                        
                        <Button onClick={formik.submitForm} loading={formik.isSubmitting}>
                            <TfiSave />
                            Save Address
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Settings;