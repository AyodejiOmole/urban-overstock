import Image from 'next/image';
import React from 'react';
import blur from '../../../public/assets/blur/blur-1.png';
import fashionMan from '../../../public/assets/fashion-man.png';
import trendsetting from '../../../public/assets/icons/trendsetting.png';
import iphone5 from '../../../public/assets/iphone-5.png';

export default function WhyUs() {
  return (
    <section
      id='why-us'
      className='p-6 sm:px-8 lg:px-16 xl:px-32 2xl:px-40 pt-16 pb-16 bg-white grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center'
    >
      <div className='relative'>
        <Image
          src={fashionMan}
          alt='app screenshot mobile app'
          width={400}
          className='w-[45%] mx-auto absolute top-1/4 right-8 z-20'
          data-aos='fade-left'
        />
        <Image
          src={iphone5}
          alt='urban overstock mobile app'
          width={400}
          className='w-2/3 sm:w-[45%] mx-auto relative z-10'
          data-aos='fade-right'
        />

        <Image
          src={blur}
          alt='blur'
          width={200}
          className='absolute -bottom-16 -left-16 w-full z-0'
        />
      </div>
      {/*  */}
      <div>
        <p
          className='font-semibold text-primary-2 uppercase mb-2 text-lg'
          data-aos='fade-left'
        >
          Why Us
        </p>
        <h4
          className='font-medium text-gray-800 mb-8 text-4xl sm:text-5xl xl:text-6xl'
          data-aos='fade-left'
        >
          Why Choose Urban Overstock?
        </h4>

        <div className='max-w-xl'>
          {/*  */}
          <div className='my-8' data-aos='fade-right'>
            <div className='flex items-center gap-4 mb-4'>
              <Image
                src={trendsetting}
                alt='Urban Fashion Store Icon'
                width={48}
              />
              <p className='font-gray-800 text-xl md:text-2xl'>
                Trendsetting Styles
              </p>
            </div>
            <p className='text-gray-600 font-light sm:text-lg'>
              With our app, you gain exclusive access to the latest urban
              fashion trends before they hit mainstream. Stay ahead of the curve
              and make a style statement that sets you apart from the crowd.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
