"use client";

import { useRouter, usePathname } from 'next/navigation';
import { FaAngleRight } from "react-icons/fa";

import React from 'react'
import Link from 'next/link';
import { BiCurrentLocation } from 'react-icons/bi';

const Pagination = () => {
    const router = useRouter();
    // const { pathname } = router;
    const pathname = usePathname();
    let paginationLinks: React.JSX.Element[] = [];

    const formatString = (currentRoute: string) => {
      return currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1).replace(/-/g, ' ');
    } 

    pathname.split("/").reduce((acc, current, index, array) => {
        if(index > 0) {
            const link = `${acc}/${current}`;
            paginationLinks.push(
                <li key={link}>
                    <Link href={link}>
                        <div className='flex gap-1 items-center justify-center'>
                          <p className='text-sm text-[#CFA31C]'>{current === "admin" ? "Dashboard" : current === "new" ? `New ${acc}` : formatString(current)}</p>
                          <FaAngleRight className='fill-[#CFA31C]' color='#CFA31C'/>
                        </div> 
                    </Link>
                </li>
            );
        }
        return acc;
    }, '');

    return (
        <nav className="">
          <ul className='flex w-full gap-2'>
            {paginationLinks.map((link, index) => (
              <React.Fragment key={index}>{link}</React.Fragment>
            ))}
          </ul>
        </nav>
      );
}

export default Pagination;