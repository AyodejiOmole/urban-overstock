import React from 'react';
import { getReturnRequestById } from '@/libs/return-requests';
import { IReturnRequest } from '@/interfaces/return-requests';
// import Button from '@/components/Global/Button';
// import Pagination from '@/components/Shared/Pagination';
import ReturnRequestDetails from '@/components/Admin/ReturnRequests/ReturnRequestDetails';
// import Cookies from 'universal-cookie';
// import HTTPService from '@/services/http';
// import ENDPOINTS from '@/config/ENDPOINTS';
// import toast from 'react-hot-toast';

export default async function AdminReturnRequestDetails({ params }: { params: { id: string } }) {
  const apiRes: Promise<IReturnRequest | null> = getReturnRequestById(params.id);
  const returnRequestDetails = await apiRes;

  return (
    <section className='py-8'>
      <ReturnRequestDetails returnRequestDetails={returnRequestDetails} id={params.id}/>
    </section>
  );
}
