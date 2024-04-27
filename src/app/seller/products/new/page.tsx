'use client';
import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import Card from '@/components/Shared/Card';
import CustomSteps from '@/components/Shared/Steps';
import clsx from 'clsx';
import { MenuItem } from 'primereact/menuitem';
import React, { useState } from 'react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaFacebook, FaShopify, FaTwitter } from 'react-icons/fa';
import { IoMdCloudUpload } from 'react-icons/io';
import { RiInstagramFill } from 'react-icons/ri';

export default function NewProduct() {
  const [activeIndex, setActiveIndex] = useState(0);

  const steps: MenuItem[] = [
    {
      label: 'Product Info',
    },
    {
      label: 'Media',
    },
    {
      label: 'Social',
    },
    {
      label: 'Pricing',
    },
  ];

  return (
    <Card className='p-8'>
      <div className='flex flex-col xl:flex-row xl:items-center gap-4 justify-between mb-24'>
        <div className='flex-1 text-center'>
          <p className='text-xl text-gray-800 font-medium'>Add new product</p>
          <p className='font-light text-neutral text-sm'>
            This information will describe more about product.
          </p>
        </div>
      </div>

      <div className='p-4 border border-gray-200 mx-auto max-w-4xl rounded-2xl'>
        <div className='-mt-16'>
          <CustomSteps
            steps={steps}
            activeIndex={activeIndex}
            // handleChange={setActiveIndex}
          />
        </div>

        <div className='pt-12 p-4'>
          <form action=''>
            {/* Step 0 */}
            {activeIndex === 0 && (
              <section>
                <p className='text-xl text-gray-800 font-medium mb-8'>
                  Product Information
                </p>
                <div className='mt-6 grid md:grid-cols-2 gap-4'>
                  <div className='mb-6'>
                    <TextInput
                      placeholder='Name'
                      id='name'
                      onChange={() => {}}
                      // value={activeProduct?.name}
                      rounded
                    />
                  </div>
                  <div className='mb-6'>
                    <TextInput
                      placeholder='Weight'
                      id='weight'
                      onChange={() => {}}
                      rounded
                      type='number'
                    />
                  </div>
                </div>
                <div className='mt-6 grid md:grid-cols-2 gap-4'>
                  <div className='mb-6'>
                    <select
                      name='Category'
                      id='category'
                      defaultValue=''
                      className='text-neutral rounded-full'
                    >
                      <option value='' defaultChecked disabled>
                        Category
                      </option>
                      <option value='all'>All</option>
                      <option value='men'>Men</option>
                      <option value='women'>Women</option>
                      <option value='kids'>Kids</option>
                    </select>
                  </div>
                  <div className='mb-6'>
                    <select
                      name='Size'
                      id='size'
                      defaultValue=''
                      className='text-neutral rounded-full'
                    >
                      <option value='' defaultChecked disabled>
                        Size
                      </option>
                      <option value='M'>M</option>
                      <option value='L'>L</option>
                    </select>
                  </div>
                </div>
                {/*  Description */}
                <div className='mb-6'>
                  <textarea
                    name='Description'
                    id='description'
                    placeholder='Type description here(optional)...'
                    className='rounded-3xl'
                  ></textarea>
                </div>
              </section>
            )}

            {/* Step 1 */}
            {activeIndex === 1 && (
              <section>
                <p className='text-xl text-gray-800 font-medium mb-8'>Media</p>

                <div className='p-8 border border-primary border-dashed mb-16 rounded-2xl flex items-center justify-center flex-col'>
                  <IoMdCloudUpload className='text-primary text-7xl' />
                  <p className='text-lg text-gray-700 font-medium mb-8 text-center'>
                    Drop your image here or{' '}
                    <button type='button' className='text-primary'>
                      Browse
                    </button>
                    <p className='text-neutral font-light text-center text-sm'>
                      Support: JPG, JPEG, PNG
                    </p>
                  </p>
                </div>
              </section>
            )}

            {/* Step 2 */}
            {activeIndex === 2 && (
              <section>
                <p className='text-xl text-gray-800 font-medium mb-8'>Social</p>

                <div className='mt-6 grid md:grid-cols-2 gap-4'>
                  <div className='mb-4'>
                    <TextInput
                      placeholder='Shopify Handle'
                      id='shopify'
                      onChange={() => {}}
                      rightIcon={<FaShopify />}
                      rounded
                    />
                  </div>
                  <div className='mb-4'>
                    <TextInput
                      placeholder='Facebook'
                      id='facebook'
                      onChange={() => {}}
                      rightIcon={<FaFacebook />}
                      rounded
                    />
                  </div>
                </div>
                {/*  */}
                <div className='mt-6 grid md:grid-cols-2 gap-4'>
                  <div className='mb-4'>
                    <TextInput
                      placeholder='Twitter'
                      id='twitter'
                      onChange={() => {}}
                      rightIcon={<FaTwitter />}
                      rounded
                    />
                  </div>
                  <div className='mb-4'>
                    <TextInput
                      placeholder='Instagram'
                      id='instagram'
                      onChange={() => {}}
                      rightIcon={<RiInstagramFill />}
                      rounded
                    />
                  </div>
                </div>

                {/*  Description */}
                <div className='mb-6'>
                  <textarea
                    name='More account links'
                    id='more_account_links'
                    placeholder='More account links(optional)...'
                    className='rounded-3xl'
                  ></textarea>
                </div>
              </section>
            )}

            {/* Step 3 */}
            {activeIndex === 3 && (
              <section>
                <p className='text-xl text-gray-800 font-medium mb-8'>
                  Pricing
                </p>

                <div className='mt-6 grid md:grid-cols-2 gap-4'>
                  <div className='mb-6'>
                    <TextInput
                      placeholder='Price'
                      id='price'
                      onChange={() => {}}
                      rightIcon={<AiFillDollarCircle />}
                      rounded
                    />
                  </div>
                  <div className='mb-6'>
                    <select
                      name='Currency'
                      id='currency'
                      defaultValue=''
                      className='text-neutral rounded-full'
                    >
                      <option value='' defaultChecked disabled>
                        Currency
                      </option>
                      <option value='USD'>USD</option>
                    </select>
                  </div>
                </div>

                <div className='mb-6 w-full'>
                  <TextInput
                    placeholder='SKU'
                    id='sku'
                    onChange={() => {}}
                    rounded
                  />
                </div>
                {/*  Description */}
                <div className='mb-6'>
                  <textarea
                    name='stock'
                    id='stock'
                    placeholder='(in stock), (out of stock), (sale)'
                    className='rounded-3xl'
                  ></textarea>
                </div>
              </section>
            )}

            {/* Buttons */}
            <div
              className={clsx(
                activeIndex === 0 ? 'justify-end' : 'justify-between',
                'flex items-center'
              )}
            >
              {activeIndex > 0 && (
                <Button
                  variant='outlined'
                  onClick={() => {
                    if (activeIndex !== 0) setActiveIndex((prev) => prev - 1);
                  }}
                  rounded
                >
                  Back
                </Button>
              )}
              <Button
                rounded
                onClick={() => {
                  if (!(activeIndex === steps.length - 1))
                    setActiveIndex((prev) => prev + 1);
                }}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
}
