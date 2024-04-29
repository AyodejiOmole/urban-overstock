'use client';

import ENDPOINTS from '@/config/ENDPOINTS';
import { ICategories, ICategory } from '@/interfaces/categories';
import HTTPService from '@/services/http';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { RxPencil2 } from 'react-icons/rx';
import Cookies from 'universal-cookie';

export default function CategoriesTable({
  selectedDate,
  categories,
}: {
  selectedDate: Date | (Date | null)[] | Date[] | null | undefined;
  categories: ICategories | undefined;
}) {
  const cookies = new Cookies();
  const httpService = new HTTPService();

  console.log(categories);

  const [selectedCategories, setSelectedCategories] = useState<
    ICategory[] | null
  >(null);
  const [rowClick, setRowClick] = useState<boolean>(true);

  async function deleteCategory(id: number) {
    const token = cookies.get('urban-token');

    if (
      confirm(
        'Are you sure you want to delete this category? This cannot be undone'
      )
    ) {
      toast.loading('Deleting category...');

      // const res = await httpService.delete(
      //   ENDPOINTS.CATEGORIES,
      //   String(id),
      //   `Bearer ${token}`
      // );
      const res = await httpService.deleteById(
        `${ENDPOINTS.CATEGORIES}?id=${String(id)}`,
        `Bearer ${token}`
      );

      toast.dismiss();
      if (res.status === 200) {
        console.log(res);
        toast.success('Category successfully deleted');
      } else toast.error('Cannot delete category at this time');
    }
  }

  const dateTemplate = (category: ICategory) =>
    moment(category.createdAt).format('MMM Do YYYY, h:mm a');

  function actionTemplate(category: ICategory) {
    return (
      <div className='flex items-center gap-3'>
        {/* <Link
          href={`/admin/categories/${category.id}?edit=false`}
          className='text-xl text-neutral'
        >
          <FaEye />
        </Link> */}
        <Link
          href={`/admin/categories/${category.id}?edit=true`}
          className='text-xl text-neutral'
        >
          <RxPencil2 />
        </Link>
        <button onClick={() => deleteCategory(category.id)}>
          <MdOutlineDelete className='text-xl' />
        </button>
      </div>
    );
  }

  function checkIfUrl(imageUrl: string) {
    if (!/^https?:\/\//.test(imageUrl) && !/^\/ /.test(imageUrl)) {
      // console.error(`Invalid image URL: ${imageUrl}`);
      // // You can also return a default image or a placeholder here
      // imageUrl = '/default-image.jpg'; // Replace with your default image
      return false;
    }
    return true;
  }

  function template(category: ICategory) {
    return (
      <div className='flex items-center gap-4'>
        {/* {category.iconUrl?.length > 0 && checkIfUrl(category.iconUrl) ? (
          <Image
            src={category?.iconUrl}
            height={20}
            width={20}
            className='h-12 w-12 bg-[#1b1b1b] rounded-md'
            alt={category.description}
          />
        ) : (
          <div className='h-12 w-12 bg-[#1b1b1b] rounded-md'></div>
        )} */}
        <div className='flex-1'>
          <p className='text-sm font-medium'>{category?.name}</p>
          {/* <p className='text-neutral text-sm font-light'>
            {category?.description}
          </p> */}
        </div>
      </div>
    );
  }

  const selectChangeHandler = (e: any) => {
    setSelectedCategories(e.value);

    console.log(e.value);
  };

  return (
    <div className='card rounded-md p-4 bg-white border border-gray-200'>
      <div className='px-4 flex flex-col w-full justify-between lg:flex-row lg:items-center gap-8 mb-8'>
        <p className='font-bold text-xl text-gray-700'>Categories Table</p>
      </div>
      <DataTable
        value={categories}
        selectionMode={rowClick ? null : 'multiple'}
        selection={selectedCategories!}
        onSelectionChange={selectChangeHandler}
        dataKey='id'
        tableStyle={{ minWidth: '50rem' }}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 25, 50, 100]}
        className='rounded-md text-sm'
        sortOrder={-1}
        sortField='createdAt'
      >
        <Column
          selectionMode='multiple'
          headerStyle={{ width: '3rem' }}
        ></Column>
        {/* <Column field='id' header='ID' sortable></Column> */}
        <Column body={template} header='Category'></Column>
        <Column
          field='createdAt'
          header='Added'
          body={dateTemplate}
          sortable
        ></Column>
        {/* <Column
          field='updatedAt'
          header='Last Updated'
          body={dateTemplate}
          sortable
        ></Column> */}
        <Column field='action' header='Action' body={actionTemplate}></Column>
      </DataTable>
    </div>
  );
}
