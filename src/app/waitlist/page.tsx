"use client";

import React from 'react'
import Link from 'next/link';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { FaX } from 'react-icons/fa6';
import { TfiSave } from 'react-icons/tfi';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { IoIosArrowDown } from 'react-icons/io';
import emailjs from "@emailjs/browser"

import HTTPService from '@/services/http';
import TextInput from '@/components/Global/TextInput';
import Button from '@/components/Global/Button';

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

const Waitlist = () => {
    // const cookies = new Cookies();
    const httpService = new HTTPService();

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          phoneNumber: undefined,
          emailAddress: "",
          preferredModeOfContact: "",
          questions: "",
          productsToSell: "",
          shippingPossible:  "",
          productAvailable: "",
        },
        validationSchema: Yup.object({
          firstName: Yup.string().required().label('First Name'),
          lastName: Yup.string().required().label('Last Name'),
          phoneNumber: Yup.number().min(1).required().label("Phone number"),
          preferredModeOfContact: Yup.string().required().label('Preferred Mode of Contact'),
          emailAddress: Yup.string().email("Invalid email address").required().label('Email Address'),
          productsToSell: Yup.string().required().label('Interest Products'),
          questions: Yup.string().required().label('Questions'),
          shippingPossible: Yup.string().required().label('Shippng possible'),
          productAvailable: Yup.string().required().label('Product Available'),
        }),
        onSubmit: async (values) => {
            toast.loading("Submitting...");

            const data = {
                "First name": values.firstName,
                "Last name": values.lastName,
                "Phonenumber": values.phoneNumber,
                "Email Address": values.emailAddress,
                "Preferred Mode Of Contact": values.preferredModeOfContact,
                "Questions": values.questions,
                "Products To Sell": values.productsToSell,
                "Is Shipping Possible?":  values.shippingPossible,
                "Products Available": values.productAvailable,
            };

            const SERVICE_ID = process.env.EMAILJS_SERVICE_ID ?? "";
            const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID ?? "";
            const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

            emailjs.send(
                "service_f16wtzk",
                // SERVICE_ID,
                "template_0qt98r4",
                // TEMPLATE_ID,
                data,
                "YbrQltdijHhFWYz8S"
                // PUBLIC_KEY
            ).then(response => {
                toast.dismiss();
                if (response) {
                    toast.dismiss();
                    toast.success("Thanks for your submission! You have been added to the waitlist.");
                    // toast.success(response.text);
                    console.log(response.text);
                    router.push("/");
                } else {
                    toast.error("Oops! There was a problem submitting your form");
                }
              }).catch(error => {
                toast.dismiss();
                toast.error("Oops! There was a problem submitting your form");
              });
        },
        validateOnChange: true,
    });

  return (
    <div className='lg:px-10 px-4'>
        <section className='mb-4'>
             {/* General, Personal Information */}
            <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4'>
                <p className='text-lg font-semibold text-gray-700 mb-8'>Contact Information</p>

                <div className=''>
                    <div className='lg:flex md:flex justify-between lg:gap-3 md:gap-3 w-full'>
                        {/* First name */}
                        <div className='mb-6 w-full'>
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
                        <div className='mb-6 w-full'>
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

                    <div className='lg:flex md:flex justify-between lg:gap-3 md:gap-3 w-full'>
                        {/* Email address */}
                        <div className='mb-6 w-full'>
                            <label htmlFor='emailAddress' className='text-sm text-neutral mb-2 block'>
                                Email Address
                            </label>
                            <TextInput
                                placeholder='Type your email address...'
                                id='emailAddress'
                                onChange={formik.handleChange}
                                value={formik.values.emailAddress}
                                error={formik.errors.emailAddress}
                                type='text'
                            />
                        </div>
                        
                        {/* Phone number */}
                        <div className='mb-6 w-full'>
                            <label
                                htmlFor='phoneNumber'
                                className='text-sm text-neutral mb-2 block'
                            >
                                Phone number
                            </label>
                            <TextInput
                                placeholder='Type your phone number...'
                                id='phoneNumber'
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                                error={formik.errors.phoneNumber}
                                type='number'
                            />
                        </div>
                    </div>
                    
                    {/* Mode of contact */}
                    <div className='mb-6'>
                        <label
                            htmlFor='preferredModeOfContact'
                            className='text-sm text-neutral mb-2 block'
                        >
                            Whats your preferred mode of contact?
                        </label>
                        <TextInput
                            placeholder='Type prferred mode of contact...'
                            id='preferredModeOfContact'
                            onChange={formik.handleChange}
                            value={formik.values.preferredModeOfContact}
                            error={formik.errors.preferredModeOfContact}
                            type='text'
                        />
                    </div>
                </div>
            </div>
        </section>

        <section className='mt-4'>
             {/* Product Information */}
            <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4'>
                <p className='text-lg font-semibold text-gray-700 mb-8'>Product Details</p>

                <div className=''>
                    {/* Products customer wants to sell on the platform. */}
                    <div className='mb-6'>
                        <label
                            htmlFor='productsToSell'
                            className='text-sm text-neutral mb-2 block'
                        >
                            What products are you interested in selling on our platform?
                        </label>
                        <TextInput
                            // placeholder='...'
                            id='productsToSell'
                            onChange={formik.handleChange}
                            value={formik.values.productsToSell}
                            error={formik.errors.productsToSell}
                            type='text'
                        />
                    </div>

                    {/* Questions you want to ask us. */}
                    <div className='mb-6'>
                        <label
                            htmlFor='questions'
                            className='text-sm text-neutral mb-2 block'
                        >
                            Do you have any specific questions?
                        </label>
                        <TextInput
                            // placeholder='...'
                            id='questions'
                            onChange={formik.handleChange}
                            value={formik.values.questions}
                            error={formik.errors.questions}
                            type='text'
                        />
                    </div>

                    <div className='lg:flex md:flex justify-between lg:gap-3 md:gap-3 w-full'>
                        {/* Do you have the product available? */}
                        <div className='mb-6 w-full relative'>
                            <label htmlFor='productAvailable' className='text-sm text-neutral mb-2 block'>
                                Do you have the product available?
                            </label>
                            
                            <select
                                name='productAvailable'
                                id='productAvailable'
                                className='text-black bg-[#F0F1F3] font-medium h-12'
                                onChange={formik.handleChange}
                                value={formik.values.productAvailable}
                            >
                                <option value='' defaultChecked disabled>
                                    Choose....
                                </option>
                                <option value='yes' >YES</option>
                                <option value='no'>NO</option>
                            </select>

                            <IoIosArrowDown className={`absolute right-4 ${formik.errors.productAvailable ? "top-10" : "bottom-4"}`} />
                            <CustomError error={formik.errors.productAvailable} />
                        </div>
                        
                        {/* Can you package the product for shipping? */}
                        <div className='mb-6 w-full relative'>
                            <label
                                htmlFor='shippingPossible'
                                className='text-sm text-neutral mb-2 block'
                            >
                                Can you package the product for shipping?
                            </label>
                            <select
                                name='shippingPossible'
                                id='shippingPossible'
                                className='text-black bg-[#F0F1F3] font-medium h-12'
                                onChange={formik.handleChange}
                                value={formik.values.shippingPossible}
                            >
                                <option value='' defaultChecked disabled>
                                    Choose....
                                </option>
                                <option value='yes' >YES</option>
                                <option value='no'>NO</option>
                            </select>

                            <IoIosArrowDown className={`absolute right-4 ${formik.errors.shippingPossible ? "top-10" : "bottom-4"}`} />
                            <CustomError error={formik.errors.shippingPossible} />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer */}
        <div className='w-full p-4 bg-white flex items-center justify-center gap-3'>
            <div className='flex items-center gap-4'>
                <Link href='/'>
                    <Button variant='outlined' color='dark'>
                        <FaX />
                        Cancel
                    </Button>
                </Link>
                
                <Button onClick={formik.submitForm} loading={formik.isSubmitting}>
                    <TfiSave />
                    Submit
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Waitlist;