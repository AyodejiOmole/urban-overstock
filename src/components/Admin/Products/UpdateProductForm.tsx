'use client';

import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import ENDPOINTS from '@/config/ENDPOINTS';
import { ICategories, ICategory } from '@/interfaces/categories';
import { IProduct, ISingleProduct } from '@/interfaces/products';
import HTTPService from '@/services/http';
import clsx from 'clsx';
import { useFormik } from 'formik';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useReducer, useRef, useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import toast from 'react-hot-toast';
import { BiDollar } from 'react-icons/bi';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import Cookies from 'universal-cookie';
import * as Yup from 'yup';
// import OldVariations from "./Variations/OldVariations"
// import Variations, { VariationData } from './Variations/Variations';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaX, FaPlus } from 'react-icons/fa6';
import { TfiSave } from 'react-icons/tfi';
// import NewVariations from "./Variations/NewVariations";
import { IBrand } from '@/interfaces/brands';
import { IBrands } from '@/interfaces/brands';
import { IColors } from '@/interfaces/colors';
import { ISizes } from '@/interfaces/sizes';
import { IDiscountCodes } from '@/interfaces/discount-codes';

interface ProductImage {
  // color: string;
  image: File;
}

function CustomError({ error }: { error?: string }) {
  if (!error) return;

  return (
    <div className='text-xs font-light mt-1 ml-1 p-2'>
      <span className='text-red-600'>
        {error === "Category must be greater than or equal to 1" ? "Category field is required!": error}
      </span>
    </div>
  );
}

