import Link from 'next/link';
import React from 'react';
import { FaX } from 'react-icons/fa6';

import getAllBrands from '@/libs/brands';
import getAllColors from '@/libs/colors';
import getAllSizes from '@/libs/sizes';
import getAllDiscountCodes from '@/libs/discount-codes';
import { IBrands } from '@/interfaces/brands';
import { IColors } from '@/interfaces/colors';
import { ISizes } from '@/interfaces/sizes';
import Pagination from '@/components/Shared/Pagination';
import { IDiscountCodes } from '@/interfaces/discount-codes';
import OldProductForm from '@/components/Admin/Products/OldProductForm';
import Button from '@/components/Global/Button';
import { ICategories } from '@/interfaces/categories';
import getAllCategories from '@/libs/categories';

export default async function AdminNewProduct() {
  const apiRes: Promise<ICategories | undefined> = getAllCategories();
  const categories = await apiRes;

  const apiResBrands: Promise<IBrands | undefined> = getAllBrands();
  const brands  = await apiResBrands;

  const apiResColors: Promise<IColors | undefined>  = getAllColors();
  const colors = await apiResColors;

  const apiResSizes: Promise<ISizes | undefined> = getAllSizes();
  const sizes = await apiResSizes;

  const apiResDiscounts: Promise<IDiscountCodes | undefined> = getAllDiscountCodes();
  const discounts = await apiResDiscounts;

  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8'>
        
        <div>
          <p className='text-xl font-bold text-gray-700'>Add Product</p>
          <Pagination/>
        </div>

        <div className='flex items-center gap-4 py-8'>
          <Link href='/admin/products'>
            <Button variant='outlined' color='dark'>
              <FaX />
              Cancel
            </Button>
          </Link>
        </div>
      </div>

      {/* Add Product Form */}
      <OldProductForm categories={categories} discounts={discounts} brands={brands} colors={colors} sizes={sizes}/>
    </section>
  );
}
