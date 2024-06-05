'use client';

import paginatorTemplate from '@/components/Global/PaginatorTemplate';
import { INotification, INotifications } from '@/interfaces/notifications';
import moment from 'moment';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Cookies from 'universal-cookie';
import HTTPService from '@/services/http';
import toast from 'react-hot-toast';
import ENDPOINTS from '@/config/ENDPOINTS';
import { useRouter } from 'next/navigation';
import { IoCheckmarkDoneOutline } from "react-icons/io5";

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

  const cookies = new Cookies();
  const httpService = new HTTPService();
  
  const router = useRouter();

  async function markNotificationAsRead (id: number) {
      const token = cookies.get('urban-token');
      toast.loading('Marking as read...');

      const res = await httpService.patchById(
        `${ENDPOINTS.NOTIFICATIONS}/mark-as-viewed/${String(id)}`,
        `Bearer ${token}`
      );

      toast.dismiss();
      if (res.status === 200) {
        console.log(res);
        toast.success('Notification marked as read.');
        router.refresh();
      } else toast.error('Cannot update notification at this time.');
  }

  function actionTemplate(notification: INotification) {
    return (
      <div className='flex items-center gap-3 justify-end'>
        <button onClick={() => markNotificationAsRead(notification.id)}>
          <IoCheckmarkDoneOutline className='text-xl'/>
        </button>
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
        <Column field='metadataType' header='Notification Type' sortable></Column>
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
        <Column
          field='action' 
          header='Action'
          body={actionTemplate}
        ></Column>
      </DataTable>
    </div>
  );
}
