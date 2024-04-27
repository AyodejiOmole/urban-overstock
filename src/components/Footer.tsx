import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { HiPhone } from 'react-icons/hi2';
import { IoMail } from 'react-icons/io5';
import logo from '../../public/logo.png';
import Button from './Global/Button';

export function Footer() {
  const listItemStyle = 'font-light my-2 text-gray-800';

  return (
    <section className='bg-white'>
      <div className='p-4 lg:px-16 xl:px-32 pt-16 pb-16 grid items-start gap-12 sm:gap-16 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 border-b border-b-primary-4'>
        {/* Column 1 */}
        <div>
          <Link href='/' className='mb-4 inline-block'>
            <Image src={logo} alt='Urban Overstock Logo' width={200} />
          </Link>

          <div className='ml-4'>
            <a
              href='mailto:support@urbanoverstock.com'
              className='flex items-center gap-4 my-2 font-light'
            >
              <IoMail className='text-primary text-xl' />
              <span>support@urbanoverstock.com</span>
            </a>
            <a
              href='tel:07006464644'
              className='flex items-center gap-4 my-2 font-light'
            >
              <HiPhone className='text-primary text-xl' />
              <span>700-6464-644</span>
            </a>
          </div>
        </div>

        {/* Column 2 */}
        <div className='text-gray-900'>
          <p className='mb-6 font-medium text text-2xl md:text-3xl'>Legal</p>
          <ul>
            <li className={listItemStyle}>
              <Link href='/terms-of-use'>Terms of Use</Link>
            </li>
            <li className={listItemStyle}>
              <Link href='/privacy-policy'>Privacy Policy</Link>
            </li>
            {/* <li className={listItemStyle}>
              <Link href='/'>Cookie Policy</Link>
            </li> */}
          </ul>
        </div>

        {/* Column 3 */}
        <div className='text-gray-900'>
          <p className='mb-6 font-medium text text-2xl md:text-3xl'>
            Industries
          </p>
          <div className='font-light'>
            <p className={listItemStyle}>Stay Up to Date</p>
            <form className='mt-4 border-2 border-primary p-2 rounded-md flex items-center gap-4 justify-between'>
              <input
                type='email'
                required
                className='w-full p-2 outline-none text-sm'
                placeholder='Your email'
              />
              <Button color='dark'>Subscribe</Button>
            </form>
          </div>
        </div>
      </div>
      {/*  */}

      <p className='text-center font-light text-sm text-gray-800 p-8 lg:px-16 xl:px-32 pt-16 pb-16'>
        &copy; All Rights Reserved Copyright {new Date().getUTCFullYear()}{' '}
        Urbanoverstock.com
      </p>
    </section>
  );
}
