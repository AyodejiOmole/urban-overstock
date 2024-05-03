'use client';

import { SliderImageType } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';
import { RxPencil2 } from 'react-icons/rx';
import paginatorTemplate from '@/components/Global/PaginatorTemplate';

export default function HomeSlideshowTable({
  selectedDate,
  slideshows,
}: {
  selectedDate: number | null;
  slideshows: SliderImageType[] | null;
}) {
  const [selectedImages, setSelectedImages] = useState<
    SliderImageType[] | null
  >(null);
  const [rowClick, setRowClick] = useState<boolean>(true);

  console.log(slideshows);

  function actionTemplate(slideshow: SliderImageType) {
    return (
      <div className='flex items-center justify-end gap-3'>
        <Link
          href={`/admin/home-slideshow/${slideshow.id}?edit=false`}
          className='text-xl text-neutral'
        >
          <FaEye />
        </Link>
        <Link
          href={`/admin/home-slideshow/${slideshow.id}?edit=true`}
          className='text-xl text-neutral'
        >
          <RxPencil2 />
        </Link>
        <button>
          <MdOutlineDelete className='text-xl' />
        </button>
      </div>
    );
  }

  function template(slideshow: SliderImageType) {
    return (
      <div className='flex items-center gap-4'>
        {slideshow.image.length > 0 ? (
          <Image
            src={slideshow.image}
            height={100}
            width={100}
            className='h-12 w-12 bg-[#1b1b1b] rounded-md object-cover'
            alt={String(slideshow.id)}
          />
        ) : (
          <div className='h-12 w-12 bg-[#1b1b1b] rounded-md'></div>
        )}
      </div>
    );
  }

  const selectChangeHandler = (e: any) => {
    setSelectedImages(e.value);

    console.log(e.value);
  };

  return (
    <div className='rounded-xl p-4 bg-white border border-gray-200'>
      <DataTable
        value={slideshows ?? []}
        selectionMode={rowClick ? null : 'multiple'}
        selection={selectedImages!}
        onSelectionChange={selectChangeHandler}
        dataKey='id'
        tableStyle={{ minWidth: '50rem' }}
        paginator
        paginatorTemplate={paginatorTemplate}
        paginatorClassName='flex'
        rows={5}
        rowsPerPageOptions={[5, 25, 50, 100]}
        className='rounded-xl text-sm'
        sortOrder={-1}
        sortField='createdAt'
      >
        <Column
          selectionMode='multiple'
          headerStyle={{ width: '3rem' }}
        ></Column>
        <Column body={template} header='Image'></Column>
        <Column
          field='action'
          header='Action'
          body={actionTemplate}
          align='right'
        ></Column>
      </DataTable>
    </div>
  );
}
