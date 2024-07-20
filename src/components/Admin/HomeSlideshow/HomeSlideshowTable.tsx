'use client';

import Image from 'next/image';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState, useEffect } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { SliderImageType } from '@/interfaces';
import HTTPService from '@/services/http';
import ENDPOINTS from '@/config/ENDPOINTS';
import paginatorTemplate from '@/components/Global/PaginatorTemplate';
import { ISlideShows } from '@/app/admin/home-slideshow/page';

export default function HomeSlideshowTable({
  selectedDate,
  slideshows,
}: {
  selectedDate: number | null;
  slideshows: SliderImageType[] | null | ISlideShows[];
}) {
  const [selectedImages, setSelectedImages] = useState<
    SliderImageType[] | null
  >(null);
  const [rowClick, setRowClick] = useState<boolean>(true);

  const [expandedSlideShows, setExpandedSlideShows] = useState<ISlideShows[] | null | undefined>(slideshows);

  console.log(slideshows);

  const cookies = new Cookies();
  const httpService = new HTTPService();

  const router = useRouter();

  async function deleteSliderImage(id: number) {
    const token = cookies.get('urban-token');

    if (
      confirm(
        'Are you sure you want to delete this slider image? This cannot be undone.'
      )
    ) {
      toast.loading('Deleting slideshow...');

      const res = await httpService.deleteById(
        `${ENDPOINTS.SLIDER_IMAGE}/${String(id)}`,
        `Bearer ${token}`
      );

      toast.dismiss();
      if (res.status === 200) {
        console.log(res);
        toast.success('Slider image successfully deleted');
        router.refresh();
      } else toast.error('Cannot delete slider image at this time');
    }
  }

  // useEffect(() => {
  //   expandedSlideShows?.forEach((slideshow, index) => {
  //     fetch(slideshow.image)
  //       .then(response => response.blob())
  //       .then(blob => {
  //         const img = new window.Image();
  //         img.src = URL.createObjectURL(blob);
  //         img.onload = () => {
  //           console.log('Image type:', blob.type); // e.g. "image/jpeg"
  //           console.log('Image size:', blob.size); // e.g. 102400 (in bytes)
  //           console.log('Image dimensions:', img.width, 'x', img.height); // e.g. 800 x 600

  //           const newState = expandedSlideShows.map((obj, slideShowIndex) => {
  //             if (index === slideShowIndex) {
  //               return {
  //                 ...obj,
  //                 imageType: blob.type,
  //                 imageDimensions: img.width + 'x' + img.height,
  //                 imageSize: `${((blob.size)/1024).toFixed(2)}kb`,
  //               };
  //             }
  //             return obj;
  //           });
           
  //           setExpandedSlideShows(newState);
  //         };
  //     });
  //   })
  // }, [expandedSlideShows, slideshows])

  function actionTemplate(slideshow: SliderImageType) {
    return (
      <div className='flex items-center justify-end gap-3'>
        {/* <Link
          href={`/admin/home-slideshow/${slideshow.id}?edit=false`}
          className='text-xl text-neutral'
        >
          <FaEye />
        </Link> */}
        {/* <Link
          href={`/admin/home-slideshow/${slideshow.id}?edit=true`}
          className='text-xl text-neutral'
        >
          <RxPencil2 />
          <MdOutlineModeEdit />
        </Link> */}
        <button onClick={() => deleteSliderImage(slideshow.id)}>
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
        value={expandedSlideShows ?? []}
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
        sortIcon={<IoIosArrowDown />}
      >
        <Column
          selectionMode='multiple'
          headerStyle={{ width: '3rem' }}
        ></Column>
        <Column body={template} header='Image'></Column>
        <Column field='imageType' header="Type"></Column>
        <Column field='imageSize' header="Size"></Column>
        <Column field='imageDimensions' header="Dimension"></Column>
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
