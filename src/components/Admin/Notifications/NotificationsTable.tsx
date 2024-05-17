'use client';

import paginatorTemplate from '@/components/Global/PaginatorTemplate';
import { INotification, INotifications } from '@/interfaces/notifications';
import moment from 'moment';
import Link from 'next/link';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { RxPencil2 } from 'react-icons/rx';

export interface INotificationType {
  _id: string;
  type: string;
  userType: 'admin' | 'shopper';
  displayLocation: 'in-app' | 'external';
  message: string;
}

// {
//   notifications
// }: {
//   notifications: INotifications | null
// }

// const notifications: INotificationType[] = [
//   {
//     _id: '1',
//     type: 'order shipped',
//     userType: 'shopper',
//     displayLocation: 'in-app',
//     message: 'Your order #30132 has been shipped',
//   },
//   {
//     _id: '2',
//     type: 'order out for delivery',
//     userType: 'shopper',
//     displayLocation: 'in-app',
//     message: 'Your order #305671 has been shipped',
//   },
//   {
//     _id: '3',
//     type: 'order cancellation',
//     userType: 'admin',
//     displayLocation: 'external',
//     message: 'User John Doe has cancelled order #654321',
//   },
// ];

export default function NotificationsTable({
  notifications
}: {
  notifications: INotifications | undefined;
}) {
  const [selectedCode, setSelectedCode] = useState<INotifications | null>(
    null
  );

  console.log(notifications);
  const [rowClick, setRowClick] = useState<boolean>(true);

  function actionTemplate(discount: INotificationType) {
    return (
      <div className='flex items-center gap-3 justify-end'>
        <Link
          href={`/admin/discount-notifications/${discount._id}?edit=false`}
          className='text-xl text-neutral'
        >
          <FaEye />
        </Link>
        <Link
          href={`/admin/discount-notifications/${discount._id}?edit=true`}
          className='text-xl text-neutral'
        >
          <RxPencil2 />
        </Link>
      </div>
    );
  }

  const selectRowHandler = (e: any) => {
    setSelectedCode(e.value);
  };

  const dateTemplate = (notif: INotification) =>
    moment(notif.createdAt).format('MMM Do YYYY, h:mm a');

  return (
    <div className='card rounded-md p-4 bg-white border border-gray-200'>
      <DataTable
        value={notifications}
        selectionMode={rowClick ? null : 'multiple'}
        selection={selectedCode!}
        onSelectionChange={selectRowHandler}
        dataKey='id'
        tableStyle={{ minWidth: '50rem' }}
        paginator
        rows={20}
        rowsPerPageOptions={[25, 50, 100]}
        className='rounded-md text-sm capitalize'
        paginatorTemplate={paginatorTemplate}
        paginatorClassName='flex justify-between'
        sortOrder={-1}
        sortField='id'
        sortIcon={<IoIosArrowDown />}
      >
        <Column field='metadateType' header='Notification Type' sortable></Column>
        <Column field='title' header='User Type' sortable></Column>
        {/* <Column
          field='displayLocation'
          header='Display Location'
          sortable
        ></Column> */}
        <Column
          field='createdAt'
          header='Date'
          sortable
          body={dateTemplate}
        ></Column>
        <Column
          field='body'
          header='Message'
          sortable
          className='text-gray-500'
        ></Column>
      </DataTable>
    </div>
  );
}
