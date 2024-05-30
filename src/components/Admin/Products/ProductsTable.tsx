'use client';

import ENDPOINTS from '@/config/ENDPOINTS';
import { formatCurrency } from '@/helpers';
import { productStatusTemplate } from '@/helpers/products';
import { IProduct, IProducts } from '@/interfaces/products';
import HTTPService from '@/services/http';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye } from 'react-icons/fa';
import {MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineDelete, MdOutlineModeEdit } from 'react-icons/md';
import { RxPencil2 } from 'react-icons/rx';
import Cookies from 'universal-cookie';
import paginatorTemplate from '@/components/Global/PaginatorTemplate';
import { IoIosArrowDown } from 'react-icons/io';

export default function ProductsTable({
  selectedDate,
  searchValue,
  products,
  handleChangeSelectedProducts,
  selectedProducts,
}: {
  searchValue: string;
  selectedDate: number | null;
  products: IProducts | undefined;
  handleChangeSelectedProducts: (e: any) => void;
  selectedProducts: IProducts;
}) {
  const cookies = new Cookies();
  const httpService = new HTTPService();

  const router = useRouter();

  // const [selectedProducts, setSelectedProducts] = useState<IProduct[] | null>(
  //   null
  // );
  const [rowClick, setRowClick] = useState<boolean>(true);

  async function deleteProduct(id: number) {
    const token = cookies.get('urban-token');

    if (
      confirm(
        'Are you sure you want to delete this product? This action cannot be undone'
      )
    ) {
      toast.loading('Deleting product...');

      // const res = await httpService.delete(
      //   ENDPOINTS.PRODUCTS,
      //   String(id),
      //   `Bearer ${token}`
      // );
      const res = await httpService.deleteById(
        `${ENDPOINTS.PRODUCTS}?id=${String(id)}`,
        `Bearer ${token}`
      );

      toast.dismiss();
      if (res.status === 200) {
        console.log(res);
        toast.success('Product successfully deleted');
      } else toast.error('Cannot delete product at this time');
    }
  }

  const dateTemplate = (product: IProduct) =>
    moment(product.createdAt).format('MMM Do YYYY, h:mm a');

  function amountTemplate(product: IProduct) {
    return formatCurrency(+product.amount);
  }

  function actionTemplate(product: IProduct) {
    return (
      <div className='flex items-center gap-3'>
        <Link
          href={`/admin/products/${product.id}`}
          className='text-xl text-neutral'
        >
          <FaEye />
        </Link>
        <Link
          href={`/admin/products/${product.id}/edit`}
          className='text-xl text-neutral'
        >
          {/* <RxPencil2 /> */}
          <MdOutlineModeEdit />
        </Link>
        <button onClick={() => deleteProduct(product.id)}>
          <RiDeleteBin6Line className='text-xl' />
        </button>
      </div>
    );
  }

  function checkIfUrl(imageUrl: string) {
    if (!/^https?:\/\//.test(imageUrl) && !/^\/ /.test(imageUrl)) {
      // console.error(`Invalid image URL: ${imageUrl}`);
      // // You can also return a default image or a placeholder here
      // imageUrl = '/default-image.jpg'; // Replace with your default image
      return false;
    }
    return true;
  }

  function productTemplate(product: IProduct) {
    return (
      <div className='flex items-center gap-4'>
        {product.imageUrls?.length > 0 && checkIfUrl(product?.imageUrls[0]) ? (
          <Image
            src={product.imageUrls[0]}
            alt={product.description}
            width={20}
            height={20}
            className='h-12 w-12 bg-[#1b1b1b] rounded-md'
          />
        ) : (
          <div className='h-12 w-12 bg-[#1b1b1b] rounded-md'></div>
        )}
        {/* <p className='text-sm flex-1'>{product?.name}</p> */}
        <div className='flex-1'>
          <p className='text-sm font-medium'>{product?.name}</p>
          <p className='text-neutral text-sm font-light'>
            {`${product?.productVarations.length} variations`}
          </p>
        </div>
      </div>
    );
  }

  function skuTemplate(product: IProduct) {
    return <p className="text-[#CFA31C]">{product.sku}</p>
  }

  // const dateChangeHandler = (e: any) => {
  //   handleChangeSelectedProducts(e.value);
  // };

  const getProductsByDate = useMemo(() => {
    if (selectedDate) {
      return products?.filter(
        (product) => moment(product.createdAt).valueOf() >= selectedDate
      );
    } else return products;
  }, [products, selectedDate]);

  const matchedProducts = useMemo(() => {
    if (searchValue.trim().length === 0) return getProductsByDate;

    return getProductsByDate?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue)
    );
  }, [getProductsByDate, searchValue]);

  return (
    <div className='card rounded-xl p-4 bg-white border border-gray-200'>
      <div className='px-4 flex flex-col w-full justify-between lg:flex-row lg:items-center gap-8 mb-8'>
        <p className='font-bold text-xl text-gray-700'>Products Table</p>
      </div>
      <DataTable
        value={matchedProducts}
        selectionMode={rowClick ? null : 'multiple'}
        selection={selectedProducts!}
        // onSelectionChange={dateChangeHandler}
        onSelectionChange={handleChangeSelectedProducts}
        dataKey='id'
        tableStyle={{ minWidth: '50rem' }}
        paginator
        paginatorTemplate={paginatorTemplate}
        paginatorClassName='flex justify-between'
        rows={10}
        rowsPerPageOptions={[20, 50, 100]}
        className='rounded-xl text-sm capitalize'
        sortOrder={-1}
        sortField='createdAt'
        sortIcon={<IoIosArrowDown />}
        alwaysShowPaginator={true}
        onRowClick={(e) => router.push(`/admin/products/${e.data.id}`)}
      >
        <Column selectionMode='multiple' headerStyle={{ width: '3rem' }} />
        <Column field='product.item' header='Product' body={productTemplate} />
        <Column field='sku' header='SKU' sortable body={skuTemplate}/>
        <Column field='category.name' header='Category' sortable />
        <Column field='amount' header='Stock' sortable />
        <Column
          field='totalAmount'
          header='Price'
          body={amountTemplate}
          sortable
        />
        <Column
          field='status'
          header='Status'
          sortable
          body={productStatusTemplate}
        />
        <Column field='createdAt' header='Added' body={dateTemplate} sortable />
        <Column field='action' header='Action' body={actionTemplate} />
      </DataTable>
    </div>
  );
}
