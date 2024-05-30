import React from 'react';
import { getReturnRequestById } from '@/libs/return-requests';
import { IReturnRequest } from '@/interfaces/return-requests';
import ReturnRequestDetails from '@/components/Admin/ReturnRequests/ReturnRequestDetails';

export default async function AdminReturnRequestDetails({ params }: { params: { id: string } }) {
  const apiRes: Promise<IReturnRequest | null> = getReturnRequestById(params.id);
  const returnRequestDetails = await apiRes;

  return (
    <section className='py-8'>
      <ReturnRequestDetails returnRequestDetails={returnRequestDetails} id={params.id}/>
    </section>
  );
}
