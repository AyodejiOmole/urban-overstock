import HomeSlideshowTable from '@/components/Admin/HomeSlideshow/HomeSlideshowTable';
import Button from '@/components/Global/Button';
import { SliderImageType } from '@/interfaces';
import getSliderImages from '@/libs/slider-images';
import Link from 'next/link';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

export default async function AdminHomeSlideshow() {
  const apiRes: Promise<SliderImageType[] | null> = getSliderImages();
  const sliderImages = await apiRes;

  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 my-8'>
        <p className='text-xl font-medium text-gray-700'>
          Home Slideshow Images
        </p>

        <Link href='/admin/home-slideshow/new'>
          <Button>
            <FaPlus />
            Add Slide Image
          </Button>
        </Link>
      </div>

      {/* Home Slideshow Table */}
      <HomeSlideshowTable selectedDate={null} slideshows={sliderImages} />
    </section>
  );
}
