import NotificationsTable from '@/components/Admin/Notifications/NotificationsTable';
import React from 'react';
import PageHeading from "./components/PageHeading"
// import getAllNotifications from '@/libs/notifications';
// import {INotifications} from '@/interfaces/notifications';

export default async function AdminNotifications() {
  // const apiRes: Promise<INotifications | undefined> = getAllNotifications();
  // const notifications = await apiRes;

  // console.log(notifications);
  
  return (
    <section className='py-4'>
      <PageHeading />
      <NotificationsTable />
      {/* notifications={notifications} */}
    </section>
  );
}
