import ProductForm from '@/components/Admin/Products/ProductForm';
import Button from '@/components/Global/Button';
import { IProduct } from '@/interfaces/products';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link';
import React from 'react';
import { FaX } from 'react-icons/fa6';
import { TfiSave } from 'react-icons/tfi';

export default function ProductDetails({ params }: { params: { id: string } }) {
  console.log(params);
  const searchParams = useSearchParams();

  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
        <p className='text-xl font-bold text-gray-700'>Product Details</p>

        <div className='flex items-center gap-4'>
          <Link href='/admin/products'>
            <Button variant='outlined' color='dark'>
              <FaX />
              Cancel
            </Button>
          </Link>

          {searchParams.get('edit') && 
            <Button>
              <TfiSave />
              Save Product
            </Button>
          }
        </div>
      </div>

      {/* Add Product Form */}
      <ProductForm activeProduct={null} />
    </section>
  );
}