export default function UpdateProductForm({
  categories,
  colors,
  sizes,
  brands,
  discounts,
  activeProduct,
}: {
    activeProduct?: ISingleProduct | null;
  categories?: ICategories | undefined;
  colors?: IColors | undefined;
  sizes?: ISizes | undefined;
  brands?: IBrands | undefined;
  discounts: IDiscountCodes | undefined;
}) {
  const cookies = new Cookies();
  const { replace } = useRouter();
  const httpService = new HTTPService();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const searchParams = useSearchParams();

  const [activeImage, setActiveImage] = useState<null | number>(null);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);

  const [brandPicker, setBrandPicker] = useState<boolean | null>(false);
  const [brandToAdd, setBrandToAdd] = useState<string | null | undefined | any>("");
  const [addBrandDisplay, setAddBrandDisplay] = useState<boolean | null>(false);

  const token = cookies.get('urban-token');

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      tag: '',
    //   brandId: 0,
      quantity: 0,
      amount: 0,
      discountType: '',
      discountPercentage: 0,
      taxClass: '',
      vatAmount: 0,
      sku: '',
      barcode: '',
      status: '',
      categoryId: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required().label('Name'),
      description: Yup.string().required().label('Description'),
      tag: Yup.string().required().label('Tag'),
      quantity: Yup.number().min(1).required().label('Quantity'),
      amount: Yup.number().min(1).required().label('Price'),
      discountType: Yup.string().required().label('Discount Type'),
      discountPercentage: Yup.number().min(0).required().label('Discount Type'),
      taxClass: Yup.string().required().label('Tax Class'),
      categoryId: Yup.number().min(1).required().label('Category'),
      vatAmount: Yup.number().min(0).required().label('VAT Amount'),
      sku: Yup.string().required().label('SKU'),
      barcode: Yup.string().required().label('Bar Code'),
      status: Yup.string().required().label('Status'),
    }),
    onSubmit: async (values) => {
      const promises: Promise<Response>[] = [];
    //   const variationPromises: Promise<Response>[] = [];
      let product_images;
      let data;
        try {
            if(productImages.length > 0) {
                productImages.forEach((image: ProductImage) => {
                    const formdata = new FormData();
                    formdata.append('file', image.image);
        
                    const requestOptions = {
                        method: 'POST',
                        body: formdata,
                        headers: {
                        Authorization: `Bearer ${token}`,
                        },
                    };
        
                    promises.push(
                        fetch(
                        `${process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL}/api/v1/${ENDPOINTS.UPLOAD_FILE}`,
                        requestOptions
                        )
                    );
                });
        
                product_images = await Promise.all(promises)
                .then((responses) => {
                    const responseData = responses.map(async (response, index) => {
                    const fileRes = await response.json();
    
                    return fileRes.url;
                    });
    
                    return Promise.all(responseData);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            

            if (product_images && product_images.length > 0) {
                data = {
                    ...values,
                    categoryId: +values.categoryId,
                    imageUrls: product_images
                };
            } else {
                const formattedStr = `${activeProduct?.imageUrls.replace(/\\/g, '')}`;
                const arr = JSON.parse(formattedStr);
                data = {
                    ...values,
                    categoryId: +values.categoryId,
                    imageUrls: arr,
                };
            }

            console.log('Request Body: ', data);

            httpService
                .patch(ENDPOINTS.PRODUCTS, data, `Bearer ${token}`)
                .then((apiRes) => {
                console.log('Response: ', apiRes);

                if (apiRes.data) {
                    formik.resetForm();

                    toast.success('Product updated successfully.');

                    setTimeout(() => {
                    replace('/admin/products');
                    }, 1000);
                }
            });
        } catch (error) {
            console.log(error);
        }
    

      // const data = {
      //   ...values,
      //   categoryId: +values.categoryId,
      //   productVarations: groupedVariations,
      //   productImages: product_images,
      // };
      // console.log(data);
    },
    validateOnChange: true,
  });

  useEffect(() => {
    if(activeProduct) {
      console.log(activeProduct);
      const {
        name,
        description,
        tag,
        brand,
        quantity,
        amount,
        discountType,
        discountPercentage,
        taxClass,
        vatAmount,
        sku,
        barcode,
        status,
        category,
      } = activeProduct;

      formik.setValues({
        name: name.toString(),
        description,
        tag: activeProduct.tag.toLowerCase(),
        // brandId: brand.id,
        quantity: Number(quantity),
        amount: Number(amount),
        discountType,
        discountPercentage: Number(discountPercentage),
        taxClass,
        vatAmount: Number(vatAmount),
        sku: sku.toLowerCase(),
        barcode,
        status: status.toLowerCase(),
        categoryId: category.id,
      });
    }
  }, [activeProduct]);

  const removeImage = (index: number) => {
    const updatedImages = productImages.filter((img, i) => i !== index);
    setProductImages(updatedImages);
  };

  const addNewImage = (e: ChangeEvent<HTMLInputElement>) => {
    const imagesCopy: ProductImage[] = [...productImages];

    if (e.target.files) {
      // imagesCopy.push({ image: e.target.files[0], color: '#000000' });
      const fileSizeInBytes = e.target.files[0].size;
      const fileType = e.target.files[0].type;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        toast.error('File type is not supported!');
        return;
      }

      if (fileSizeInMB >= 1) {
        toast.error('File size too large');
        return;
      }

      imagesCopy.push({ image: e.target.files[0] });
    }
    setProductImages(imagesCopy);
  };

  const createNewBrandPreset = async (color: string) => {
    const token = cookies.get('urban-token');
    const data = {
      name: color,
    }

    try {
      httpService
        .post(ENDPOINTS.BRAND_SETTINGS, data, `Bearer ${token}`)
        .then((apiRes) => {
          console.log('Response: ', apiRes);

          if (apiRes.data) {
            toast.success('Brand preset added successfully.');
            brands?.push(apiRes.data);
            setAddBrandDisplay(false);

            // setTimeout(() => {
            //   replace('/admin/products');
            // }, 1000);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const updateBrandToAdd = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setBrandToAdd(e.target.value);
  }

  return (
    <form
      className='grid grid-cols-1 lg:grid-cols-6 gap-6'
      onSubmit={formik.handleSubmit}
    >
      {/* Column 1 */}
      <div className='lg:col-span-4'>
        {/* General Information */}
        <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg'>
          <p className='text-lg font-semibold text-gray-700 mb-8'>
            General Information
          </p>
          <div className='mb-6'>
            <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
              Product Name
            </label>
            <TextInput
              placeholder='Type product name here...'
              id='name'
              onChange={formik.handleChange}
              value={formik.values.name}
              error={formik.errors.name}
            />
          </div>
          {/*  */}
          <div className='mb-6'>
            <label
              htmlFor='description'
              className='text-sm text-neutral mb-2 block'
            >
              Description
            </label>
            <textarea
              name='description'
              id='description'
              placeholder='Type product description here...'
              onChange={formik.handleChange}
              value={formik.values.description}
            ></textarea>

            <CustomError error={formik.errors.description} />
          </div>

            {/* <div className='mb-4 w-full relative'>
                <label htmlFor='brandId' className='text-sm text-neutral mb-2 block'>
                  Brand:
                </label>
                <div 
                    className = {
                        clsx('h-[48px] bg-white px-4 py-2 rounded-lg border border-dark-100 flex gap-2 items-center',)
                    }
                    onClick={() => setBrandPicker(true)}
                >
                    {brands?.filter((brand) => brand.id === formik.values.brandId)[0]?.name ? brands?.filter((brand) => brand.id === formik.values.brandId)[0]?.name : "Select a brand..."}
                </div>

                {brandPicker && (
                    <div
                      className='absolute top-2 right-2 p-4 border border-gray-200 bg-white rounded-lg z-20'
                    >   
                      <div
                        className="flex justify-between align-center mb-2"
                      >
                        <p>Cant find brand?</p>
                        <Button 
                          onClick={() => {
                            setBrandPicker(false);
                            setAddBrandDisplay(true);
                          }}
                        >
                          <FaPlus />
                          Add brand
                        </Button>
                      </div>
    
                      <div className='w-full'>
                          <p className='text-sm text-neutral mb-2'>Presets</p>
    
                          <div className='flex flex-wrap gap-1'>
                            {brands?.map((brand: IBrand, index: number) => {
                              return (
                                  <Button 
                                    variant='outlined' 
                                    color='grey' 
                                    key={index} 
                                    onClick={() => {
                                      formik.setFieldValue("brandId", brand.id);
                                      setBrandPicker(false);
                                    }}
                                  >
                                    <p className='text-xs text-neutral'>{brand?.name}</p>
                                  </Button>
                              )
                            })}
                          </div>
                      </div>
                      <CustomError error={formik.errors.brandId} />
                    </div>
                )}

                {addBrandDisplay && (
                  <div
                    className='absolute top-2 right-2 p-4 border border-gray-200 bg-white rounded-lg z-20'
                  >  
                    <label htmlFor='color' className='text-sm text-neutral mb-2 block'>
                        Input brand preset:
                    </label>

                    <TextInput
                      type='string'
                      // id='sizeToAdd'
                      value={brandToAdd}
                      onChange={updateBrandToAdd}
                      className='mb-3'
                    />

                    <Button className='w-full' onClick={() => createNewBrandPreset(brandToAdd)}>
                        <FaPlus />
                        Update brand preset 
                    </Button>
                  </div>
                )}
            </div> */}
        </div>

        {/* Media Upload */}
        <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4'>
          <p className='text-lg font-semibold text-gray-700 mb-8'>Media</p>

          <div>
            <p className='text-neutral mb-4 text-sm'>Photo</p>
            <div className='p-8 bg-gray-100 rounded-lg flex items-center justify-center flex-col border border-gray-200'>
              <input
                type='file'
                accept='.jpg,.png,.jpeg'
                id='image'
                className='pointer-events-none opacity-0'
                ref={imageInputRef}
                onChange={addNewImage}
              />
              {productImages.length < 1 && <p>Click below to upload an image. Your image should not exceed 1MB and should be either a .jpeg or .png</p>}
              <div className='flex items-center flex-wrap gap-2 mb-4'>
                {productImages &&
                  productImages.map((img, index) => (
                    <div
                      key={`${index}-${img.image.name}`}
                      className='h-28 w-28 relative rounded-xl'
                    >
                      <span className='text-xs absolute top-2 left-2 text-dark bg-green-100 py-1 px-2 rounded-md'>
                        {index + 1}
                      </span>
                      
                      <Image
                        src={URL.createObjectURL(img.image)}
                        alt={img.image.name}
                        width={100}
                        height={100}
                        className='rounded-lg w-full h-full object-cover'
                      />
                      <button
                        className='absolute bottom-4 right-4 text-dark rounded-md p-1 bg-green-100'
                        onClick={() => removeImage(index)}
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </div>
                  ))}
              </div>
              <Button
                size='small'
                onClick={() => imageInputRef.current?.click()}
              >
                Add Image
              </Button>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4'>
          <p className='text-lg font-semibold text-gray-700 mb-8'>Pricing</p>
          <div className='mb-6'>
            <label
              htmlFor='basePrice'
              className='text-sm text-neutral mb-2 block'
            >
              Base Price
            </label>
            <TextInput
              inputMode='numeric'
              placeholder='Base Price'
              id='amount'
              onChange={formik.handleChange}
              value={formik.values.amount}
              error={formik.errors.amount}
              leftIcon={<BiDollar />}
              type='number'
            />
          </div>
          {/*  */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 sm:gap-6 md:gap-0 xl:gap-6 items-center'>
            <div>
              <div className='mb-6'>
                <label
                  htmlFor='discountType'
                  className='text-sm text-neutral mb-2 block'
                >
                  Discount Type
                </label>
                <select
                  name='discountType'
                  id='discountType'
                  className='text-neutral'
                  onChange={formik.handleChange}
                  value={formik.values.discountType}
                >
                  <option value='' defaultChecked disabled>
                    Select a discount type....
                  </option>
                  <option value='free'>No Discount</option>
                  {discounts?.map((discount, index) => {
                    return (
                        <option key={index} value={discount.code}>{`${discount.percentage}%`}</option>
                        )
                    })}
                </select>

                <CustomError error={formik.errors.discountType} />
              </div>

              <div className='mb-6'>
                <label
                  htmlFor='taxClass'
                  className='text-sm text-neutral mb-2 block'
                >
                  Tax Class
                </label>
                <select
                  name='taxClass'
                  id='taxClass'
                  className='text-neutral'
                  onChange={formik.handleChange}
                  value={formik.values.taxClass}
                >
                  <option value='' defaultChecked disabled>
                    Select tax class....
                  </option>
                  <option value='none'>Tax Free</option>
                </select>

                <CustomError error={formik.errors.taxClass} />
              </div>
            </div>
            {/*  */}
            <div>
              <div className='mb-6'>
                <label
                  htmlFor='discountPercentage'
                  className='text-sm text-neutral mb-2 block'
                >
                  Discount Percentage (%)
                </label>
                <TextInput
                  inputMode='numeric'
                  placeholder='Discount Percentage'
                  id='discountPercentage'
                  onChange={formik.handleChange}
                  value={formik.values.discountPercentage}
                  error={formik.errors.discountPercentage}
                  type='number'
                />
              </div>
              {/*  */}
              <div className='mb-6'>
                <label
                  htmlFor='vatAmount'
                  className='text-sm text-neutral mb-2 block'
                >
                  VAT Amount (%)
                </label>
                <TextInput
                  placeholder='VAT Amount'
                  id='vatAmount'
                  onChange={formik.handleChange}
                  value={formik.values.vatAmount}
                  error={formik.errors.vatAmount}
                  type='number'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4'>
          <p className='text-lg font-semibold text-gray-700 mb-8'>Inventory</p>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-x-4 items-center'>
            <div className='mb-6'>
              <label htmlFor='sku' className='text-sm text-neutral mb-2 block'>
                SKU
              </label>
              <TextInput
                placeholder='Type product SKU...'
                id='sku'
                onChange={formik.handleChange}
                value={formik.values.sku}
                error={formik.errors.sku}
              />
            </div>
            {/*  */}
            <div className='mb-6'>
              <label
                htmlFor='barcode'
                className='text-sm text-neutral mb-2 block'
              >
                Barcode
              </label>
              <TextInput
                placeholder='Type product Barcode...'
                id='barcode'
                onChange={formik.handleChange}
                value={formik.values.barcode}
                error={formik.errors.barcode}
              />
            </div>
            {/*  */}
            <div className='mb-6'>
              <label
                htmlFor='amount'
                className='text-sm text-neutral mb-2 block'
              >
                Quantity
              </label>
              <TextInput
                inputMode='numeric'
                placeholder='Type product quantity...'
                id='quantity'
                onChange={formik.handleChange}
                value={formik.values.quantity}
                error={formik.errors.quantity}
                type='number'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <div className='lg:col-span-2'>
        <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg max-h-96'>
          <p className='text-lg font-semibold text-gray-700 mb-8'>Category</p>
          {/* Product Category */}
          <div className='mb-6'>
            <label
              htmlFor='categoryId'
              className='text-sm text-neutral mb-2 block'
            >
              Product Category
            </label>
            <select
              name='categoryId'
              id='categoryId'
              className='text-neutral'
              onChange={formik.handleChange}
              value={formik.values.categoryId}
            >
              <option defaultChecked disabled>
                Select a category....
              </option>
              {categories?.map((category: ICategory) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <CustomError error={formik.errors.categoryId} />
          </div>
          {/* Product Tags */}
          <div className='mb-6'>
            <label htmlFor='tag' className='text-sm text-neutral mb-2 block'>
              Product Tag
            </label>
            <TextInput
              placeholder='Product tags'
              id='tag'
              onChange={formik.handleChange}
              value={formik.values.tag}
              error={formik.errors.tag}
            />
          </div>
        </div>

        {/* Product Status */}
        <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg max-h-96 my-4'>
          <div className='flex items-center justify-between'>
            <p className='text-lg font-semibold text-gray-700'>Status</p>
            {/* <span
              className={`p-2 px-4 text-[12px] font-semibold rounded-full capitalize bg-orange-100 text-orange-600`}
            >
              Low Stock
            </span> */}
          </div>

          {/*  */}
          <div className='mb-6'>
            <label
              htmlFor='category'
              className='text-sm text-neutral mb-2 block'
            >
              Product Status
            </label>
            <select
              name='status'
              id='status'
              className='text-neutral'
              onChange={formik.handleChange}
              value={formik.values.status}
            >
              <option value='' defaultChecked disabled>
                Select a status....
              </option>
              <option value='draft'>Draft</option>
              <option value='published'>Published</option>
              <option value='low-stock'>Low Stock</option>
              <option value='out-of-stock'>Out of Stock</option>
            </select>

            <CustomError error={formik.errors.status} />
          </div>
        </div>
      </div>

      <div className='fixed right-0 bottom-0 w-full p-4 bg-white flex items-center justify-end'>
        {!searchParams.get("edit") && (
          <div className='max-w-md w-full'>
            <Button type='submit' block loading={formik.isSubmitting}>
              Add Product
            </Button>
          </div>
        )}
        
        {searchParams.get('edit') && (
          <div className='flex items-center gap-4'>
            <Link href='/admin/products'>
              <Button variant='outlined' color='dark'>
                <FaX />
                Cancel
              </Button>
            </Link>

            
            <Button onClick={formik.submitForm} loading={formik.isSubmitting}>
              <TfiSave />
              Save Product
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}