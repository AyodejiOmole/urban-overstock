'use client';

import moment from 'moment';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoIosArrowDown } from 'react-icons/io';

import ENDPOINTS from '@/config/ENDPOINTS';
import { ICategories, ICategory } from '@/interfaces/categories';
import HTTPService from '@/services/http';
import paginatorTemplate from '@/components/Global/PaginatorTemplate';
import { ICategoryToBeEdited } from './Categories';

export default function CategoriesTable({
  selectedDate,
  categories,
  searchValue,
  openModal,
  closeModal,
  setCategoryToBeEdited
}: {
  // selectedDate: Date | (Date | null)[] | Date[] | null | undefined | number;
  selectedDate: number | null;
  categories: ICategories | undefined;
  searchValue: string;
  openModal: () => void;
  closeModal?: () => void;
  setCategoryToBeEdited: React.Dispatch<React.SetStateAction<ICategoryToBeEdited | undefined | null>>
}) {
  const cookies = new Cookies();
  const httpService = new HTTPService();
  const router = useRouter();

  console.log(categories);

  async function deleteCategory(id: number) {
    const token = cookies.get('urban-token');

    if (
      confirm(
        'Are you sure you want to delete this category? This cannot be undone'
      )
    ) {
      toast.loading('Deleting category...');
      const res = await httpService.deleteById(
        `${ENDPOINTS.CATEGORIES}?id=${String(id)}`,
        `Bearer ${token}`
      );

      toast.dismiss();
      if (res.status === 200) {
        console.log(res);
        toast.success('Category successfully deleted');
        router.refresh();
      } else toast.error('Cannot delete category at this time');
    }
  }

  const dateTemplate = (category: ICategory) =>
    moment(category.createdAt).format('MMM Do YYYY');

  function actionTemplate(category: ICategory) {
    return (
      <div className='flex items-center gap-3'>

        {/* <Link
          href={`/admin/categories/${category.id}?edit=false`}
          className='text-xl text-neutral'
        >
          <FaEye />
        </Link> */}

        <button
          onClick={() => {
            setCategoryToBeEdited({
              id: category.id,
              name: category.name
            });
            openModal();
          }}
        >
          <MdOutlineModeEdit className='text-xl'/>
        </button>
        <button onClick={() => deleteCategory(category.id)}>
          <RiDeleteBin6Line className='text-xl'/>
        </button>
      </div>
    );
  }

  function template(category: ICategory) {
    return (
      <div className='flex items-center gap-4'>
        <div className='flex-1'>
          <p className='text-sm font-medium'>{category?.name}</p>
        </div>
      </div>
    );
  }

  const getCategoriesByDate = useMemo(() => {
    if (selectedDate) {
      return categories?.filter(
        (category) => moment(category.createdAt).valueOf() >= selectedDate
      );
    } else return categories;
  }, [categories, selectedDate]);

  const matchedCategories = useMemo(() => {
    if (searchValue.trim().length === 0) return getCategoriesByDate;

    return getCategoriesByDate?.filter(
      (category) =>
        category.name?.toLowerCase().includes(searchValue) ||
        category.description?.toLowerCase().includes(searchValue)
    );
  }, [getCategoriesByDate, searchValue]);

  return (
    <div className='card rounded-md p-4 bg-white border border-gray-200'>
      <div className='px-4 flex flex-col w-full justify-between lg:flex-row lg:items-center gap-8 mb-8'>
        <p className='font-bold text-xl text-gray-700'>Categories Table</p>
      </div>
      <DataTable
        value={matchedCategories}
        dataKey='id'
        tableStyle={{ minWidth: '50rem'}}
        paginator
        paginatorTemplate={paginatorTemplate}
        paginatorClassName='flex justify-between'
        rows={5}
        rowsPerPageOptions={[5, 25, 50, 100]}
        className='rounded-md text-sm'
        sortOrder={-1}
        sortField='createdAt'
        sortIcon={<IoIosArrowDown />}
      >
        <Column body={template} header='Category'></Column>
        <Column
          field='createdAt'
          header='Added'
          body={dateTemplate}
          sortable
        ></Column>
        <Column field='action' header='Action' body={actionTemplate}></Column>
      </DataTable>
    </div>
  );
}
