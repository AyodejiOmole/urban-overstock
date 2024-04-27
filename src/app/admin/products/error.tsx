'use client';
import ErrorComponent from '@/components/Global/ErrorComponent';
import { useEffect, useState } from 'react';
import PageHeading from './components/PageHeading';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [generatedError, setGeneratedError] = useState('');

  useEffect(() => {
    console.error(error);

    if (error) {
      setGeneratedError(error.message);
    }
  }, [error]);

  return (
    <section className='py-8'>
      <PageHeading />
      <ErrorComponent error={generatedError} reset={reset} />
    </section>
  );
}
