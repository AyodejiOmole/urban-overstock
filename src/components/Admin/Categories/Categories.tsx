'use client';

import React, { useState, useMemo, ChangeEvent } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa';

import CategoriesTable from './CategoriesTable';
import TextInput from '@/components/Global/TextInput';
import { ICategories, ICategory } from '@/interfaces/categories';
import Button from '@/components/Global/Button';
import Pagination from '@/components/Shared/Pagination';
import Modal from '@/components/Global/Modal';
import PopupCategoryForm from './PopupCategoryForm';

export interface ICategoryToBeEdited {
  id: number
  name: string
}

export default function Categories({
  categories,
}: {
  categories: ICategories | undefined;
}) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const [searchValue, setSearchValue] = useState<string>('');

  const [modalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const [categoryToBeEdited, setCategoryToBeEdited] = useState<ICategoryToBeEdited | null | undefined>(null);

  const debouncedSearch = useMemo(() => {
    let timer: NodeJS.Timeout;

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setSearchValue(e.target.value);
      }, 500);
    };

    return handleSearchChange;
  }, []);

  const handleSelectDate = (
    date: Date | (Date | null)[] | Date[] | null | undefined
  ) => {
    if (date) {
      const formatted = new Date(date as Date).getTime();

      setSelectedDate(formatted);
    } else setSelectedDate(null);
  };

  return (
    <>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
        <div>
          <p className='text-xl font-bold text-gray-700'>Categories</p>
          <Pagination />
        </div>
        
        <div className='flex items-center gap-4'>
            <Button
              onClick={() => openModal()}
            >
              <FaPlus />
              Add Category
            </Button>
        </div>
      </div>
    
      <section>
        <div className='flex items-center justify-between mb-4'>
          <div className='w-full max-w-md'>
            <TextInput
              placeholder='Search categories...'
              leftIcon={<CiSearch />}
              onChange={debouncedSearch}
              ifSearchBar="bg-white"
            />
          </div>
        </div>

        {/* Categories Table */}
        <CategoriesTable 
          selectedDate={selectedDate} 
          categories={categories} 
          searchValue={searchValue.toLocaleLowerCase()}
          openModal={openModal}
          setCategoryToBeEdited={setCategoryToBeEdited}
        />
      </section>

      {/* Add & Edit Category Modal */}
      <Modal
        isOpen={modalOpen}
        handleClose={closeModal}
        title='Add & Edit Category'
      > 
        <h3 className='mb-4 text-lg text-black'> Add a new category? </h3>
        <PopupCategoryForm 
          categoryToBeEdited={categoryToBeEdited}
          closeModal={closeModal}
        />
      </Modal>
    </>
  );
}
