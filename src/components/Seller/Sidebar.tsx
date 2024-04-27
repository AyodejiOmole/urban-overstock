'use client';
import { RootLink, sellerLinks } from '@/static/index';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { calculateStringSimilarity } from '@/helpers';
import Link from 'next/link';
import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { RiLogoutCircleLine } from 'react-icons/ri';
import logoIcon from '../../../public/logo-icon.png';
import logo from '../../../public/logo.png';

type SidebarProps = {
  isOpen: Boolean;
  toggleSidebar: () => void;
};

export default function SellerSidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState<null | number>(null);
  const pathname = usePathname();

  const isSimilar = calculateStringSimilarity;

  return (
    <>
      <div
        className={`w-screen h-screen z-30 fixed top-0 left-0 backdrop-blur-sm bg-[#0000004f] duration-300 block lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed top-4 z-50 bg-white min-h-[97vh] duration-500 rounded-3xl ${
          isOpen
            ? 'lg:w-1/6 translate-x-0 w-64 left-4'
            : 'lg:w-1/12 -translate-x-[120%] lg:translate-x-0 w-0 -left-4 lg:left-4'
        }`}
      >
        <div className='p-4 mt-4 mb-16 flex items-center justify-center'>
          <Image
            onClick={toggleSidebar}
            src={isOpen ? logo : logoIcon}
            alt='Urban Overstock Logo'
            className={`duration-500 ${isOpen ? 'w-2/3' : 'w-1/2'}`}
          />
        </div>
        <div className='p-4'>
          {sellerLinks.map((link: RootLink, index: number) => (
            <div
              key={link.title}
              className={`rounded-lg mt-4 duration-500 ${
                isSimilar(pathname, link.root) > 50
                  ? 'bg-primary'
                  : 'bg-gray-50'
              } `}
            >
              <button
                onClick={() => {
                  isExpanded === index
                    ? setIsExpanded(null)
                    : setIsExpanded(index);
                }}
                className={`py-4 flex gap-4 w-full h-10 items-center p-4
                 ${isOpen ? 'justify-between' : 'justify-center'}
                 ${
                   isExpanded === index
                     ? 'border-b-2 border-b-white'
                     : 'border-0'
                 }
                  ${
                    isSimilar(pathname, link.root) > 50
                      ? 'text-neutral'
                      : 'text-gray-800'
                  } 
                  `}
              >
                <div className='flex items-center gap-2'>
                  <p>{link.icon}</p>
                  {isOpen && <p className='capitalize'>{link.title}</p>}
                </div>
                {isOpen && (
                  <span className='text-xl'>
                    {isExpanded === index ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )}
                  </span>
                )}
              </button>

              {/* Children */}
              {isOpen && isExpanded === index && (
                <div className={`py-4 duration-500`}>
                  {link.children && (
                    <div className='px-4 text-sm'>
                      {link.children.map((el) => (
                        <Link
                          key={el.name}
                          className='capitalize my-2 mt-4 block'
                          href={el.page}
                        >
                          <span className='flex items-center justify-between'>
                            {el.name}
                            {el.children && (
                              <span className='text-xl'>
                                {isExpanded === index ? (
                                  <MdKeyboardArrowUp />
                                ) : (
                                  <MdKeyboardArrowDown />
                                )}
                              </span>
                            )}
                          </span>
                          {el.children && (
                            <div className=''>
                              {el.children.map((innerEl) => (
                                <Link
                                  href={innerEl.page}
                                  key={innerEl.name}
                                  className={`capitalize flex p-2 ${
                                    pathname === innerEl.page
                                      ? 'text-white'
                                      : 'text-gray-800'
                                  }`}
                                >
                                  {innerEl.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <button className='flex items-center mt-16 w-full'>
          <span
            className={`py-4 flex gap-4 w-full h-10 items-center duration-500 rounded-md text-gray-800 hover:bg-gray-100  ${
              isOpen ? 'justify-start pl-6' : 'justify-center pl-0'
            }`}
          >
            <RiLogoutCircleLine />

            {isOpen && <p className={`capitalize`}>Logout</p>}
          </span>
        </button>
      </div>
    </>
  );
}
