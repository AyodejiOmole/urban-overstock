import React from 'react';
import ReturnRequests from '@/components/Admin/ReturnRequests/ReturnRequests';
import getReturnRequests from '@/libs/return-requests';
import { IReturnRequests } from '@/interfaces/return-requests';

export default async function AdminHomeSlideshow() {
  const apiRes: Promise<IReturnRequests | null> = getReturnRequests();
  const returnRequests = await apiRes;

  console.log(returnRequests);
  return (
    <section>
      
      <ReturnRequests orders={returnRequests}/>
    </section>
  );
}
