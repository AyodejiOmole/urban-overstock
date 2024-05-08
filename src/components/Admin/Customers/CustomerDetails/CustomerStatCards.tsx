import { formatCurrency } from '@/helpers';
import React from 'react';
import { IoWalletOutline } from 'react-icons/io5';

export default function CustomerStatCards({
  orderCount,
  orderBalance,
  rewardPoint,
}: {
  orderCount: number | undefined,
  orderBalance: number | undefined,
  rewardPoint: number | undefined,
}) {
  const card_icon_style =
    'h-12 w-12 text-xl flex items-center justify-center rounded-full';

  return (
    <section className='my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
      {/*  */}
      <div className='rounded-lg bg-white border border-neural p-6'>
        <span className={`${card_icon_style} bg-green-50 text-green-700`}>
          <IoWalletOutline />
        </span>
        <p className='my-3 text-neutral text-sm'>Total Balance</p>
        <p className='text-gray-700 text-2xl font-bold'>
          {formatCurrency(orderBalance ?? 0)}
        </p>
      </div>
      {/*  */}
      <div className='rounded-lg bg-white border border-neural p-6'>
        <span className={`${card_icon_style} bg-orange-50 text-orange-700`}>
          <IoWalletOutline />
        </span>
        <p className='my-3 text-neutral text-sm'>Total Orders</p>
        <p className='text-gray-700 text-2xl font-bold'>
          {(orderCount ?? 0).toLocaleString()}
        </p>
      </div>
      {/*  */}
      <div className='rounded-lg bg-white border border-neural p-6'>
        <span className={`${card_icon_style} bg-purple-50 text-purple-700`}>
          <IoWalletOutline />
        </span>
        <p className='my-3 text-neutral text-sm'>Rewards Point</p>
        <p className='text-gray-700 text-2xl font-bold'>
          {(rewardPoint ?? 0).toLocaleString()}
        </p>
      </div>
    </section>
  );
}
