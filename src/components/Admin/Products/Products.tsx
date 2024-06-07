'use client';
import TextInput from '@/components/Global/TextInput';
import DatePicker from '@/components/Shared/DatePicker';
import { IProduct, IProducts } from '@/interfaces/products';
import React, { ChangeEvent, useMemo, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import ProductsTable from './ProductsTable';
import Button from '@/components/Global/Button';
import Pagination from '@/components/Shared/Pagination';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import { PiExportBold } from 'react-icons/pi';
import { RiDeleteBin5Fill } from "react-icons/ri";
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import HTTPService from '@/services/http';
import ENDPOINTS from '@/config/ENDPOINTS';
import { useRouter } from 'next/navigation';

export default function Products({
  products,
}: {
  products: IProducts | undefined;
}) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<IProducts>([]);

  const handleChangeSelectedProducts = (e: any) => {
    console.log(e.value);

    setSelectedProducts(e.value);
  };

  const debouncedSearch = useMemo(() => {
    let timer: NodeJS.Timeout;

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setSearchValue(e.target.value);
      }, 500);
    };

    return handleSearchChange;
  }, []);

  const handleSelectDate = (
    date: Date | (Date | null)[] | Date[] | null | undefined
  ) => {
    if (date) {
      const formatted = new Date(date as Date).getTime();

      setSelectedDate(formatted);
    } else setSelectedDate(null);
  };

  const cookies = new Cookies();
  const httpService = new HTTPService();

  const router = useRouter();

  async function updateProduct(products: IProducts, status: string) {
    if(products) {
      if(products.length === 0) {
        toast.error('Please select a product');
        return;
      }

      const token = cookies.get('urban-token');

      toast.loading('Updating product status...');

      const data = { ids: [...products.map((product: IProduct) => { return product.id } )], status: status }
      console.log(data);

      const res = await httpService.patch(
        `${ENDPOINTS.PRODUCTS}/update-bulk`,
        data,
        `Bearer ${token}`
      );

      toast.dismiss();
      if (res.status === 200) {
        console.log(res);
        toast.success('Product status successfully updated!');
        router.refresh();
      } else toast.error('Cannot update product status at this time!');
    } else toast.error("Please select at least one product to update!");
  }

  async function deleteProducts(products: IProducts) {
    if(products) {
      if(products.length === 0) {
        toast.error('Please select at least one product.');
        return;
      }

      const token = cookies.get('urban-token');

      toast.loading('Deleting products...');

      const data = { ids: [...products.map((product: IProduct) => { return product.id } )] }
      console.log(data);

      const res = await httpService.deleteLikePatch(
        `${ENDPOINTS.PRODUCTS}/delete-bulk`,
        data,
        `Bearer ${token}`
      );

      toast.dismiss();
      if (res.status === 200) {
        console.log(res);
        toast.success('Product(s) status successfully deleted!');
        router.refresh();
      } else toast.error('Cannot delete product(s) at this time!');
    } else toast.error("Please select at least one product to delete!");
  }

  return (
    <section>
      <div className='flex flex-col w-full justify-between sm:flex-row lg:items-center gap-8 mb-8 py-4'>
      {/* <p className='text-xl font-bold text-gray-700'>Products</p> */}
      <div>
       <p className='text-xl font-bold text-gray-700'>Products</p>
       <Pagination/>
      </div>

      <div className='flex items-center gap-4'>
          <Button variant='outlined' color='primary-2' onClick={() => updateProduct(selectedProducts, "PUBLISHED")}>
            {/* <PiExportBold /> */}
            Publish
          </Button>
          <Button variant='outlined' color='primary-2' onClick={() => updateProduct(selectedProducts, "DRAFT")}>
            {/* <PiExportBold /> */}
            Unpublish
          </Button>
          <Button onClick={() => deleteProducts(selectedProducts)}>
            <RiDeleteBin5Fill />
            Delete
          </Button>
          <Link href='/admin/products/new'>
            <Button>
              <FaPlus />
              Add Product
            </Button>
          </Link>
      </div>
      </div>

      <div className='flex items-center justify-between mb-4'>
        <div className='w-full max-w-md'>
          <TextInput
            placeholder='Search product...'
            leftIcon={<CiSearch />}
            onChange={debouncedSearch}
            value={searchValue}
          />
        </div>

        {/* <DatePicker handleSelectDate={handleSelectDate} /> */}
      </div>

      {/* Products Table */}
      <ProductsTable
        selectedDate={selectedDate}
        products={products}
        searchValue={searchValue.toLowerCase()}
        handleChangeSelectedProducts={handleChangeSelectedProducts}
        selectedProducts={selectedProducts}
      />
    </section>
  );
}
