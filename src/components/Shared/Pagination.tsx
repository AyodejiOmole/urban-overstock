"use client";

import { useRouter, usePathname } from 'next/navigation';
import { FaAngleRight } from "react-icons/fa";

import React from 'react'
import Link from 'next/link';
import { BiCurrentLocation } from 'react-icons/bi';

const Pagination = (  ) => {
    const router = useRouter();
    // const { pathname } = router;
    const pathname = usePathname();
    let paginationLinks: React.JSX.Element[] = [];

    const formatString = (currentRoute: string) => {
      return currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1).replace(/-/g, ' ');
    } 

    // const ifAdd = () => {
    //   return `Add ${currentPage}`
    // }

    // console.log(currentPage);

    pathname.split("/").reduce((acc, current, index, array) => {
        if(index > 0) {
            const link = `${acc}/${current}`;
            paginationLinks.push(
                <li key={link}>
                    <Link href={link}>
                        <div className='flex gap-1 items-center justify-center'>
                          <p className={`text-sm ${current === acc.split("/")[-1] ? "text-neutral" : "text-[#CFA31C]" }`}>{current === "admin" ? "Dashboard" : current === "new" ? `Add ${acc.split("/").slice(-1)}` : formatString(current)}</p>
                          <FaAngleRight className='' color='gray'/>
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