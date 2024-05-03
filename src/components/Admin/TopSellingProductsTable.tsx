'use client';

// import Button from '@/components/Global/Button';
import { formatCurrency } from '@/helpers';
import { IOrder, OrderProductItem } from '@/interfaces/orders';
import { IProducts } from '@/interfaces/products';
import moment from 'moment';
import Image from 'next/image';
// import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
// import { FaEye } from 'react-icons/fa';
// import { RxPencil2 } from 'react-icons/rx';
import { productStatusTemplate } from '@/helpers/products';
import { IProduct } from '@/interfaces/products';
import paginatorTemplate from '../Global/PaginatorTemplate';

export default function TopSellingProductsTable({
  products,
}: {
  products: IProducts | null | undefined;
}) {
//   const [rowClick, setRowClick] = useState<boolean>(true);

  // const dateTemplate = (order: IOrder) => {
  //   const { createdAt } = order;

  //   return moment(createdAt).format('MMM Do YYYY, h:mm a');
  // };

  function amountTemplate(product: IProduct) {
    return formatCurrency(+product.amount);
  }

//   function productTemplate(order: IOrder) {
//     return (
//       <div className='flex items-center gap-4'>
//         <Image
//           src={order.orderProduct[0].image}
//           alt='image'
//           width={20}
//           height={20}
//           className='h-12 w-12 bg-[#1b1b1b] rounded-md'
//         />

//         <div className='div capitalize'>
//           <p className='text-sm flex-1 font-medium'>
//             {order.orderProduct[0].productName}
//           </p>
//           {order.orderProduct.length > 1 && (
//             <p className='text-xs text-neutral'>
//               +{order.orderProduct.length} other products
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   }

  // function customerTemplate(order: IOrder) {
  //   return (
  //     <div className='flex flex-col gap-2 capitalize'>
  //       <p className='text-sm flex-1 font-medium'>{order.receiverName}</p>
  //       <p className='text-xs text-neutral'>{order.receiverPhone}</p>
  //     </div>
  //   );
  // }

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
            {`SKU: ${product?.sku}`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='card rounded-xl p-4 bg-white border border-gray-200'>
      <DataTable
        value={products ?? []}
        // selectionMode={rowClick ? null : 'multiple'}
        // selection={selectedOrders!}
        // onSelectionChange={handleChangeSelectedOrders}
        dataKey='uuid'
        tableStyle={{ minWidth: '50rem' }}
        paginator
        paginatorTemplate={paginatorTemplate}
        paginatorClassName='flex'
        rows={20}
        rowsPerPageOptions={[20, 50, 100, 250]}
        className='rounded-md text-sm'
        sortOrder={-1}
        sortField='createdAt'
      >
        {/* <Column selectionMode='multiple' headerStyle={{ width: '3rem' }} /> */}
        {/* <Column field='uuid' header='Order ID' /> */}
        <Column body={productTemplate} header='Product' />
        <Column field='sales' header='Sales' sortable />
        <Column
          field='amount'
          body={amountTemplate}
          header='Amount'
        />
        <Column
          field='amount'
          header='Price'
          body={amountTemplate}
          sortable
        />
        {/* <Column body='Mastercard' header='Payment' /> */}
        <Column field='status' header='Status' sortable body={productStatusTemplate} />
      </DataTable>
    </div>
  );
}
