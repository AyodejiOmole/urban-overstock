import clsx from 'clsx/lite';
import React from 'react';

export default function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('rounded-2xl bg-white p-4 min-h-80', className)}>
      {children}
    </div>
  );
}
