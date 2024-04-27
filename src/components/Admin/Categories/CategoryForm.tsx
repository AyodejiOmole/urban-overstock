'use client';
import CategoriesDetailsHeader from '@/app/admin/categories/components/Header';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import ENDPOINTS from '@/config/ENDPOINTS';
import HTTPService from '@/services/http';
// import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import * as Yup from 'yup';

export default function CategoryForm() {
  const cookies = new Cookies();
  const httpService = new HTTPService();
  const params = useSearchParams();
  const isMounted = useRef(true);
  // const [uppy] = useState(
  //   () =>
  //     new Uppy({
  //       restrictions: {
  //         maxNumberOfFiles: 1,
  //       },
  //     })
  // );

  const { replace } = useRouter();

  const [thumbnail, setThumbnail] = useState<Blob | File | null>(null);

  const [editCategory, setEditCategory] = useState(false);

  useEffect(() => {
    const editStatus = params.get('edit');

    if (!editStatus || (editStatus && editStatus === 'true'))
      setEditCategory(true);
  }, [params]);

  // useMemo(() => {
  //   if (isMounted) {
  //     uppy.on('file-added', (result) => {
  //       setThumbnail(result.data);
  //     });

  //     uppy.on('file-removed', () => {
  //       setThumbnail(null);
  //     });
  //   }

  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, [uppy]);

  const formik = useFormik({
    initialValues: {
      name: '',
      // description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required().label('Name'),
      // description: Yup.string().required().label('Description'),
    }),
    onSubmit: async (values) => {
      const token = cookies.get('urban-token');
      // if (thumbnail) {
      //   const token = cookies.get('urban-token');

      //   const formdata = new FormData();
      //   formdata.append('file', thumbnail);
      //   // formdata.append('file', thumbnail, thumbnail?.name);

      //   const requestOptions = {
      //     method: 'POST',
      //     body: formdata,
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   };

      //   const fileReq = await fetch(
      //     `${process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL}/api/v1/${ENDPOINTS.UPLOAD_FILE}`,
      //     requestOptions
      //   );

      //   const fileRes = await fileReq.json();

      //   console.log(fileRes);

      //   if (fileRes) {
      //     const apiRes = await httpService.post(
      //       ENDPOINTS.CATEGORIES,
      //       {
      //         name: values.name,
      //         description: values.description,
      //         iconUrl: fileRes.url,
      //       },
      //       `Bearer ${token}`
      //     );

      //     if (apiRes.data) {
      //       toast.success('Category added successfully.');

      //       setTimeout(() => {
      //         replace('/admin/categories');
      //       }, 1000);
      //     }
      //     console.log(apiRes);
      //   }
      // } else toast.error('Please add an image');
      const apiRes = await httpService.post(
        ENDPOINTS.CATEGORIES,
        {
          name: values.name,
          // description: values.description,
          // iconUrl: fileRes.url,
        },
        `Bearer ${token}`
      );

      if (apiRes.data) {
        toast.success('Category added successfully.');

        setTimeout(() => {
          replace('/admin/categories');
        }, 1000);
      }
      console.log(apiRes);
    },

    validateOnChange: true,
  });

  return (
    <div>
      {params.get('edit') && (
        <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8 py-8'>
          <p className='text-xl font-bold text-gray-700'>
            {editCategory ? 'Edit Category' : 'Category Details'}
          </p>
          <CategoriesDetailsHeader />
        </div>
      )}

      <form
        onSubmit={formik.handleSubmit}
        className='grid grid-cols-1 lg:grid-cols-6 gap-6'
      >
        {/* Column 1 */}
        {/* <div className='lg:col-span-2'>
          <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg'>
            <p className='text-lg font-semibold text-gray-700 mb-8'>
              Thumbnail
            </p>

            <Dashboard
              uppy={uppy}
              onSubmit={() => console.log('Images')} // to be commented out too.
            />
          </div>
        </div> */}
        {/* Column 2 */}
        <div className='lg:col-span-4'>
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
                value={formik.values.name}
                disabled={!editCategory}
                error={formik.errors.name}
              />
            </div>
            
            {/* Text input for Description */}
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
                disabled={!editCategory}
                onChange={formik.handleChange}
                value={formik.values.description}
              ></textarea>
              {formik.errors.description && (
                <div className='text-xs font-light mt-1 ml-1 p-2'>
                  <span className='text-red-600'>
                    {formik.errors.description}
                  </span>
                </div>
              )}
            </div> */}
            <Button
              block
              type='submit'
              loading={formik.isSubmitting}
              disabled={!editCategory}
            >
              Add Category
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
