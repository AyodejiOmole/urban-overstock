import Loader from '@/components/Shared/Loader';
import React from 'react';

export default function OrderDetailsLoader() {
  return (
    <div
      className={`mx-2 rounded-none w-full fixed left-0 top-0 bottom-0 right-0 h-full bg-white/10 backdrop-blur-md z-30 flex items-center justify-center`}
    >
      <Loader />
    </div>
  );
}
