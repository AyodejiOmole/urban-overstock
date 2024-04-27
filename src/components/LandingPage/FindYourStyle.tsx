import Image from 'next/image';
import React from 'react';
import appstoreBtn from '../../../public/assets/appstore-btn.png';
import iphone6 from '../../../public/assets/iphone-6.png';
import playstoreBtn from '../../../public/assets/playstore-btn.png';

export default function FindYourStyle() {
  return (
    <section className='p-2 sm:px-8 lg:px-16 xl:px-32 2xl:px-40 pt-24 pb-24 bg-white'>
      <div className='p-8 py-16 bg-primary grid grid-cols-1 lg:grid-cols-2 gap-8 rounded-3xl xl:px-16 items-center'>
        <div>
          <h5 className='text-4xl font-semibold md:text-5xl xl:text-6xl capitalize'>
            Ready to find your style?
          </h5>
          <p className='text-gray-600 my-6 sm:text-lg max-w-2xl font-light'>
            Download the Urban Overstock app for exclusive access to the latest
            trends and a seamless shopping experience. Your fashion revolution
            awaits - get the app today!
          </p>

          <div className='flex items-center gap-4'>
            {/* Appstore Link */}
            <a href='#'>
              <Image
                src={appstoreBtn}
                alt='Download urban restock app on appstore'
                width={160}
              />
            </a>

            {/* Play Store */}
            <a href='#'>
              <Image
                src={playstoreBtn}
                alt='Download urban restock app on playstore'
                width={160}
              />
            </a>
          </div>
        </div>

        {/*  */}

        <Image
          src={iphone6}
          alt='Urban Overstock Home 1'
          width={400}
          className='block mx-auto max-w-96'
        />
      </div>
    </section>
  );
}
