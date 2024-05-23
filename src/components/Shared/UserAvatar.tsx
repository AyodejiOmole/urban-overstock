"use client";
import React, { useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import Cookies from 'universal-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CiLogout } from "react-icons/ci";

type PropTypes = {
  name: string;
  title?: string;
};

export default function UserAvatar({ name, title = '' }: PropTypes) {
  const cookies = new Cookies();
  const router = useRouter();

  const [dropDown, setDropDown] = useState<boolean>(false);

  const logOut = () => {
    cookies.remove("urban-token");
    router.push("/auth/admin/login");
  }

  return (
    <div className='flex items-center gap-3 relative'>
      <div className='h-12 w-12 bg-gray-500 rounded-full relative'>
        <div className='h-4 w-4 bg-green-500 border-2 border-white rounded-full absolute right-0 bottom-0'></div>
      </div>
      <div className='flex-1'>
        <p className='font-medium text-gray-800'>{name}</p>
        <p className='text-sm text-gray-500'>{title}</p>
      </div>

      <button className='text-gray-600' onClick={() => setDropDown(prev => !prev)}>
        <IoChevronDownOutline />
      </button>

      {
        dropDown && 
        <div className='absolute cursor-pointer py-4 px-2 rounded bg-white text-md top-14 w-full flex justify-center items-center' onClick={() => logOut()}>
          {/* <CiLogout /> */}
          <p>Logout</p>
        </div>
      }
    </div>
  );
}
