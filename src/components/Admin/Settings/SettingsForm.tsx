'use client';
import React from 'react'
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { IAdminShippingAddress } from '@/interfaces/shipping-address';
import Link from 'next/link';
import Button from '@/components/Global/Button';
import { FaX } from 'react-icons/fa6';
import { TfiSave } from 'react-icons/tfi';
import ENDPOINTS from '@/config/ENDPOINTS';
import HTTPService from '@/services/http';
import Cookies from 'universal-cookie';
import Pagination from '@/components/Shared/Pagination';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import TextInput from '@/components/Global/TextInput';
import { IoIosArrowDown } from 'react-icons/io';
import data from "../../../static/states.json"

function CustomError({ error }: { error?: string }) {
    if (!error) return;
  
    return (
      <div className='text-xs font-light mt-1 ml-1 p-2'>
        <span className='text-red-600'>
          {error === "Category must be greater than or equal to 1" ? "Category field is required!": error}
        </span>
      </div>
    );
}

const SettingsForm = ({
    adminShippingAddress,
}: {
    adminShippingAddress: IAdminShippingAddress | null;
}) => {
    const cookies = new Cookies();
    const httpService = new HTTPService();

    console.log(adminShippingAddress);

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
          firstName: adminShippingAddress?.firstName ?? "",
          lastName: adminShippingAddress?.lastName ?? "",
          streetAddress: adminShippingAddress?.streetAddress ?? "",
          country: adminShippingAddress?.country ?? "",
          city: adminShippingAddress?.city ?? "",
          state: adminShippingAddress?.state ?? "",
          zipCode: adminShippingAddress?.zipCode ?? "",
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
            toast.loading("Updating admin shipping address...");
            const token = cookies.get('urban-token');

            const zipCode = String(values.zipCode);
            const data = { ...values, zipCode }

            let apiRes;
        
            if(adminShippingAddress) {
                apiRes = await httpService.patch(
                    `${ENDPOINTS.ADMIN_SHIPPING_ADDRESS}/${adminShippingAddress.id}`,
                    data,
                    `Bearer ${token}`
                );
            } else {
                apiRes = await httpService.post(
                    `${ENDPOINTS.ADMIN_SHIPPING_ADDRESS}`,
                    data,
                    `Bearer ${token}`
                );
            }

            toast.dismiss();
            if (apiRes.status === 200) {
                toast.success('Address settings updated successfully.');
        
                setTimeout(() => {
                    router.push('/admin');
                    // router.refresh();
                }, 1000);
            } else {
                toast.error(apiRes.messsage);
            }
            console.log(apiRes);
        },
        validateOnChange: true,
    });

    return (
        <div>
            {/* <div className='w-full justify-between lg:items-center gap-8 mb-4 py-4'> */}
                {/* <div>
                    <p className='text-xl font-medium text-gray-700'>Settings</p>
                    <Pagination /> 
                </div> */}

                 {/* address settings form */}
                <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4'>
                    <p className='text-lg font-semibold text-gray-700 mb-8'>Admin Shipping Details</p>

                    <div className='w-full items-center'>
                        <div className='lg:flex md:flex justify-between lg:gap-3 md:gap-3 w-full'>
                            {/* First name */}
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
                            
                            {/* Last name */}
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
                        </div>
                        
                        {/* Street address */}
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

                        <div className='lg:flex mb-6 md:flex justify-between lg:gap-3 md:gap-3 w-full'>
                            {/* Country */}
                            <div className='mb-6 w-full relative'>
                                <label
                                    htmlFor='country'
                                    className='text-sm text-neutral mb-2 block'
                                >
                                    Country
                                </label>
                                <select
                                    name='country'
                                    id='country'
                                    className='text-black bg-[#F0F1F3] font-medium h-12'
                                    onChange={formik.handleChange}
                                    value={formik.values.country}
                                    disabled
                                >
                                    {/* <option value='' defaultChecked disabled>
                                        Select a country....
                                    </option> */}
                                    <option value='US' defaultChecked >United State, US</option>
                                </select>

                                <IoIosArrowDown className={`absolute right-4 ${formik.errors.country ? "top-10" : "bottom-4"}`} />
                                <CustomError error={formik.errors.country} />
                            </div>

                            {/* State */}
                            <div className='mb-6 w-full relative'>
                                <label
                                    htmlFor='state'
                                    className='text-sm text-neutral mb-2 block'
                                >
                                    State
                                </label>
                                <select
                                    name='state'
                                    id='state'
                                    className='text-black bg-[#F0F1F3] font-medium h-12'
                                    onChange={formik.handleChange}
                                    value={formik.values.state}
                                >
                                    <option value='' defaultChecked disabled>
                                        Select a state....
                                    </option>
                                    {
                                        data.map((state, index) => (
                                            <option value={state.code} key={index}> {state.state} </option>
                                        ))
                                    }
                                </select>

                                <IoIosArrowDown className={`absolute right-4 ${formik.errors.state ? "top-10" : "bottom-4"}`} />
                                <CustomError error={formik.errors.state} />
                            </div>
                        </div>
                        
                        <div className='lg:flex md:flex justify-between lg:gap-3 md:gap-3 w-full'>
                            {/* City */}
                            <div className='mb-6 w-full relative'>
                                <label
                                    htmlFor='city'
                                    className='text-sm text-neutral mb-2 block'
                                >
                                    City
                                </label>
                                <select
                                    name='city'
                                    id='city'
                                    className='text-black bg-[#F0F1F3] font-medium h-12'
                                    onChange={formik.handleChange}
                                    value={formik.values.city}
                                >
                                    <option value='' defaultChecked disabled>
                                        Select a city....
                                    </option>
                                    {
                                        data.find(state => state.code === formik.values.state)?.cities.map((city, index) => (
                                            <option value={city} key={index}> {city} </option>
                                        ))
                                    }
                                </select>

                                <IoIosArrowDown className={`absolute right-4 ${formik.errors.city ? "top-10" : "bottom-4"}`} />
                                <CustomError error={formik.errors.city} />
                            </div>

                            {/* Zip Code */}
                            <div className='mb-6 w-full'>
                                <label
                                    htmlFor='zipCode'
                                    className='text-sm text-neutral mb-2 block'
                                >
                                    Zip Code
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
            {/* </div> */}
        </div>
    )
}

export default SettingsForm;