import React from 'react';
import Button from './Button';

export default function ErrorComponent({
  error,
  reset,
}: {
  error: string;
  reset: () => void;
}) {
  return (
    <div className='p-8 flex items-center justify-center flex-col min-h-[80vh]'>
      <p className='mb-12 text-4xl text-gray-700 capitalize'>
        {error ?? 'Something went wrong!'}
      </p>
      <div className='flex items-center justify-center gap-2'>
        <Button type='button' onClick={reset}>
          Try again
        </Button>
        <Button
          type='button'
          onClick={() => window.location.reload()}
          color='dark'
        >
          Reload Page
        </Button>
      </div>
    </div>
  );
}
