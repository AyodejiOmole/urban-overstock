'use client';

import paginatorTemplate from '@/components/Global/PaginatorTemplate';
import { IDiscountCode, IDiscountCodes } from '@/interfaces/discount-codes';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { RxPencil2 } from 'react-icons/rx';

// export interface IDiscountCode {
//   _id: string;
//   code: string;
//   percentage: number;
//   status: 'active' | 'inactive';
// }

// const codes: IDiscountCode[] = [
//   {
//     _id: '1',
//     code: '302020',
//     percentage: 10,
//     status: 'active',
//   },
//   {
//     _id: '2',
//     code: '302021',
//     percentage: 20,
//     status: 'inactive',
//   },
//   {
//     _id: '3',
//     code: '302023',
//     percentage: 30,
//     status: 'inactive',
//   },
//   {
//     _id: '4',
//     code: '402024',
//     percentage: 40,
//     status: 'inactive',
//   },
//   {
//     _id: '5',
//     code: '502025',
//     percentage: 50,
//     status: 'active',
//   },
//   {
//     _id: '6',
//     code: '602026',
//     percentage: 60,
//     status: 'active',
//   },
//   {
//     _id: '7',
//     code: '702027',
//     percentage: 70,
//     status: 'inactive',
//   },
// ];

export default function DiscountCodesTable({
  discounts
}: {
  discounts: IDiscountCodes | undefined,
}) {
  console.log(discounts);
  const [selectedCode, setSelectedCode] = useState<IDiscountCode[] | null>(
    null
  );
  const [rowClick, setRowClick] = useState<boolean>(true);

  function actionTemplate(discount: IDiscountCode) {
    return (
      <div className='flex items-center gap-3 justify-end'>
        <Link
          // href={`/admin/discount-codes/${discount.id}?code=${discount.code}&percentage=${discount.percentage}`}
          href={`/admin/discount-codes/edit?id=${discount.id}&code=${discount.code}&percentage=${discount.percentage}`}
          className='text-xl text-neutral'
        >
          <FaEye />
        </Link>
        <Link
          href={`/admin/discount-codes/edit?id=${discount.id}&code=${discount.code}&percentage=${discount.percentage}`}
          className='text-xl text-neutral'
        >
          <RxPencil2 />
        </Link>
      </div>
    );
  }

  function statusTemplate(order: IDiscountCode) {
    const { status } = order;

    let styles = '';

    switch (status.toLowerCase()) {
      case 'active':
        styles = 'bg-green-100 text-green-600';
        break;
      case 'inactive':
        styles = 'bg-red-100 text-red-600';
        break;
    }

    return (
      <span className={`p-1 px-4 text-xs rounded-full capitalize ${styles}`}>
        {order.status}
      </span>
    );
  }

  const selectRowHandler = (e: any) => {
    setSelectedCode(e.value);
  };

  function percentageTemplate(discount: IDiscountCode) {
    return `${discount.percentage}%`;
  }

  return (
    <div className='card rounded-md p-4 bg-white border border-gray-200'>
      <DataTable
        value={discounts}
        selectionMode={rowClick ? null : 'multiple'}
        selection={selectedCode!}
        onSelectionChange={selectRowHandler}
        dataKey='id'
        tableStyle={{ minWidth: '50rem' }}
        paginator
        rows={5}
        rowsPerPageOptions={[25, 50, 100]}
        paginatorTemplate={paginatorTemplate}
        paginatorClassName='flex justify-between'
        className='rounded-md text-sm'
        sortOrder={-1}
        sortField='id'
        sortIcon={<IoIosArrowDown />}
      >
        <Column
          selectionMode='multiple'
          headerStyle={{ width: '3rem' }}
          className='group'
          
        ></Column>
        <Column
          field='code'
          header='Code'
          className='text-primary font-medium'
        ></Column>
        <Column
          field='percentage'
          header='Percentage Off'
          body={percentageTemplate}
          sortable
        ></Column>
        <Column
          field='status'
          header='Status'
          align='right'
          body={statusTemplate}
        ></Column>
        <Column
          field='action'
          header='Action'
          align='right'
          body={actionTemplate}
        ></Column>
      </DataTable>
    </div>
  );
}
