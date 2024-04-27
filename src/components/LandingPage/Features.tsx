import Image from 'next/image';
import React from 'react';
import blur from '../../../public/assets/blur/blur-1.png';
import cube1 from '../../../public/assets/icons/cube-1.png';
import cube2 from '../../../public/assets/icons/cube-2.png';
import star from '../../../public/assets/icons/star.png';
import iphone3 from '../../../public/assets/iphone-3.png';

export default function Features() {
  return (
    <section
      id='features'
      className='p-6 sm:px-8 lg:px-16 xl:px-32 2xl:px-40 pt-16 pb-16 bg-white grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 mt-[100%] lg:mt-[5%] xl:mt-[20%] items-center'
    >
      <div className='relative'>
        <Image
          src={iphone3}
          alt='urban overstock mobile app'
          width={400}
          className='w-2/3 sm:w-[45%] mx-auto relative z-10'
          data-aos='fade-right'
        />

        <Image
          src={blur}
          alt='blur'
          width={200}
          className='absolute -top-16 -right-16 w-full z-0'
        />
      </div>

      <div>
        <p className='font-semibold text-primary-2 uppercase mb-2 text-lg'>
          Features
        </p>
        <h2 className='font-medium text-gray-800 mb-8 text-4xl sm:text-5xl xl:text-6xl'>
          Urban Overstock
        </h2>

        <div className='max-w-xl'>
          {/*  */}
          <div className='my-8' data-aos='fade-left'>
            <div className='flex items-center gap-4 mb-2'>
              <Image src={star} alt='Star Icon' width={24} />
              <p className='font-gray-800'>Curated Collections</p>
            </div>
            <p className='text-gray-600 font-light sm:text-lg'>
              Step into a world of handpicked urban fashion, from streetwear
              staples to bold statement pieces.
            </p>
          </div>
          {/*  */}
          <div className='my-8' data-aos='fade-left'>
            <div className='flex items-center gap-4 mb-2'>
              <Image src={cube1} alt='Star Icon' width={24} />
              <p className='font-gray-800'>Interactive Shopping Experience</p>
            </div>
            <p className='text-gray-600 font-light sm:text-lg'>
              Shop effortlessly. Explore trends, discover details, and purchase
              seamlessly with our intuitive app.
            </p>
          </div>
          {/*  */}
          <div className='my-8' data-aos='fade-left'>
            <div className='flex items-center gap-4 mb-2'>
              <Image src={cube2} alt='Star Icon' width={24} />
              <p className='font-gray-800'>Personalized Recommendations</p>
            </div>
            <p className='text-gray-600 font-light sm:text-lg'>
              Get style recommendations tailored just for you. Our app learns
              your preferences for a truly personalized shopping experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
