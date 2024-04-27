'use client';
import CategoriesDetailsHeader from '@/app/admin/categories/components/Header';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import ENDPOINTS from '@/config/ENDPOINTS';
import HTTPService from '@/services/http';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';
import Cookies from 'universal-cookie';
import * as Yup from 'yup';
import { FaX } from 'react-icons/fa6';
import { TfiSave } from 'react-icons/tfi';

export default function CategoryDetails() {
  return (
    <div>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8 py-8'>
        <p className='text-xl font-bold text-gray-700'>Category Details</p>

        <div className='flex items-center gap-4'>
          <Link href='/admin/categories'>
            <Button variant='outlined' color='dark'>
              <FaX />
              Cancel
            </Button>
          </Link>

          <Button disabled>
            <TfiSave />
            Save Product
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-6 gap-6'>
        {/* Column 1 */}
        {/* <div className='lg:col-span-2'>
          <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg'>
            <p className='text-lg font-semibold text-gray-700 mb-8'>
              Thumbnail
            </p>

            <Image
              src={''}
              alt=''
              className='bg-gray-600 max-w-60 min-h-60 rounded-md mx-auto'
            />
          </div>
        </div> */}
        {/* Column 2 */}
        <div className='lg:col-span-4'>
          <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg'>
            <p className='text-lg font-semibold text-gray-700 mb-8'>
              General Information
            </p>

            <div className='mb-6'>
              <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
                Name
              </label>
              <TextInput
                placeholder='Type category name here...'
                id='name'
                // value={formik.values.name}
                disabled
              />
            </div>
            {/*  */}
            {/* <div className='mb-6'>
              <label
                htmlFor='description'
                className='text-sm text-neutral mb-2 block'
              >
                Description
              </label>

              <textarea
                name='description'
                id='description'
                placeholder='Type category description here...'
                disabled
                // value={formik.values.description}
              ></textarea>
            </div> */}
            <Button block type='submit' disabled>
              Add Category
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
