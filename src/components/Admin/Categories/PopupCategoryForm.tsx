'use client';


import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { Router } from 'next/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import * as Yup from 'yup';

import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import ENDPOINTS from '@/config/ENDPOINTS';
import HTTPService from '@/services/http';
import { ICategoryToBeEdited } from './Categories';

interface IPopupCategoryForm {
    categoryToBeEdited: ICategoryToBeEdited | undefined | null;
    closeModal: () => void;
}

export default function PopupCategoryForm({ categoryToBeEdited, closeModal } : IPopupCategoryForm) {
  const cookies = new Cookies();
  const httpService = new HTTPService();
  // const params = useSearchParams();
  // const router = useRouter();

  const [editCategory, setEditCategory] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: categoryToBeEdited?.name ?? "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(12, 'Category name must be 12 characters or less').required().label('Name'),
    }),
    onSubmit: async (values) => {
      const token = cookies.get('urban-token');

      if(categoryToBeEdited) {
        const apiRes = await httpService.patch(
          ENDPOINTS.CATEGORIES,
          {
            id: categoryToBeEdited.id,
            name: values.name,

          },
          `Bearer ${token}`
        );
  
        if (apiRes.status === 200) {
          toast.success('Category updated successfully.');
  
          setTimeout(() => { 
            // router.back();
            closeModal();
          }, 1000);
        }

        console.log(apiRes);

      } else {
        const apiRes = await httpService.post(
          ENDPOINTS.CATEGORIES,
          {
            name: values.name,
          },
          `Bearer ${token}`
        );

        if (apiRes.data) {
          toast.success('Category added successfully.');

          setTimeout(() => {
            // router.push('/admin/categories');
            closeModal();
          }, 1000);
        }
        console.log(apiRes);
      }
    },

    validateOnChange: true,
  });

  return (
    <div className='w-full'>

      <form
        onSubmit={formik.handleSubmit}
        className='w-full'
      >
        <div className='w-full'>
          <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg'>
            <p className='text-lg font-semibold text-gray-700 mb-8'>
              General Information
            </p>

             {/* Text Input for name */}
            <div className='mb-6'>
              <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
                Name
              </label>
              <TextInput
                placeholder='Type category name here...'
                id='name'
                onChange={formik.handleChange}
                value={formik.values.name.toString()}
                name="name"
                error={formik.errors.name}
                // maxLength={12}
                ifCategory={true}
              />
            </div>
        
            <Button
              block
              type='submit'
              loading={formik.isSubmitting}
            >
              {categoryToBeEdited ? "Update category" : "Add category"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
