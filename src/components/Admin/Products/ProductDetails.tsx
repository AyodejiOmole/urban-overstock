"use client";
import React from 'react'
import { ISingleProduct, ProductVarationSingle } from '@/interfaces/products';
import TextInput from '@/components/Global/TextInput';
import Image from 'next/image';
import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import clsx from 'clsx';

const ProductDetails = ({
    productDetails
}: {
    productDetails: ISingleProduct | null
}) => {
    console.log(productDetails);
    const [currentImageCount, setCurrentImageCount] = useState<number>(0);

    const changeImage = (action: string) => {
        if(action.toLowerCase() === "next") {
            const newImageCount = currentImageCount + 1;
            setCurrentImageCount(newImageCount >= productDetails!.imageUrls.length ? 0 : newImageCount);
        }

        if(action.toLowerCase() === "previous") {
            const newImageCount = currentImageCount - 1;
            setCurrentImageCount(newImageCount < 0 ? productDetails!.imageUrls.length - 1 : newImageCount);
        }
    }
    
    return (
        <div>
            <section className='w-full flex lg:flex-row md:flex-row flex-col lg:gap-0 md:gap-0 gap-3 justify-between'>
                {/* Image Carousel */}
                <div className='relative lg:w-1/2 w-full mb-3'>
                    <div className='w-full h-[200px]'>
                        <Image
                            // width={200}
                            // height={200}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="center"
                            className="mx-auto rounded transition-500 transition-all"
                            alt="product image"
                            src={productDetails?.imageUrls[currentImageCount] || ''}
                        />

                        <div className="absolute top-0 justify-between h-full hidden md:flex w-[100%] lg:w-[100%] xl:w-[100%] items-center z-10">
                            <MdKeyboardArrowLeft 
                                // width={50}
                                // height={50}
                                size={50}
                                className='cursor-pointer'
                                color='white'
                                onClick={() => changeImage("previous")}
                            />
                            <MdKeyboardArrowRight 
                                // width={100}
                                // height={100}
                                size={50}
                                color='white'
                                className='cursor-pointer'
                                onClick={() => changeImage("next")}
                            />
                            
                        </div>
                    </div>
                </div>

                {/* Product details */}
                <div className='lg:w-1/2 w-full px-3'>
                    <div className='mg-4'>
                        {/* Product name */}
                        <h2 className='font-semibold text-black text-2xl mb-3'>{productDetails?.name}</h2>

                        {/* Brand name */}
                        <div className='flex gap-1 mb-3'>
                            <p className='font-semibold text-black text-md'>Brand:</p>
                            <p className='text-black text-md'>{productDetails?.brand.name}</p>
                        </div>

                        <div className='flex gap-1 mb-3'>
                            <p className='font-semibold text-black text-lg'>Price:</p>
                            <p className='text-black text-lg mb-3'>${productDetails?.amount}</p>
                        </div>
                    </div>

                    <div className='mt-4 mb-8'>
                        {/* Quantity */}
                        <div className='flex gap-1'>
                            <p className='text-black text-md font-semibold'>Quantity:</p>
                            <p className='text-black text-md'>{productDetails?.quantity}</p>
                        </div>

                        {/* Size */}
                        {/* <div className='flex gap-1 mb-3'>
                            <p className='text-black text-md'>Size:</p>
                            <p className='text-black text-md font-semibold'>{productDetails?.productVarations.}</p>
                        </div> */}
                    </div>

                    <div className=''>
                        {/* Description */}
                        <div className='flex gap-1'>
                            <p className='text-black text-md font-semibold'>Description:</p>
                            <p className='w-full text-md text-black mb-3 text-left border-b-2 border-gray-300 pb-4'>{productDetails?.description}</p>
                        </div>
                        
                        {/* Colors */}
                        <div className='flex flex-start gap-2'>
                            {productDetails?.productVarations.map((variation: ProductVarationSingle, index) => {
                                const color = variation.color.code;
                                return (
                                    <div key={index} style={{ backgroundColor: color }}  className={` rounded-full p-4`}>
                                        {/* this */}
                                        
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <div className='flex flex-start h-14 my-2 gap-2'>
                {productDetails?.imageUrls.map((image: string, index: number) => (
                    <Image
                        width={80}
                        height={50}
                        className={`rounded border cursor-pointer border-gray-300 ${currentImageCount === index ? "opacity-100" : "opacity-20"}`}
                        alt="product image"
                        src={image || ''}
                        key={index}
                        onClick={() => setCurrentImageCount(index)}
                    />
                ))}
            </div>


            {/* Shipping details: Weight, Height, Length, & Width */}
            <section>
                <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4'>
                    <p className='text-lg font-semibold text-gray-700 mb-8'>Inventory</p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-5 2xl:grid-cols-3 gap-x-4 items-center'>
                        <div className='mb-6'>
                            <label htmlFor='sku' className='text-sm text-neutral mb-2 block'>
                                SKU
                            </label>
                            <TextInput
                                placeholder='SKU'
                                id='sku'
                                // onChange={formik.handleChange}
                                value={productDetails?.sku}
                                // error={formik.errors.weight}
                                type='number'
                                disabled
                            />
                        </div>

                        <div className='mb-6'>
                            <label htmlFor='barcode' className='text-sm text-neutral mb-2 block'>
                                Barcode
                            </label>
                            <TextInput
                                placeholder='Barcode...'
                                id='barcode'
                                // onChange={formik.handleChange}
                                value={productDetails?.barcode}
                                // error={formik.errors.weight}
                                type='text'
                                disabled
                            />
                        </div>

                        <div className='mb-6'>
                            <label htmlFor='sku' className='text-sm text-neutral mb-2 block'>
                                Weight
                            </label>
                            <TextInput
                                placeholder='Type product weight...'
                                id='weight'
                                // onChange={formik.handleChange}
                                value={productDetails?.weight}
                                // error={formik.errors.weight}
                                type='number'
                                disabled
                            />
                        </div>
                        
                        <div className='mb-6'>
                        <label
                            htmlFor='productCategory'
                            className='text-sm text-neutral mb-2 block'
                        >
                            Product category
                        </label>
                        <TextInput
                            placeholder="Product category"
                            id='productCategory'
                            // onChange={formik.handleChange}
                            value={productDetails?.category.name}
                            // error={formik.errors.length}
                            type='text'
                            disabled
                        />
                        </div>
                        
                        <div className='mb-6'>
                        <label
                            htmlFor='productStatus'
                            className='text-sm text-neutral mb-2 block'
                        >
                            Product Status
                        </label>
                        <TextInput
                            placeholder='Product status...'
                            id='productStatus'
                            // onChange={formik.handleChange}
                            value={productDetails?.status}
                            // error={formik.errors.height}
                            type='text'
                            disabled
                        />
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Variation */}
            <section>
                {
                    productDetails?.productVarations.map((variation, index) => {
                        return (
                            <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4' key={index}>
                                <div className='flex items-start gap-4 w-full flex-col sm:items-center py-4 border-b border-b-gray-100'>
                                    {/* Media Upload */}
                                    <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4'>
                                        <p className='text-lg font-semibold text-gray-700 mb-8'>Media</p>

                                        <div>
                                            <p className='text-neutral mb-4 text-sm'>Photo</p>
                                            <div className='p-8 bg-[#F0F1F3] rounded-lg flex items-center justify-center flex-col border border-gray-200'>
                                                <div className='flex items-center flex-wrap gap-2 mb-4'>
                                                    {variation.imageUrl &&
                                                        <div
                                                        className='h-28 w-28 relative rounded-xl'
                                                        >
                                                            <Image
                                                                src={variation.imageUrl}
                                                                alt="Variation image"
                                                                width={100}
                                                                height={100}
                                                                className='rounded-lg w-full h-full object-cover'
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Color */}
                                    <div className='w-full flex justify-between gap-2'>
                                        <div className='w-full relative'>
                                            <label htmlFor='color' className='text-sm text-neutral mb-2 block'>
                                                Color:
                                            </label>
                                            <div 
                                                className = {
                                                    clsx('h-[48px] text-black bg-[#F0F1F3] px-4 py-2 rounded-lg border border-dark-100 flex gap-2 items-center',)
                                                }
                                            >
                                                {variation.color.name}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Size Options */}
                                    {variation.sizeOptions.map((option, index) => {
                                        return (
                                            <div className='items-start gap-4 w-full' key={index}>
                                                <div className='flex justify-between w-full gap-2'>
                                                    <div className='w-full relative'>
                                                        <label htmlFor='size' className='text-sm text-neutral mb-2 block'>
                                                            Size:
                                                        </label>
                                                        <div 
                                                            className = {
                                                                clsx('h-[48px] bg-[#F0F1F3] text-black px-4 py-2 rounded-lg border border-dark-100 flex gap-2 items-center',)
                                                            }
                                                            
                                                        >
                                                            
                                                            {option.sizeId}

                                                        </div>
                                                    </div>
                                                </div>
                                            
                                                <div className='flex justify-between w-full gap-2 mt-4'>
                                                    <div className='mb-4 w-full'>
                                                        <label htmlFor='quantity' className='text-sm text-neutral mb-2 block'>
                                                            Quantity:
                                                        </label>
                                                        <TextInput
                                                            type='number'
                                                            id='quantity'
                                                            value={option.quantity}
                                                            // onChange={(e: ChangeEvent<HTMLInputElement>) => updateVariationQuantity(e, index)}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
            </section>

            {/* Footer */}
            <div className='fixed right-0 bottom-0 z-10000 w-full p-3 bg-white gap-3 flex items-center justify-end'>
                <p className='text-md'>Product Completion</p>
                <div className='bg-green-100 text-green-600 rounded-full flex items-center p-2 justify-center'>
                    {`${100}%`}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;