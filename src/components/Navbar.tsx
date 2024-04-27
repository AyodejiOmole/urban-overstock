'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoMenuSharp } from 'react-icons/io5';
import logo from '../../public/logo.png';

const links = [
  { _id: '01', name: 'Features', url: '/#features' },
  { _id: '02', name: 'About Us', url: '/#about-us' },
  { _id: '03', name: 'Why Us', url: '/#why-us' },
  { _id: '04', name: 'Testimonial', url: '/#testimonial' },
];

const Navbar = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const [navOpen, setNavOpen] = useState(false);

  const getActivePage = (route: string) => {
    return route.toLowerCase() === pathname;
  };

  const openNav = () => setNavOpen(true);
  const closeNav = () => setNavOpen(false);

  const toggleNav = () => setNavOpen((prev) => !prev);

  return (
    <nav className='p-6 md:bg-primary-5 flex items-center justify-between lg:px-16 xl:px-32 2xl:px-40 fixed top-0 left-0 w-screen bg-white z-50'>
      {/* Navbar Logo */}
      <Link href='/'>
        <Image src={logo} alt='Urban Overstock Logo' className='w-48' />
      </Link>
      {/* Navbar Links */}
      <ul className='hidden lg:flex items-center gap-8'>
        {links.map((link) => (
          <li key={link._id}>
            <Link
              href={link.url}
              className={`p-3 px-6 rounded-md hover:bg-primary-4 duration-500 ${
                getActivePage(link.url)
                  ? 'bg-primary-4 text-primary-2'
                  : 'bg-transparent'
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* Mobile Menu Navigation */}
      <div
        className={`w-full max-w-sm shadow-2xl p-4 fixed top-28 right-0 z-20 bg-white lg:hidden duration-500 ${
          navOpen
            ? 'scale-y-100 translate-y-0'
            : 'scale-y-0 -translate-y-[100%]'
        }`}
      >
        {/* Toggle Mobile Menu */}
        <div className='flex items-center justify-end mb-8'>
          <button type='button' role='Close Navigation Menu' onClick={closeNav}>
            <IoMdCloseCircleOutline className='text-3xl' />
          </button>
        </div>

        <ul className={`flex flex-col gap-12`}>
          {links.map((link) => (
            <li key={link._id} data-aos='fade-left'>
              <Link
                href={link.url}
                className={`py-2 px-6 duration-500 inline-block w-full text-right bg-white hover:bg-primary`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        className='block ml-8 text-4xl p-0 text-gray-800 lg:hidden'
        role='Open Mobile Navigation'
        onClick={toggleNav}
      >
        <IoMenuSharp />
      </button>
      {/* Mobile Navbar */}
      <div className='fixed left-0 top-0 bg-white'></div>
    </nav>
  );
};

export default Navbar;
