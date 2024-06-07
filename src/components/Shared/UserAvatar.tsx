"use client";
import React, { useState } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CiLogout } from "react-icons/ci";
import Cookies from 'universal-cookie';

type PropTypes = {
  name: string;
  title?: string;
};

export default function UserAvatar({ name, title = '' }: PropTypes) {
  const cookies = new Cookies();
  // const cookieStore = new Cookies();
  const router = useRouter();

  const [dropDown, setDropDown] = useState<boolean>(false);

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch('/api/logout', {
  //       method: 'POST',
  //     });

  //     if (response.ok) {
  //       router.push('/auth/admin/login');
  //     } else {
  //       console.error('Failed to log out');
  //     }
  //   } catch (error) {
  //     console.error('An error occurred during logout:', error);
  //   }
  // };

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
  };
  

  const handleLogout = () => {
    cookies.remove("urban-token");
    // cookieStore.forEach((cookie) => {
    //   cookie.remove(cookie.key);
    // });
    cookies.set('urban-token', "", {
      path: '/',
      // expires: tokenExpiryTime,
    });
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
        <div className='absolute cursor-pointer py-2 px-2 rounded bg-white text-md top-14 w-full flex justify-center items-center' onClick={() => handleLogout()}>
          {/* <CiLogout /> */}
          <p>Logout</p>
        </div>
      }
    </div>
  );
}
