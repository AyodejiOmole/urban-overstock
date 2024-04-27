import Image from 'next/image';
import React from 'react';
import appScreenshot from '../../../public/assets/app-screenshot-1.png';
import blur from '../../../public/assets/blur/blur-1.png';
import urbanFashionStore from '../../../public/assets/icons/urban-fashion-store.png';
import iphone4 from '../../../public/assets/iphone-4.png';

export default function AboutUs() {
  return (
    <section
      id='about-us'
      className='p-6 sm:px-8 lg:px-16 xl:px-32 2xl:px-40 pt-16 pb-16 bg-white grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 items-center'
    >
      <div>
        <p
          className='font-semibold text-primary-2 uppercase mb-2 text-lg'
          data-aos='fade-right'
        >
          About Us
        </p>
        <h3
          className='font-medium text-gray-800 mb-8 text-4xl sm:text-5xl xl:text-6xl'
          data-aos='fade-right'
        >
          What is Urban Overstock?
        </h3>

        <div className='max-w-xl'>
          {/*  */}
          <div className='my-8' data-aos='fade-left'>
            <div className='flex items-center gap-4 mb-4'>
              <Image
                src={urbanFashionStore}
                alt='Urban Fashion Store Icon'
                width={48}
              />
              <p className='font-gray-800 text-xl md:text-2xl'>
                Urban Fashion Store
              </p>
            </div>
            <p className='text-gray-600 font-light sm:text-lg'>
              Our app offers a seamless shopping experience, making it
              effortless to browse, discover, and purchase your favorite urban
              fashion pieces. With intuitive navigation and efficient
              functionality, shopping has never been easier or more enjoyable.
            </p>
          </div>
        </div>
      </div>
      {/*  */}
      <div className='relative'>
        <Image
          src={appScreenshot}
          alt='app screenshot mobile app'
          width={400}
          className='w-2/3 sm:w-1/2 mx-auto absolute top-16 z-20'
          data-aos='fade-left'
        />
        <Image
          src={iphone4}
          alt='urban overstock mobile app'
          width={400}
          className='w-2/3 sm:w-[45%] mx-auto relative z-10'
          data-aos='fade-right'
        />
        <Image
          src={blur}
          alt='blur'
          width={200}
          className='absolute bottom-0 -left-8 w-full z-0'
        />
      </div>
    </section>
  );
}
