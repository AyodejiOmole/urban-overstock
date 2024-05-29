'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface IProps {
  number?: number;
  icon: React.ReactNode;
}

export default function Notification({ number, icon }: IProps) {
  const [showNumber, setShowNumber] = useState(false);

  useEffect(() => {
    if (number && number > 0) setShowNumber(true);
  }, [number]);

  return (
    <Link href="/admin/notifications">
      <button className='relative'>
        <span className='text-xl text-gray-600'>{icon}</span>

        {showNumber && (
          <div className='py-1 px-[6px] bg-red-500 rounded-full absolute -right-4 -top-4 text-[10px] text-white'>
            {number}
          </div>
        )}
      </button>
    </Link>
  );
}
