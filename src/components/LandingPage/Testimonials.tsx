'use client';

import { Testimonial, type Testimonials } from '@/interfaces';
import { testimonials } from '@/static';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import blur from '../../../public/assets/blur/blur-5.png';
import testimonialIcon from '../../../public/assets/icons/testimonial-icons.png';

export default function Testimonials() {
  const [activeTestimony, setActiveTestimony] = useState(0);
  const [inactiveTestimonials, setInactiveTestimonials] =
    useState<Testimonials>([]);

  useEffect(() => {
    const notActive = testimonials.filter(
      (el: Testimonial) => el.title !== testimonials[activeTestimony].title
    );

    setInactiveTestimonials(notActive);
  }, [activeTestimony]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimony((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id='testimonial'
      className='p-6 sm:px-8 lg:px-16 xl:px-32 2xl:px-40 pt-16 pb-16 bg-white'
    >
      <div className='text-center mb-16'>
        <p className='text-gray-800 uppercase mb-2 text-lg' data-aos='zoom-in'>
          Testimonial
        </p>
        <h5
          className='font-medium text-gray-800 text-4xl sm:text-5xl max-w-xl mx-auto capitalize'
          data-aos='zoom-in'
        >
          what our users say about us?
        </h5>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center mt-16'>
        <div className=' h-full w-full'>
          <div className='mx-auto h-80 w-80 relative mt-8'>
            <Image
              src={blur}
              alt='blur'
              className='w-[300%] absolute -bottom-16 -left-16 z-10'
              data-aos='zoom-in'
            />
            <Image
              src={blur}
              alt='blur'
              className='w-full absolute bottom-0 -right-16 z-10 rotate-180'
              data-aos='zoom-in'
            />
            <Image
              src={blur}
              alt='blur'
              className='w-full absolute -top-16 -right-8 z-10'
              data-aos='zoom-in'
            />

            {/* Testimonial Icon */}
            <Image
              src={testimonialIcon}
              alt='Urban Overstock Home 1'
              width={100}
              className='absolute bottom-1/2 translate-y-1/2 -right-8 z-20'
              data-aos='fade-left'
            />

            {/* Testimonial Images */}

            <Image
              src={testimonials[activeTestimony].imgUrl}
              alt={testimonials[activeTestimony].user}
              className='mx-auto h-72 w-52 sm:h-80 sm:w-60 bg-gray-500 rounded-[100%] border-2 border-black z-10 relative object-cover duration-500'
              data-aos='zoom-in'
            />

            {inactiveTestimonials && inactiveTestimonials.length > 0 && (
              <>
                <Image
                  src={inactiveTestimonials[0].imgUrl}
                  alt={inactiveTestimonials[0].user}
                  className='mx-auto h-24 w-24 sm:h-28 sm:w-28 bg-gray-500 rounded-[100%] border-2 border-black absolute -top-8 -right-8 sm:-top-16 sm:-right-16 z-10 duration-500'
                  data-aos='fade-left'
                />
                <Image
                  src={inactiveTestimonials[1].imgUrl}
                  alt={inactiveTestimonials[1].user}
                  className='mx-auto h-20 w-20 sm:h-24 sm:w-24 bg-gray-500 rounded-[100%] border-2 border-black absolute -bottom-4 -right-4 sm:-bottom-16 sm:-right-16 z-10 duration-500'
                  data-aos='fade-left'
                />
                <Image
                  src={inactiveTestimonials[2].imgUrl}
                  alt={inactiveTestimonials[2].user}
                  className='mx-auto h-24 w-24 sm:h-28 sm:w-28 bg-gray-500 rounded-[100%] border-2 border-black absolute -bottom-4 -left-4 sm:-bottom-16 sm:-left-16 z-10 duration-500'
                  data-aos='fade-right'
                />
                <Image
                  src={inactiveTestimonials[3].imgUrl}
                  alt={inactiveTestimonials[3].user}
                  className='mx-auto h-20 w-20 sm:h-24 sm:w-24 bg-gray-500 rounded-[100%] border-2 border-black absolute -top-4 -left-4 sm:-top-12 sm:-left-12 z-10 duration-500'
                  data-aos='fade-right'
                />
              </>
            )}
          </div>
        </div>
        {/*  */}
        <div className='max-w-xl mt-16 lg:mt-0'>
          {testimonials.map((el, index) => (
            <div
              key={index}
              className={`my-4 testimony ${
                index === activeTestimony ? 'active-testimony' : ''
              }`}
            >
              <p
                className='font-gray-800 text-xl md:text-2xl mb-8 capitalize duration-500'
                data-aos='fade-right'
              >
                {el.title}
              </p>

              <p
                className='text-gray-600 font-light sm:text-lg duration-500 min-h-48'
                data-aos='fade-left'
              >
                {el.body}
              </p>
            </div>
          ))}
          {/* Testimonials */}

          <div className='flex flex-wrap gap-4 items-start'>
            {testimonials.map((el, index) => (
              <div key={el.title}>
                <div
                  className={`p-4 h-12 w-12 rounded-full duration-500 bg-gray-800 ${
                    index === activeTestimony ? 'opacity-100' : 'opacity-20'
                  }`}
                ></div>
                <p
                  className={`mt-2 text-sm duration-500 ${
                    index === activeTestimony ? 'block' : 'hidden'
                  }`}
                >
                  {el.user}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
