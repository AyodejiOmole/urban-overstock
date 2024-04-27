import React from 'react';
import { BsPersonFillAdd } from 'react-icons/bs';
import { HiMiniBuildingStorefront } from 'react-icons/hi2';
import { IoBedSharp } from 'react-icons/io5';
import { MdOutlineTrendingUp } from 'react-icons/md';
import { PiChartBarFill } from 'react-icons/pi';

export default function SellerStatCards() {
  const card_icon_style =
    'h-20 w-20 flex items-center justify-center rounded-2xl text-white';

  return (
    <section className='my-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
      {/*  */}
      <div className='rounded-2xl bg-white p-6 flex items-center gap-4'>
        <span className={`${card_icon_style} bg-teal-500`}>
          <IoBedSharp className='text-4xl' />
        </span>
        <div>
          <p className='text-gray-700 font-medium'>Available Stock</p>
          <p className='my-2 text-neutral text-lg'>{(590).toLocaleString()}</p>
          <span className='text-orange-500 text-sm rounded-full font-medium flex gap-2'>
            <MdOutlineTrendingUp />
            55%
          </span>
        </div>
      </div>
      {/*  */}
      <div className='rounded-2xl bg-white p-6 flex items-center gap-4'>
        <span className={`${card_icon_style} bg-blue-500`}>
          <PiChartBarFill className='text-4xl' />
        </span>
        <div>
          <p className='text-gray-700 font-medium'>Sold Products</p>
          <p className='my-2 text-neutral text-lg'>{(2590).toLocaleString()}</p>
          <span className='text-orange-500 text-sm rounded-full font-medium flex gap-2'>
            <MdOutlineTrendingUp />
            8%
          </span>
        </div>
      </div>
      {/*  */}
      <div className='rounded-2xl bg-white p-6 flex items-center gap-4'>
        <span className={`${card_icon_style} bg-orange-500`}>
          <HiMiniBuildingStorefront className='text-4xl' />
        </span>
        <div>
          <p className='text-gray-700 font-medium'>Revenue</p>
          <p className='my-2 text-neutral text-lg'>
            ${(35290).toLocaleString()}
          </p>
          <span className='text-orange-500 text-sm rounded-full font-medium flex gap-2'>
            <MdOutlineTrendingUp />
            2%
          </span>
        </div>
      </div>
      {/*  */}
      <div className='rounded-2xl bg-white p-6 flex items-center gap-4'>
        <span className={`${card_icon_style} bg-red-500`}>
          <BsPersonFillAdd className='text-4xl' />
        </span>
        <div>
          <p className='text-gray-700 font-medium'>Followers</p>
          <p className='my-2 text-neutral text-lg'>{(1820).toLocaleString()}</p>
          <span className='text-orange-500 text-sm rounded-full font-medium flex gap-2'>
            <MdOutlineTrendingUp />
            35%
          </span>
        </div>
      </div>
    </section>
  );
}
