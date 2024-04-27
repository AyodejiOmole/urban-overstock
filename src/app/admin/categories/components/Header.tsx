'use client';
import Button from '@/components/Global/Button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaX } from 'react-icons/fa6';

export default function CategoriesDetailsHeader() {
  const { back } = useRouter();

  return (
    <div className='flex items-center gap-4'>
      <Button variant='outlined' color='dark' onClick={back}>
        <FaX />
        Cancel
      </Button>
    </div>
  );
}
