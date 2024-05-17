import React from 'react';
import PageHeading from './components/PageHeading';

export default function Loading() {
  return (
    <div className='p-4'>
      <PageHeading />
      <div className='skeleton-loader p-8' />
      <div className='skeleton-loader p-32' />
    </div>
  );
}
