import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ISidebarLink, links } from '@/static/index';
import { FaHeadphonesAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { CgMenu } from 'react-icons/cg';
import { CgClose } from 'react-icons/cg';
import logoIcon from '../../../public/logo-icon.png';
import logo from '../../../public/logo.png';
import Image from 'next/image';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

// Rest of your imports...

type SidebarProps = {
  isOpen: Boolean;
  isOpenlg:Boolean;
  toggleSidebar: () => void;
  toggleSidebarlg:()=> void;
  handleNavItemClick:() => void;
};

export default function AdminSidebar({ isOpen,isOpenlg, toggleSidebar,toggleSidebarlg,handleNavItemClick}: SidebarProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState<null | number>(null);

  return (
    <>
    <div className='lg:hidden'>
      <div
        className={`w-screen h-screen z-30 fixed top-0 left-0 backdrop-blur-sm bg-[#0000004f] duration-300 block lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed top-0 z-50 bg-white h-screen duration-300 overflow-y-auto ${
          isOpen
            ? 'lg:w-1/6 translate-x-0 w-64 left-0'
            : 'lg:w-1/12 -translate-x-[100%] lg:translate-x-0 w-0 -left-4 lg:left-0'
        }`}
      >
        <div
          className='font-bold mt-2 mb-4 capitalize text-2xl text-gray-700 flex items-center justify-center'
          onClick={toggleSidebar}
        >
          {isOpen && <CgClose />}
          {!isOpen && <CgMenu />}
        </div>
        <div className='p-4 mt-2 mb-4 flex items-center justify-center'>
          <Image
            onClick={toggleSidebar}
            src={isOpen ? logo : logoIcon}
            alt='Urban Overstock Logo'
            className={`duration-500 ${isOpen ? 'w-2/3' : 'w-1/2'}`}
          />
        </div>
        <div className={'p-2'}>
          {/* {links.map((link) => (
            <Link
              key={link.name}
              href={link.page}
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '16px 0',
              }}
            >
              <div
                className={`py-4 flex gap-4 w-full h-10 items-center duration-500 rounded-md text-sm ${
                  pathname.trim() === link.page
                    ? 'bg-primary-2 text-white hover:bg-primary'
                    : 'white text-neutral hover:bg-gray-100'
                } ${isOpen ? 'justify-start pl-6' : 'justify-center pl-0'}`}
              >
                <span>{link.icon}</span>
                {isOpen && <p className={`capitalize`}>{link.name}</p>}
              </div>

            </Link>
          ))} */}

          {
            links.map((link: ISidebarLink, index: number) => {
              if(!link.children) {
                return (
                    <Link
                      key={link.name}
                      href={link.page}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '16px 0',
                      }}
                    >
                      <div
                        className={`py-4 flex gap-4 w-full h-10 items-center duration-500 rounded-md text-sm ${
                          pathname.trim() === link.page
                            ? 'bg-primary-2 text-white hover:bg-primary'
                            : 'white text-neutral hover:bg-gray-100'
                        } ${isOpen ? 'justify-start pl-6' : 'justify-center pl-0'}`}
                      >
                        <span>{link.icon}</span>
                        {isOpen && <p className={`capitalize`}>{link.name}</p>}
                      </div>
                    </Link>
                )              
              }
              // ${
              //   pathname.trim() === link.page
              //     ? 'bg-primary'
              //     : 'bg-gray-50'
              // } 
              return (
                <div
                  key={link.name}
                  className={`rounded-lg mt-4 duration-500 'bg-gray-50' 
                    
                  `}
                >
                  <button
                    onClick={() => {
                      isExpanded === index
                        ? setIsExpanded(null)
                        : setIsExpanded(index);
                    }}
                    className={`flex gap-4 w-full h-10 items-center p-4
                    ${isOpen ? 'justify-between' : 'justify-center'}
                    ${
                      isExpanded === index
                        ? 'border-b-2 border-b-white'
                        : 'border-0'
                    }
                      ${
                        // isSimilar(pathname, link.root) > 50
                        pathname.trim() === link.page
                          ? 'text-neutral'
                          : 'text-gray-800'
                      } 
                      `}
                  >
                    <div className='flex items-center gap-2'>
                      <p>{link.icon}</p>
                      {isOpen && <p className='capitalize'>{link.name}</p>}
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
                    <div className={`py-2 duration-500`}>
                      {link.children && (
                        <div className='pl-12 text-sm'>
                          {link?.children?.map((el) => (
                            <Link
                              key={el.name}
                              className={`capitalize my-3 rounded block ${
                                pathname.trim() === el.page
                                ? 'bg-primary'
                                : ''
                                } 
                              `}
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
              );
            })
          }
        </div>

              {/* Settings */}
      <div className='mt-[20px]'>
          <Link href='' className='p-2 flex items-center'>
            <div
              className={`py-4 flex gap-4 w-full h-10 items-center duration-500 rounded-md font-medium white text-neutral hover:bg-gray-50
              } ${isOpen ? 'justify-start pl-6' : 'justify-center pl-0'}`}
            >
              <FaHeadphonesAlt />
              {isOpen && <p className='capitalize'>Support</p>}
            </div>
          </Link>
          {/*  */}
          <Link href='' className='p-2 flex items-center'>
            <div
              className={`py-4 flex gap-4 w-full h-10 items-center duration-500 rounded-md font-medium white text-neutral hover:bg-gray-50
              } ${isOpen ? 'justify-start pl-6' : 'justify-center pl-0'}`}
            >
              <FiSettings />
              {isOpen && <p className='capitalize'>Settings</p>}
            </div>
          </Link>
      </div>
      </div>
    </div>
    <div className='hidden lg:block'>
    {/* Backdrop */}
    {isOpenlg && (
      <div
        className="fixed top-0 left-0 w-screen h-screen z-30 backdrop-blur-sm bg-[#0000004f] duration-500"
        onClick={toggleSidebarlg}
        //onMouseDown={toggleSidebar}
      ></div>
    )}

    {/* Sidebar */}
    <div
      className={`fixed top-0 z-50 bg-white h-screen duration-300 ${
        isOpenlg ? 'lg:w-1/6 translate-x-0 w-64 left-0' : 'lg:w-1/12 -translate-x-[100%] lg:translate-x-0 w-0 -left-4 lg:left-0'
      }`}
    >
        {/* Button for toggling sidebar */}
        {/* <div className="font-bold mt-2 mb-4 capitalize text-2xl text-gray-700 flex items-center justify-center" onClick={toggleSidebar}>
          {isOpen ? <CgClose /> : <CgMenu />}
        </div> */}
        <div className='flex items-center justify-center py-[15px] px-[20px]'>
          <Image
              onClick={toggleSidebarlg}
              src={isOpenlg ? logo : logoIcon}
              alt='Urban Overstock Logo'
              className={`duration-500 ${isOpenlg ? 'w-2/3' : 'w-1/2'}`}
            />
        </div>
      {/* Sidebar content */}
      <div className="flex flex-col h-full gap-[10px] px-[18px]">
        {/* Your sidebar navigation links */}
        {
            links.map((link: ISidebarLink, index: number) => {
              if(!link.children) {
                return (
                    <Link
                      key={link.name}
                      href={link.page}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        //margin: '16px 0',
                      }}
                    >
                      <div
                        className={`py-4  flex gap-4 w-full h-10 items-center duration-500 rounded-md text-sm ${
                          pathname.trim() === link.page
                            ? 'bg-primary-2 text-white hover:bg-primary'
                            : 'white text-neutral hover:bg-gray-100'
                        } ${isOpenlg ? 'justify-start pl-6' : 'justify-center pl-0'}`}
                        onClick={handleNavItemClick}
                      >
                        <span>{link.icon}</span>
                        {isOpenlg && <p className={`capitalize`}>{link.name}</p>}
                      </div>
                    </Link>
                )              
              }
              // ${
              //   pathname.trim() === link.page
              //     ? 'bg-primary'
              //     : 'bg-gray-50'
              // } 
              return (
                <div
                  key={link.name}
                  className={`rounded-lg  w-full duration-500 'bg-gray-50' 
                    
                  `}
                  onClick={handleNavItemClick}
                >
                  <button
                    onClick={() => {
                      isExpanded === index
                        ? setIsExpanded(null)
                        : setIsExpanded(index);
                    }}
                    className={`flex gap-4 w-full h-10 items-center py-4
                    ${isOpenlg ? 'justify-between pl-6' : 'justify-center'}
                    ${
                      isExpanded === index
                        ? 'border-b-2 border-b-white'
                        : 'border-0'
                    }
                      ${
                        // isSimilar(pathname, link.root) > 50
                        pathname.trim() === link.page
                          ? 'text-neutral'
                          : 'text-gray-800'
                      } 
                      `}
                  >
                    <div className='flex items-center gap-2'>
                      <p>{link.icon}</p>
                      {isOpenlg && <p className='capitalize'>{link.name}</p>}
                    </div>
                    {isOpenlg && (
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
                  {isOpenlg && isExpanded === index && (
                    <div className={`py-2 duration-500`}>
                      {link.children && (
                        <div className='pl-12 text-sm'>
                          {link?.children?.map((el) => (
                            <Link
                              key={el.name}
                              className={`capitalize my-3 rounded-[8px] block ${
                                pathname.trim() === el.page
                                ? 'bg-primary px-[10px] py-[10px]'
                                : ''
                                } 
                              `}
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
              );
            })
        }
        {/* Settings */}
        <div className='mt-[20px]'>
          <Link href='' className='p-2 flex items-center'>
            <div
              className={`py-4 flex gap-4 w-full h-10 items-center duration-500 rounded-md font-medium white text-neutral hover:bg-gray-50
              } ${isOpenlg ? 'justify-start pl-6' : 'justify-center pl-0'}`}
            >
              <FaHeadphonesAlt />
              {isOpenlg && <p className='capitalize'>Support</p>}
            </div>
          </Link>
          {/*  */}
          <Link href='' className='p-2 flex items-center'>
            <div
              className={`py-4 flex gap-4 w-full h-10 items-center duration-500 rounded-md font-medium white text-neutral hover:bg-gray-50
              } ${isOpenlg ? 'justify-start pl-6' : 'justify-center pl-0'}`}
            >
              <FiSettings />
              {isOpenlg && <p className='capitalize'>Settings</p>}
            </div>
          </Link>
        </div>
      </div>

    </div>
    </div>
    </>
  );
}
