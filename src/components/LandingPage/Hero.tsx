import Image from 'next/image';
import React from 'react';
import appstoreBtn from '../../../public/assets/appstore-btn.png';
import blur from '../../../public/assets/blur/blur-1.png';
import iphone1 from '../../../public/assets/iphone-1.png';
import iphone2 from '../../../public/assets/iphone-2.png';
import playstoreBtn from '../../../public/assets/playstore-btn.png';

export default function Hero() {
  return (
    <header className='p-6 sm:px-8 lg:px-16 xl:px-32 2xl:px-40 pt-60 pb-24 bg-white grid grid-cols-1 lg:grid-cols-2 gap-16'>
      <div className='relative'>
        <Image
          src={blur}
          alt='blur'
          width={200}
          className='absolute -top-32 lg:-top-40 right-10 w-full z-[1] opacity-80'
        />

        <div className='relative z-10'>
          <h1 className='text-5xl font-bold sm:text-6xl xl:text-7xl'>
            Find your style
          </h1>
          <p className='text-gray-600 my-6 sm:text-lg max-w-2xl font-light'>
            Discover a lifestyle where urban culture meets cutting-edge style at
            Urban Overstock. Our app brings you the latest trends in urban
            fashion with a touch of uniqueness, delivered through an engaging
            and interactive platform.
          </p>
          <div className='flex items-center gap-4'>
            {/* Appstore link */}
            <a href='#'>
              <Image
                src={appstoreBtn}
                alt='Download urban restock app on playstore'
                width={160}
              />
            </a>

            {/* Playstore link */}
            <a href='#'>
              <Image
                src={playstoreBtn}
                alt='Download urban restock app on playstore'
                width={160}
              />
            </a>
          </div>
        </div>
      </div>
      {/*  */}
      <div className='relative flex items-center justify-center'>
        <Image
          src={iphone2}
          alt='Urban Overstock Home 1'
          className='w-3/4 absolute left-12 -top-8 lg:-left-0 lg:-top-16 z-index-pulse-1'
          width={400}
        />
        <Image
          src={iphone1}
          alt='Urban Overstock Home 2'
          className='w-3/4 absolute left-0 top-8 lg:-left-24 lg:-top-32 z-index-pulse-2'
          width={400}
        />
      </div>
    </header>
  );
}
