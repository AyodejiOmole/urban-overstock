import React from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';

type PropTypes = {
  name: string;
  title?: string;
};

export default function UserAvatar({ name, title = '' }: PropTypes) {
  return (
    <div className='flex items-center gap-3'>
      <div className='h-12 w-12 bg-gray-500 rounded-full relative'>
        <div className='h-4 w-4 bg-green-500 border-2 border-white rounded-full absolute right-0 bottom-0'></div>
      </div>
      <div className='flex-1'>
        <p className='font-medium text-gray-800'>{name}</p>
        <p className='text-sm text-gray-500'>{title}</p>
      </div>

      <button className='text-gray-600'>
        <IoChevronDownOutline />
      </button>
    </div>
  );
}
