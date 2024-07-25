import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaHeadphonesAlt } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { CgMenu } from 'react-icons/cg';
import { CgClose } from 'react-icons/cg';
import Image from 'next/image';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { MdArrowRight } from "react-icons/md";

import logoIcon from '../../../public/logo-icon.png';
import logo from '../../../public/logo.png';
import { ISidebarLink, links } from '@/static/index';

type SidebarProps = {
  isOpen: Boolean;
  toggleSidebar: () => void;
  setSidebarOpen: any;
  notifications: number;
  orders: any;
  returnRequests: any;
};

export default function AdminSidebar({ isOpen, toggleSidebar, setSidebarOpen, notifications, orders, returnRequests}: SidebarProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState<null | number>(null);
  const cookies = new Cookies();
  const router = useRouter();

  const logOut = () => {
    cookies.remove("urban-token");
    cookies.set('urban-token', "", {
      path: '/',
      // expires: tokenExpiryTime,
    });
    router.push("/auth/admin/login");
  }

  console.log(notifications);
  console.log(orders);
  console.log(returnRequests);

  const expand = (index: number) => {
    if(isExpanded === index) {
      setIsExpanded(null);
      setSidebarOpen(true);
    } else {
      setIsExpanded(index);               
    }                    
  }

  return (
    <>
    <div className='lg:hidden'>
      <div
        className={`w-screen h-screen z-30 fixed top-0 left-0 bg-[#0000004f] duration-300 block lg:hidden ${
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
        {/* <div
          className='font-bold mt-2 mb-4 capitalize text-2xl text-gray-700 flex items-center justify-center'
          onClick={toggleSidebar}
        >
          {isOpen && <CgClose />}
          {!isOpen && <CgMenu />}
          <CgMenu />
        </div> */}
        
        <div className='p-4 mt-2 mb-4 flex items-center justify-center'>
          { isOpen ? <CgClose className='h-[20px] w-[20px] cursor-pointer' onClick={toggleSidebar} /> : <MdArrowRight className='cursor-pointer' onClick={toggleSidebar}/> }
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
                        
                        {link.name.toLowerCase() === "notification" && isOpen && (
                            <div className='px-[6px] bg-red-500 rounded-full text-[8px] text-white'>
                              {notifications ?? 0}
                              {/* {10} */}
                            </div>
                          )}

                          {link.name.toLowerCase() === "orders" && isOpen && (
                            <div className='px-[6px] bg-red-500 rounded-full text-[8px] text-white'>
                              {/* {notifications} */}
                              {orders?.data.length ?? 0}
                              {/* {10} */}
                            </div>
                          )}

                          {link.name.toLowerCase() === "return request" && isOpen && (
                            <div className='px-[6px] bg-red-500 rounded-full text-[8px] text-white'>
                              {/* {notifications} */}
                              {returnRequests?.data.length ?? 0}
                              {/* {10} */}
                            </div>
                          )}
                      </div>
                    </Link>
                )              
              }
              
              return (
                <div
                  key={link.name}
                  className={`rounded-lg mt-4 duration-500 'bg-gray-50' `}
                >
                  <button
                    // onClick={() => expand(index)}
                    onClick={() => {
                      isExpanded === index ? setIsExpanded(null) : setIsExpanded(index);
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
                          : 'text-neutral'
                      } 
                      `}
                  >
                    <div className='flex items-center gap-4'>
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
                              className={`capitalize my-3 rounded-[8px] block ${
                                pathname.trim() === el.page
                                ? 'bg-primary text-white px-[10px] py-[10px]'
                                : 'text-neutral'
                                } 
                              `}
                              href={el.page}
                            >
                              <span className='flex items-center justify-between pl-4'>
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

        {/* Settings and Logout */}
        <div className='cursor-pointer mt-[20px] p-2'>
              {/* <Link
                href="/admin/settings"
              >
                <div
                  className={`py-4 uo-tool-tip flex gap-4 w-full h-10 items-center duration-500 font-medium rounded-md text-sm hover:bg-gray-50
                    ${
                      pathname.trim() === "/admin/settings"
                        ? 'bg-primary-2 text-white hover:bg-primary'
                        : 'white text-neutral hover:bg-gray-100'
                    } 
                    ${isOpen ? 'justify-start pl-6' : 'justify-center pl-0'}
                  `}
                  data-pr-tooltip="Settings"
                  data-pr-position="right"
                >
                    <IoMdSettings />
                    {isOpen && <p className='capitalize'>Settings</p>}
                </div>
              </Link> */}
              <div
                onClick={() => logOut()}
                className={`uo-tool-tip py-4 flex gap-4 w-full h-10 items-center duration-500 rounded-md text-sm font-medium white text-neutral hover:bg-gray-50
                } ${isOpen ? 'justify-start pl-6' : 'justify-center pl-0'}`}
                data-pr-tooltip="Logout"
                data-pr-position="right"
              >
                <IoIosLogOut />
                {isOpen && <p className='capitalize'>Logout</p>}
              </div>
        </div>
      </div>
    </div>

    {/* On Large Screens */}
    <div className='hidden lg:block'>
      {/* <div
        className={`w-screen h-screen z-30 fixed top-0 left-0 bg-[#0000004f] duration-300 block lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleSidebar}
      ></div> */}
      <div
        className={`fixed top-0 z-50 bg-white h-screen duration-300 ${
          isOpen
            ? 'lg:w-1/6 translate-x-0 w-64 left-0'
            : 'lg:w-1/12 -translate-x-[100%] lg:translate-x-0 w-0 -left-4 lg:left-0'
        }`}
      >
      {/* Button for toggling sidebar */}
        {/* <div className="cursor-pointer font-bold mt-2 mb-4 text-gray-700 flex items-center justify-center" onClick={toggleSidebar}>
          {isOpen ? <CgClose /> : <CgMenu />}
        </div> */}
        <div className='flex items-center justify-center py-[15px] px-[20px]'>
          { isOpen ? 
            <CgClose 
              className='h-[20px] w-[20px] cursor-pointer uo-tool-tip' 
              onClick={toggleSidebar}
              data-pr-tooltip={"Close Sidebar"}
              data-pr-position="right"
            /> 
            : 
            <MdArrowRight 
              className='h-[20px] w-[20px] cursor-pointer uo-tool-tip' 
              onClick={toggleSidebar}
              data-pr-tooltip={"Open Sidebar"}
              data-pr-position="right"
            /> 
          }
          <Image
              onClick={toggleSidebar}
              src={isOpen? logo : logoIcon}
              alt='Urban Overstock Logo'
              className={`duration-500 ${isOpen ? 'w-2/3' : 'w-1/2'}`}
            />
        </div>

        {/* Sidebar content */}
        <div className="flex flex-col relative h-full gap-[10px] px-[18px]">
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
                          className={`py-4 uo-tool-tip flex gap-4 w-full h-10 items-center duration-500 rounded-md text-sm ${
                            pathname.trim() === link.page
                              ? 'bg-primary-2 text-white hover:bg-primary'
                              : 'white text-neutral hover:bg-gray-100'
                          } ${isOpen ? 'justify-start pl-6' : 'justify-center pl-0'}`}
                          // onClick={handleNavItemClick}
                          data-pr-tooltip={link.name.replace(/\b\w/g, (l) => {return l.toUpperCase()})}
                          data-pr-position="right"
                        >
                          
                            <span>{link.icon}</span>
              
                            {isOpen && <p className={`capitalize`}>{link.name}</p>}

                            {link.name.toLowerCase() === "notification" && isOpen && (
                              <div className='px-[6px] bg-red-500 rounded-full text-[8px] text-white'>
                                {notifications ?? 0}
                                {/* {10} */}
                              </div>
                            )}

                            {link.name.toLowerCase() === "orders" && isOpen && (
                              <div className='px-[6px] bg-red-500 rounded-full text-[8px] text-white'>
                                {/* {notifications} */}
                                {orders?.data.length ?? 0}
                                {/* {10} */}
                              </div>
                            )}

                            {link.name.toLowerCase() === "return request" && isOpen && (
                              <div className='px-[6px] bg-red-500 rounded-full text-[8px] text-white'>
                                {/* {notifications} */}
                                {returnRequests?.data.length ?? 0}
                                {/* {10} */}
                              </div>
                            )}
                        </div>
                      </Link>
                  )              
                }
      
                return (
                  <div
                    key={link.name}
                    className={`rounded-lg  w-full duration-500 'bg-gray-50' 
                      
                    `}
                    // onClick={toggleSidebar}
                  >
                    <button
                      onClick={() => {
                        isExpanded === index
                          ? setIsExpanded(null)
                          : setIsExpanded(index);
                      }}
                      className={`flex gap-4 w-full h-10 items-center py-4 uo-tool-tip
                      ${isOpen ? 'justify-between pl-6' : 'justify-center'}
                      ${
                        isExpanded === index
                          ? 'border-b-2 border-b-white'
                          : 'border-0'
                      }
                        ${
                          // isSimilar(pathname, link.root) > 50
                          pathname.trim() === link.page
                            ? 'text-neutral'
                            : 'text-neutral hover:bg-gray-100'
                        } 
                        `}
                        // data-pr-tooltip={link.name}
                        data-pr-tooltip={link.name.replace(/\b\w/g, (l) => {return l.toUpperCase()})}
                      data-pr-position="right"
                    >
                      <div className='flex items-center gap-4 ' 
                      
                      >
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
                          <div className='pl-10 text-sm'>
                            {link?.children?.map((el) => (
                              <Link
                                key={el.name}
                                className={`capitalize my-3 rounded-[8px] block ${
                                  pathname.trim() === el.page
                                  ? 'bg-primary text-white px-[10px] py-[10px]'
                                  : 'text-neutral'
                                  } 
                                `}
                                href={el.page}
                              >
                                <span className='flex items-center justify-between pl-4'>
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

          {/* Settings and Logout */}
          <div className='cursor-pointer mt-[20px] p-2'>
              {/* <Link
                href="/admin/settings"
              >
                <div
                  className={`py-4 uo-tool-tip flex gap-4 w-full h-10 items-center duration-500 font-medium rounded-md text-sm hover:bg-gray-50
                    ${
                      pathname.trim() === "/admin/settings"
                        ? 'bg-primary-2 text-white hover:bg-primary'
                        : 'white text-neutral hover:bg-gray-100'
                    } 
                    ${isOpen ? 'justify-start pl-6' : 'justify-center pl-0'}
                  `}
                  data-pr-tooltip="Settings"
                  data-pr-position="right"
                >
                    <IoMdSettings />
                    {isOpen && <p className='capitalize'>Settings</p>}
                </div>
              </Link> */}
              <div
                onClick={() => logOut()}
                className={`uo-tool-tip py-4 flex gap-4 w-full h-10 items-center duration-500 rounded-md text-sm font-medium white text-neutral hover:bg-gray-50
                } ${isOpen ? 'justify-start pl-6' : 'justify-center pl-0'}`}
                data-pr-tooltip="Logout"
                data-pr-position="right"
              >
                <IoIosLogOut />
                {isOpen && <p className='capitalize'>Logout</p>}
              </div>
          </div>
      </div>
      </div>
    </div>
    </>
  );
}
