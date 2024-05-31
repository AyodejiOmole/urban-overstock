import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import React, { ChangeEvent, useReducer, useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaPlus } from "react-icons/fa";
import { SketchPicker } from 'react-color';
import clsx from 'clsx';
import { IColor, IColors } from '@/interfaces/colors';
import { ISize, ISizes } from '@/interfaces/sizes';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
import HTTPService from '@/services/http';
import ENDPOINTS from '@/config/ENDPOINTS';
import { GetColorName } from 'hex-color-to-color-name';
import { FaHeartPulse } from 'react-icons/fa6';
import { IProductVariations } from '../ProductForm';
import { IoIosArrowDown } from 'react-icons/io';
import Modal from '@/components/Global/Modal';
import { AiOutlineClose } from 'react-icons/ai';

interface ProductVariationProps {
  value: string;
  quantity: number;
}

export interface ProductImage {
    image: File;
}

export interface VariationData {
  // [key: string]: string | number;
  id: number;
  type: string;
  value: string;
  quantity: number;
}

export interface ProductVariationData {
  id: number;
  imageFile: File | null,
  colorId: number,
  imageUrl: string
  sizeOptions: { 
    sizeId: number | undefined, 
    quantity: number 
  }[],
}

// export interface IProductVariations {
//   id: number,
//   imageFile: File | null,
//   colorId: number,
//   imageUrl: string,
//   sizeOptions: { 
//     sizeId: number | undefined, 
//     quantity: number, 
//   }[],
// }

interface SizeVariationProps extends ProductVariationProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SizeVariation: React.FC<SizeVariationProps> = ({
  value,
  onChange,
  quantity,
  setQuantity,
}) => {
  return (
    <div className='items-start gap-4 w-full'>
      <div className='mb-4 w-full'>
        <label htmlFor='size' className='text-sm text-neutral mb-2 block'>
          Size:
        </label>
        <select id='size' value={value} onChange={onChange}>
          <option value=''>Select Size</option>
          <option value='XS'>XS</option>
          <option value='S'>S</option>
          <option value='M'>M</option>
          <option value='L'>L</option>
          <option value='XL'>XL</option>
          <option value='XXL'>XXL</option>
          <option value='3XL'>3XL</option>
        </select>
      </div>
      <div className='mb-4 w-full'>
        <label htmlFor='quantity' className='text-sm text-neutral mb-2 block'>
          Quantity:
        </label>
        <TextInput
          type='number'
          id='quantity'
          value={quantity}
          onChange={setQuantity}
        />
      </div>
    </div>
  );
};

const VariationItem = ({
  variation,
  onVariationChange,
  onDelete,
  dispatch,
  sizes,
  colors,
  quantity,
  allVariations,
}: {
  variation: ProductVariationData;
  onVariationChange?: (
    id: number,
    colorId: 0,
    imageFile: File | null,
    imageUrl: '',
    sizeOptions: [],
  ) => void;
  onDelete: (id: number) => void;
  dispatch: React.Dispatch<{
    type: 'ADD' | 'DELETE' | 'UPDATE' | 'RESET_STATE';
    payload: ProductVariationData;
    newState: IProductVariations[] | [];
  }>;
  sizes: ISizes | undefined;
  colors: IColors | undefined;
  quantity?: number | undefined;
  allVariations: ProductVariationData[];
}) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  // const [variationImage, setVariationImage] = useState<ProductImage | null>();
  const [variationColor, setVariationColor] = useState<string>("");
  // const [sizeName, setSizeName] = useState<any>("");
  const [activeColorPicker, setActiveColorPicker] = useState<boolean>(false);
  const activeColorPickerRef = useRef<HTMLDivElement>(null);

  const [sizePicker, setSizePicker] = useState<boolean | number | null>(null);
  const sizePickerRef = useRef<HTMLDivElement>(null);

  const [displayAddColor, setDisplayAddColor] = useState<boolean | number | null>(false);
  const displayAddColorRef = useRef<HTMLDivElement>(null);

  const [colorToAdd, setColorToAdd] = useState<string>("");

  const [displayAddSize, setDisplayAddSize] = useState<boolean | number | null>(-1);
  const displayAddSizeRef = useRef<HTMLDivElement>(null);

  const [sizeToAdd, setSizeToAdd] = useState<string | null | any>('');
  const [sizeCode, setSizeCode] = useState<string | null | any>('');

  const updateVariationQuantity = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const variationQuantitySum: number = allVariations.reduce((acc, current) => acc + current.sizeOptions.reduce((accum, cur) => accum + cur.quantity, 0), 0);

    if(quantity) {
      if(Number(e.target.value) + variationQuantitySum > quantity) {
        toast.error("Your variation quantities must not exceed actual product quantity");
        return;
      }
    }
  
    const newSizeOptions = variation.sizeOptions.map((option, idx) => {
      if(idx === index) {
        return {...option, quantity: Number(e.target.value) };
      }
      return option;
    });

    dispatch({
      type: 'UPDATE',
      payload: { ...variation, sizeOptions: newSizeOptions },
      newState: [],
    });
  };

  const deleteVariationQuantity = (index: number, value: number) => {
    const newSizeOptions = variation.sizeOptions.map((option, idx) => {
      if(idx === index) {
        return {...option, quantity: Number(value) };
      }
      return option;
    });

    dispatch({
      type: 'UPDATE',
      payload: { ...variation, sizeOptions: newSizeOptions },
      newState: [],
    });
  };

  // const updateVariationValue = (
  //   e?: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  //   index?: number,
  // ) => {
  //   const newSizeOptions = variation.sizeOptions.map((option, idx) => {
  //     if(idx === index) {
  //       return {...option, sizeId: Number(e?.target.value) };
  //     }
  //     return option;
  //   });

  //   dispatch({
  //     type: 'UPDATE',
  //     payload: { ...variation, sizeOptions: newSizeOptions },
  //   });
  // };

  const updateSizeVariationValue = (index: number, value: number) => {
    const newSizeOptions = variation.sizeOptions.map((option, idx) => {
      if(idx === index) {
        return {...option, sizeId: Number(value) };
      }
      return option;
    });

    dispatch({
      type: 'UPDATE',
      payload: { ...variation, sizeOptions: newSizeOptions },
      newState: [],
    });

    setSizePicker(null);
  }

  const updateColorVaritionValue = (colorId: number) => {
    dispatch({
      type: 'UPDATE',
      payload: { ...variation, colorId: colorId },
      newState: [],
    });
  }

  const addNewSizeOptions = () => {
    const newSizeOptions = [...variation.sizeOptions, { sizeId: 0, quantity: 0 }]

    dispatch({
      type: 'UPDATE',
      payload: { ...variation, sizeOptions: newSizeOptions },
      newState: [],
    }); 
  }

  const removeAlreadyUploadedImage = () => {
    dispatch({
      type: 'UPDATE',
      payload: { ...variation, imageUrl: "" },
      newState: [],
    });
  }

  const removeImage = () => {
    // const updatedImages = variationImage.filter((img, i) => i !== index);
    // setVariationImage(null);
    // const newSizeOptions = variation.sizeOptions.map((option, idx) => {
    //   if(idx === index) {
    //     return {...option, sizeId: Number(value) };
    //   }
    //   return option;
    // });

    dispatch({
      type: 'UPDATE',
      payload: { ...variation, imageFile: null },
      newState: [],
    });
  };

  const addNewImage = (e: ChangeEvent<HTMLInputElement>) => {
    let imagesCopy: File | null = null;

    if (e.target.files) {
      // imagesCopy.push({ image: e.target.files[0], color: '#000000' });
      // imagesCopy.push({ image: e.target.files[0] });
      console.log(e.target.files);
      const fileSizeInBytes = e.target.files[0].size;
      const fileType = e.target.files[0].type;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        toast.error('File type is not supported!');
        return;
      }

      if (fileSizeInMB >= 1) {
        toast.error('File size is too large');
        return;
      }

      imagesCopy = e.target.files[0];
    }
    // setVariationImage(imagesCopy);
    dispatch({
      type: 'UPDATE',
      payload: { ...variation, imageFile: imagesCopy },
      newState: [],
    });
  };

  const createNewSizePreset = async (size: string, code: string) => {
    const cookies = new Cookies();
    const token = cookies.get('urban-token');

    const httpService = new HTTPService();

    const data = {
      name: size,
      code,
    }

    try {
      httpService
        .post(ENDPOINTS.SIZE_SETTINGS, data, `Bearer ${token}`)
        .then((apiRes) => {
          console.log('Response: ', apiRes);

          if (apiRes.data) {
            sizes?.push(apiRes.data);
            toast.success('Size preset added successfully.');
            setDisplayAddSize(-1);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const createNewColorPreset = async (color: string) => {
    const cookies = new Cookies();
    const token = cookies.get('urban-token');

    const httpService = new HTTPService();

    const data = {
      name: GetColorName(color),
      code: color,
    }

    try {
      httpService
        .post(ENDPOINTS.COLOR_SETTINGS, data, `Bearer ${token}`)
        .then((apiRes) => {
          console.log('Response: ', apiRes);

          if (apiRes.data) {
            toast.success('Color preset added successfully.');
            colors?.push(apiRes.data);
            setDisplayAddColor(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const deleteSizePreset = async (variaitionIndex: number, sizeId: number) => {
    const cookies = new Cookies();
    const token = cookies.get('urban-token');

    toast.loading("Deleting size preset...");

    const httpService = new HTTPService();

    try {
      httpService
        .deleteById(`${ENDPOINTS.SIZE_SETTINGS}/${sizeId}`,`Bearer ${token}`)
        .then((apiRes) => {
          console.log('Response: ', apiRes);
          toast.dismiss();

          if (apiRes.status === 200) {
            // sizes?.push(apiRes.data);
            let index = sizes?.findIndex(obj => obj.id === sizeId);
            if (index) {
              sizes?.splice(index, 1);
            }
            toast.success('Size preset deleted successfully.');
            setDisplayAddSize(-1);
            setSizePicker(-1);
            updateSizeVariationValue(variaitionIndex, 0);
            // toast.dismiss();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteColorPreset = async (colorId: number) => {
    const cookies = new Cookies();
    const token = cookies.get('urban-token');
    toast.loading("Deleting color preset...");

    const httpService = new HTTPService();

    try {
      httpService
        .deleteById(`${ENDPOINTS.COLOR_SETTINGS}/${colorId}`,`Bearer ${token}`)
        .then((apiRes) => {
          console.log('Response: ', apiRes);
          toast.dismiss();

          if (apiRes.status === 200) {
            // sizes?.push(apiRes.data);
            let index = colors?.findIndex(obj => obj.id === colorId);
            if (index) {
              colors?.splice(index, 1);
            }
            toast.success('Color preset deleted successfully.');
            setDisplayAddColor(false);
            setActiveColorPicker(false);
            updateColorVaritionValue(0);
            // toast.dismiss();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', (event) => {
      
      if (!displayAddSizeRef.current?.contains(event.target as Node) && !activeColorPickerRef.current?.contains(event.target as Node) && !sizePickerRef.current?.contains(event.target as Node) &&  !displayAddColorRef.current?.contains(event.target as Node)) {
        setActiveColorPicker(false);
        setDisplayAddColor(false);

        setSizePicker(false);
        setDisplayAddSize(false);
      }
    });
    return () => {
      document.body.removeEventListener('click', () => {});
    };
  }, []);

  return (
    <div className='flex items-start gap-4 w-full flex-col sm:items-center py-4 border-b border-b-gray-100'>
        {/* Media Upload */}
        <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4'>
          <p className='text-lg font-semibold text-gray-700 mb-8'>Media</p>

          <div>
            <p className='text-neutral mb-4 text-sm'>Photo</p>
            <div className='p-8 bg-[#F0F1F3] rounded-lg flex items-center justify-center flex-col border border-gray-200'>
              <input
                type='file'
                accept='.jpg,.png,.jpeg'
                id='image'
                className='pointer-events-none opacity-0'
                ref={imageInputRef}
                onChange={addNewImage}
              />
              {variation.imageFile == null && <p>Click below to upload an image. Your image should not exceed 1MB and should be either a .jpeg or .png</p>}
              <div className='flex items-center flex-wrap gap-2 mb-4'>
                {variation.imageFile &&
                    <div
                      className='h-28 w-28 relative rounded-xl'
                    >
                      {/* <span className='text-xs absolute top-2 left-2 text-dark bg-green-100 py-1 px-2 rounded-md'>
                        {index + 1}
                      </span> */}
                      <Image
                        src={URL.createObjectURL(variation?.imageFile)}
                        alt={variation.imageFile.name}
                        width={100}
                        height={100}
                        className='rounded-lg w-full h-full object-cover'
                      />
                      <button
                        className='absolute bottom-4 right-4 text-dark rounded-md p-1 bg-green-100'
                        onClick={() => removeImage()}
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </div>
                }

                {variation.imageUrl &&
                    <div
                      className='h-28 w-28 relative rounded-xl'
                    >
                      {/* <span className='text-xs absolute top-2 left-2 text-dark bg-green-100 py-1 px-2 rounded-md'>
                        {index + 1}
                      </span> */}
                      <Image
                        src={variation.imageUrl}
                        alt="Variation image"
                        width={100}
                        height={100}
                        className='rounded-lg w-full h-full object-cover'
                      />
                      <button
                        className='absolute bottom-4 right-4 text-dark rounded-md p-1 bg-green-100'
                        onClick={() => removeAlreadyUploadedImage()}
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </div>
                }
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

        {/* Color */}
        <div className='w-full flex justify-between gap-2'>
          <div className='mb-4 w-full relative'>
              <label htmlFor='color' className='text-sm text-neutral mb-2 block'>
                  Color:
              </label>
              <div 
                  className = {
                      clsx('h-[48px] text-black bg-[#F0F1F3] px-4 py-2 rounded-lg border border-dark-100 flex gap-2 items-center',)
                  }
                  onClick={() => setActiveColorPicker(true)}
              >
                  {/* {variationColor === "" ? "Select a color..." : variationColor} */}
                  {colors?.find((color: IColor) => color.id == variation.colorId)?.name ? colors?.find((color: IColor) => color.id == variation.colorId)?.name : "Select a color..."}
                  <IoIosArrowDown className='absolute right-4 top-auto bottom-auto' />
              </div>

                {activeColorPicker && (
                  <div
                    className='absolute top-2 right-2 p-4 border border-gray-200 bg-white rounded-lg z-20'
                    ref={activeColorPickerRef}
                  >   
                    <div
                      className="flex justify-between align-center mb-2"
                    >
                      <p>Cant find your color?</p>
                      <Button 
                        onClick={() => {
                          setDisplayAddColor(true);
                          setActiveColorPicker(false);
                        }}
                      >
                        <FaPlus />
                        Add Color
                      </Button>
                    </div>

                    <div className='w-full'>
                        <p className='text-sm text-neutral mb-2'>Presets</p>

                        <div className='flex flex-wrap gap-1'>
                          {colors?.map((color: IColor, colorIndex: number) => {
                            return (
                                <Button 
                                  variant='outlined' 
                                  color='grey' 
                                  key={colorIndex} 
                                  className='relative'
                                  onClick={() => {
                                    setVariationColor(color?.name);
                                    updateColorVaritionValue(color.id);
                                    setActiveColorPicker(false);
                                  }}
                                >
                                  <p className='text-xs text-neutral'>{color?.name}</p>
                                  <button
                                      className='absolute  p-1  bg-gray-100 text-xl rounded-full text-secondary-text'
                                      onClick={() => deleteColorPreset(color.id)}
                                      style={{
                                        transform: 'translate(-190%, -70%)'
                                      }}
                                    >
                                      <AiOutlineClose size={15}/>
                                    </button>
                                </Button>
                            )
                          })}
                        </div>
                    </div>
                  </div>
                )}

                {displayAddColor && (
                  <div
                    className='absolute top-2 z-20 right-2 p-4 border border-gray-200 bg-white rounded-lg'
                    ref={displayAddColorRef}
                  >  
                    <SketchPicker
                        color={colorToAdd}
                        onChange={(color) => {
                            console.log(color);
                            setColorToAdd(color.hex);
                        }}
                        className='relative z-20 mb-3'
                    /> 
                    
                    <label htmlFor='color' className='text-sm text-neutral mb-2 block'>
                        Color name:
                    </label>
                    
                    <div 
                        className = {
                            clsx('h-[48px] bg-white px-4 py-2 mb-3 rounded-lg border border-dark-100 flex gap-2 items-center',)
                        }
                    >
                        {GetColorName(colorToAdd) === "" ? "Select a color..." : GetColorName(colorToAdd) }
                    </div>

                    <label htmlFor='color' className='text-sm text-neutral mb-2 block'>
                        Color code:
                    </label>
                    
                    <div 
                        className = {
                            clsx('h-[48px] bg-white px-4 py-2 mb-3 rounded-lg border border-dark-100 flex gap-2 items-center',)
                        }
                    >
                        {colorToAdd === "" ? "Select a color..." : colorToAdd}
                    </div>

                    <Button className='w-full' onClick={() => createNewColorPreset(colorToAdd)}>
                        <FaPlus />
                        Update color presets
                    </Button>
                  </div>
                )}
          </div>
          <button
            className='bg-red-100 text-red-600 px-3.5 rounded-md my-5 text-xl'
            onClick={() => updateColorVaritionValue(0)}
          >
            <IoClose />
          </button>
        </div>

        {/* Size Options */}
        {variation.sizeOptions.map((option, index) => {
          return (
            <div className='items-start gap-4 w-full' key={index}>
              <div className='flex justify-between w-full gap-2'>
                <div className='mb-4 w-full relative'>
                  <label htmlFor='size' className='text-sm text-neutral mb-2 block'>
                    Size:
                  </label>
                  <div 
                      className = {
                          clsx('h-[48px] bg-[#F0F1F3] text-black px-4 py-2 rounded-lg border border-dark-100 flex gap-2 items-center',)
                      }
                      onClick={() => setSizePicker(index)}
                  >
                      
                      {sizes?.find((size: ISize) => size.id == option?.sizeId)?.code ? sizes?.find((size: ISize) => size.id == option?.sizeId)?.code : "Select a variation size..."}
                      <IoIosArrowDown className='absolute right-4 top-auto bottom-auto' />
                  </div>
                  
                  {sizePicker === index && (
                    <div
                      className='absolute top-2 right-2 p-4 border border-gray-200 bg-white rounded-lg z-20'
                      ref={sizePickerRef}
                    >   
                      <div
                        className="flex justify-between align-center mb-2"
                      >
                        <p>Cant find size?</p>
                        <Button 
                          onClick={() => {
                            setDisplayAddSize(index);
                            setSizePicker(-1);
                          }}
                        >
                          <FaPlus />
                          Add Size
                        </Button>
                      </div>

                      <div className='w-full'>
                          <p className='text-sm text-neutral mb-2'>Presets</p>

                          <div className='flex flex-wrap gap-1'>
                            {sizes?.map((size: any, sizeIndex: number) => {
                              return (
                                  <Button variant='outlined' color='grey' className='relative' key={sizeIndex} onClick={() => updateSizeVariationValue(index, size?.id)}>
                                    <p className='text-xs text-neutral'>{size?.code}</p>
                                    <button
                                      className='absolute  p-1  bg-gray-100 text-xl rounded-full text-secondary-text'
                                      onClick={() => deleteSizePreset(index, size.id)}
                                      style={{
                                        transform: 'translate(-190%, -70%)'
                                      }}
                                    >
                                      <AiOutlineClose size={15}/>
                                    </button>
                                  </Button>
                              )
                            })}
                          </div>
                      </div>
                    </div>
                  )}

                  {displayAddSize === index && (
                    <div
                      className='absolute top-2 right-2 p-4 border border-gray-200 bg-white rounded-lg z-20'
                      ref={displayAddSizeRef}
                    >  
                      <label htmlFor='size' className='text-sm text-neutral mb-2 block'>
                          Input size presets:
                      </label>

                      <TextInput
                        type='string'
                        // id='sizeToAdd'
                        value={sizeToAdd}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          console.log(e);
                          setSizeToAdd((prev: any) => prev = e.target.value);
                        }}
                        className='mb-3'
                      />

                      <label htmlFor='sizeCode' className='text-sm text-neutral mb-2 block'>
                          Input size code:
                      </label>
                      <label htmlFor='sizeCode' className='text-sm text-neutral mb-2 block'>
                          Input size code:
                      </label>

                      <TextInput
                        type='string'
                        // id='sizeToAdd'
                        value={sizeCode}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          console.log(e);
                          setSizeCode((prev: any) => prev = e.target.value);
                        }}
                        className='mb-3'
                      />
                      <TextInput
                        type='string'
                        // id='sizeToAdd'
                        value={sizeCode}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          console.log(e);
                          setSizeCode((prev: any) => prev = e.target.value);
                        }}
                        className='mb-3'
                      />

                      <Button className='w-full' onClick={() => createNewSizePreset(sizeToAdd, sizeCode)}>
                          {/* <FaPlus /> */}
                          Update Size preset
                      </Button>
                    </div>
                  )}
                </div>
                <button
                  className='bg-red-100 text-red-600 p-3.5 rounded-md my-5 text-xl'
                  onClick={() => updateSizeVariationValue(index, 0)}
                >
                  <IoClose />
                </button>
              </div>
              
              <div className='flex justify-between w-full gap-2'>
                <div className='mb-4 w-full'>
                  <label htmlFor='quantity' className='text-sm text-neutral mb-2 block'>
                    Quantity:
                  </label>
                  <TextInput
                    type='number'
                    id='quantity'
                    value={option.quantity}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateVariationQuantity(e, index)}
                  />
                </div>
                <button
                  className='bg-red-100 text-red-600 p-3.5 rounded-md my-5 text-xl'
                  onClick={() => deleteVariationQuantity(index, 0)}
                >
                  <IoClose />
                </button>
              </div>
            </div>
          );
        })}
        
        {/* <div className='flex mt-3 items-start'>
            <Button 
              onClick={addNewSizeOptions} 
            >
                Add
            </Button>
        </div> */}
    </div>
  );
};

const ProductVariations = ({
  dispatch,
  state,
  colors,
  sizes,
  productId,
  amount,
}: {
  dispatch: React.Dispatch<{
    type: 'ADD' | 'DELETE' | 'UPDATE' | "RESET_STATE";
    payload: ProductVariationData;
    newState: IProductVariations[] | [];
  }>;
  state: ProductVariationData[];
  colors?: IColors | undefined;
  sizes?: ISizes | undefined;
  productId?: number;
  amount?: number | undefined
}) => {
  const addVariation = () => {
    const newVariation: ProductVariationData = {
      id: state.length + 1,
      colorId: 0,
      imageUrl: '',
      imageFile: null,
      sizeOptions: [],
    };

    dispatch({ type: 'ADD', payload: newVariation, newState: [] });
  };

  const [displayAddVariation, setDisplayAddVariation] = useState<boolean>(false);

  const handleVariationChange = (
    id: number,
    colorId: 0,
    imageUrl: '',
    imageFile: null,
    sizeOptions: [],
  ) => {
    dispatch({ type: 'UPDATE', payload: { id, colorId, imageFile, imageUrl, sizeOptions, }, newState: [] });
  };

  const deleteVariation = (id: number) => {
    const current = state.find((variation) => variation.id === id);

    if (current)
      dispatch({
        type: 'DELETE',
        payload: current,
        newState: [],
      });
  };

  // All needed props and states and functions for the add variations modal
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const addNewImage = (e: ChangeEvent<HTMLInputElement>) => {
    let imagesCopy: File | null = null;

    if (e.target.files) {
      // imagesCopy.push({ image: e.target.files[0], color: '#000000' });
      // imagesCopy.push({ image: e.target.files[0] });
      console.log(e.target.files);
      const fileSizeInBytes = e.target.files[0].size;
      const fileType = e.target.files[0].type;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

      if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
        toast.error('File type is not supported!');
        return;
      }

      if (fileSizeInMB >= 1) {
        toast.error('File size is too large');
        return;
      }

      imagesCopy = e.target.files[0];
    }
    // setVariationImage(imagesCopy);
    // dispatch({
    //   type: 'UPDATE',
    //   payload: { ...variation, imageFile: imagesCopy },
    //   newState: [],
    // });
    setNewVariation({ ...newVariation, imageFile: imagesCopy });
  };

  const [newVariation, setNewVariation] = useState<ProductVariationData>({
    id: state.length + 1,
    colorId: 0,
    imageUrl: '',
    imageFile: null,
    sizeOptions: [],
  });

  const [variationColor, setVariationColor] = useState<string>("");
  // const [sizeName, setSizeName] = useState<any>("");
  const [activeColorPicker, setActiveColorPicker] = useState<boolean>(false);
  const [sizePicker, setSizePicker] = useState<boolean | number | null>(null);

  const [displayAddColor, setDisplayAddColor] = useState<boolean | number | null>(false);
  const [colorToAdd, setColorToAdd] = useState<string>("");

  const [displayAddSize, setDisplayAddSize] = useState<boolean | number | null>(-1);
  const [sizeToAdd, setSizeToAdd] = useState<string | null | any>('');
  const [sizeCode, setSizeCode] = useState<string | null | any>('');

  const updateVariationQuantity = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const variationQuantitySum: number = state.reduce((acc, current) => acc + current.sizeOptions.reduce((accum, cur) => accum + cur.quantity, 0), 0);

    if(amount) {
      if(Number(e.target.value) + variationQuantitySum > amount) {
        toast.error("Your variation quantities must not exceed actual product quantity");
        return;
      }
    }

    const newSizeOptions = newVariation.sizeOptions.map((option, idx) => {
      if(idx === index) {
        return {...option, quantity: Number(e.target.value) };
      }
      return option;
    });

    // dispatch({
    //   type: 'UPDATE',
    //   payload: { ...variation, sizeOptions: newSizeOptions },
    //   newState: [],
    // });
    setNewVariation({...newVariation, sizeOptions: newSizeOptions});
  };

  const updateSizeVariationValue = (index: number, value: number) => {
    const newSizeOptions = newVariation.sizeOptions.map((option, idx) => {
      if(idx === index) {
        return {...option, sizeId: Number(value) };
      }
      return option;
    });

    // dispatch({
    //   type: 'UPDATE',
    //   payload: { ...variation, sizeOptions: newSizeOptions },
    //   newState: [],
    // });
    setNewVariation({ ...newVariation, sizeOptions: newSizeOptions },);
    setSizePicker(null);
  }

  const updateColorVaritionValue = (colorId: number) => {
    // dispatch({
    //   type: 'UPDATE',
    //   payload: { ...variation, colorId: colorId },
    //   newState: [],
    // });
    setNewVariation({ ...newVariation, colorId: colorId },);
  }

  const addNewSizeOptions = () => {
    const newSizeOptions = [...newVariation?.sizeOptions, { sizeId: 0, quantity: 0 }]

    // dispatch({
    //   type: 'UPDATE',
    //   payload: { ...variation, sizeOptions: newSizeOptions },
    //   newState: [],
    // }); 
    setNewVariation({ ...newVariation, sizeOptions: newSizeOptions });
  }

  const removeImage = () => {
    // dispatch({
    //   type: 'UPDATE',
    //   payload: { ...variation, imageFile: null },
    //   newState: [],
    // });
    setNewVariation({ ...newVariation, imageFile: null },);
  };

  const createNewSizePreset = async (size: string, code: string) => {
    const cookies = new Cookies();
    const token = cookies.get('urban-token');

    const httpService = new HTTPService();

    const data = {
      name: size,
      code,
    }

    try {
      httpService
        .post(ENDPOINTS.SIZE_SETTINGS, data, `Bearer ${token}`)
        .then((apiRes) => {
          console.log('Response: ', apiRes);

          if (apiRes.data) {
            sizes?.push(apiRes.data);
            toast.success('Size preset added successfully.');
            setDisplayAddSize(-1);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const createNewColorPreset = async (color: string) => {
    const cookies = new Cookies();
    const token = cookies.get('urban-token');

    const httpService = new HTTPService();

    const data = {
      name: GetColorName(color),
      code: color,
    }

    try {
      httpService
        .post(ENDPOINTS.COLOR_SETTINGS, data, `Bearer ${token}`)
        .then((apiRes) => {
          console.log('Response: ', apiRes);

          if (apiRes.data) {
            toast.success('Color preset added successfully.');
            colors?.push(apiRes.data);
            setDisplayAddColor(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  const createNewProductVariation = async (variation: ProductVariationData) => {
    const variationQuantitySum: number = state.reduce((acc, current) => acc + current.sizeOptions.reduce((accum, cur) => accum + cur.quantity, 0), 0);

    if(amount) {
      if(variation.sizeOptions.reduce((accum, cur) => accum + cur.quantity, 0) + variationQuantitySum > amount) {
        toast.error("Your variation quantities must not exceed actual product quantity.");
        return;
      }
    }

    try {
      const cookies = new Cookies();
      const token = cookies.get('urban-token');
      const httpService = new HTTPService();

      const variationFormdata = new FormData();
      if(variation.imageFile !== null) {
        variationFormdata.append('file', variation.imageFile);                
      }

      const requestOptions = {
        method: 'POST',
        body: variationFormdata,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL}/api/v1/${ENDPOINTS.UPLOAD_FILE}`,
        requestOptions
      );

      const jsonRes = await response.json();
      console.log(jsonRes);
      
      const { colorId, sizeOptions } = variation;
      const data = {
        productVarations: [
          {
            colorId,
            sizeOptions,
            productId: productId, 
            imageUrl: jsonRes.url
          }
        ]
      }

      if(jsonRes) {
        httpService
          .post(`${ENDPOINTS.PRODUCTS}/add-varation`, data, `Bearer ${token}`)
          .then((apiRes) => {
            console.log('Response: ', apiRes);

            if (apiRes.data) {
              toast.success('Product variation added successfully.');
              dispatch({ type: 'ADD', payload: apiRes.data, newState: [] });
              console.log(apiRes.data);
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  function CloseButton({ handleClick }: {handleClick: () => void;}) {
    return (
      <button
        className='p-2 bg-gray-100 text-xl rounded-full text-secondary-text'
        onClick={handleClick}
      >
        <AiOutlineClose />
      </button>
    );
  }

  return (
    <div>
        <div className='flex items-center gap-4 mt-8'>
            <Button onClick={() => setDisplayAddVariation(true)} variant='outlined' color='primary-2'>
                <FaPlus />
                Add Variant
            </Button>
        </div>

        {state.map((variation, index) => {
            return (
                <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4' key={index}>
                    {/* <p className='text-lg font-semibold text-gray-700 mb-8'>Variation</p>
                    <div className='flex items-center gap-2'>
                      <button
                        className='bg-red-100 text-red-600 p-3.5 rounded-md text-xl'
                        onClick={() => deleteVariation(variation.id)}
                      >
                        <IoClose />
                      </button>
                      <p>Delete variation</p>
                    </div> */}
                    <div className='flex items-center justify-between mb-3'>
                      <p className='text-lg font-semibold text-gray-700'>Variation</p>
                      <CloseButton handleClick={() => deleteVariation(variation.id)} />
                    </div>
                    <VariationItem
                        key={variation.id}
                        variation={variation}
                        // onVariationChange={handleVariationChange}
                        onDelete={deleteVariation}
                        dispatch={dispatch}
                        sizes={sizes}
                        colors={colors}
                        quantity={amount}
                        allVariations={state}
                    />
                </div>
            );
        })}

        <Modal
          isOpen={displayAddVariation}
          handleClose={() => setDisplayAddVariation(false)}
          title='Add new variation'
        >
          <div className='flex items-start gap-4 w-full flex-col sm:items-center py-4 border-b border-b-gray-100'>
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
                    {newVariation.imageFile == null && <p>Click below to upload an image. Your image should not exceed 1MB and should be either a .jpeg or .png</p>}
                    <div className='flex items-center flex-wrap gap-2 mb-4'>
                      {newVariation.imageFile &&
                          <div
                            className='h-28 w-28 relative rounded-xl'
                          >
                            {/* <span className='text-xs absolute top-2 left-2 text-dark bg-green-100 py-1 px-2 rounded-md'>
                              {index + 1}
                            </span> */}
                            <Image
                              src={URL.createObjectURL(newVariation?.imageFile)}
                              alt={newVariation.imageFile.name}
                              width={100}
                              height={100}
                              className='rounded-lg w-full h-full object-cover'
                            />
                            <button
                              className='absolute bottom-4 right-4 text-dark rounded-md p-1 bg-green-100'
                              onClick={() => removeImage()}
                            >
                              <RiDeleteBin6Fill />
                            </button>
                          </div>
                      }
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

              <div className='mb-4 w-full relative'>
                  <label htmlFor='color' className='text-sm text-neutral mb-2 block'>
                      Color:
                  </label>
                  <div 
                      className = {
                          clsx('h-[48px] bg-[#E0E2E7] px-4 py-2 rounded-lg border border-dark-100 flex gap-2 items-center',)
                      }
                      onClick={() => setActiveColorPicker(true)}
                  >
                      {variationColor === "" ? "Select a color..." : variationColor}
                      <IoIosArrowDown className='absolute right-4 top-auto bottom-auto' />
                  </div>

                    {activeColorPicker && (
                      <div
                        className='absolute top-2 right-2 p-4 border border-gray-200 bg-white rounded-lg z-20'
                      >   
                        <div
                          className="flex justify-between align-center mb-2"
                        >
                          <p>Cant find your color?</p>
                          <Button 
                            onClick={() => {
                              setDisplayAddColor(true);
                              setActiveColorPicker(false);
                            }}
                          >
                            <FaPlus />
                            Add Color
                          </Button>
                        </div>

                        <div className='w-full'>
                            <p className='text-sm text-neutral mb-2'>Presets</p>

                            <div className='flex flex-wrap gap-1'>
                              {colors?.map((color: IColor, colorIndex: number) => {
                                return (
                                    <Button 
                                      variant='outlined' 
                                      color='grey' 
                                      key={colorIndex} 
                                      onClick={() => {
                                        setVariationColor(color?.name);
                                        updateColorVaritionValue(color.id);
                                        setActiveColorPicker(false);
                                      }}
                                    >
                                      <p className='text-xs text-neutral'>{color?.name}</p>
                                    </Button>
                                )
                              })}
                            </div>
                        </div>
                      </div>
                    )}

                    {displayAddColor && (
                      <div
                        className='absolute top-2 z-20 right-2 p-4 border border-gray-200 bg-white rounded-lg'
                      >  
                        <SketchPicker
                            // color={variationColor}
                            onChange={(color) => {
                                console.log(color);
                                setColorToAdd(color.hex);
                            }}
                            className='relative z-20 mb-3'
                        /> 

                        <label htmlFor='color' className='text-sm text-neutral mb-2 block'>
                            Color:
                        </label>
                        <div 
                            className = {
                                clsx('h-[48px] bg-white px-4 py-2 mb-3 rounded-lg border border-dark-100 flex gap-2 items-center',)
                            }
                        >
                            {colorToAdd === "" ? "Select a color..." : colorToAdd}
                        </div>

                        <Button className='w-full' onClick={() => createNewColorPreset(colorToAdd)}>
                            <FaPlus />
                            Update color presets
                        </Button>
                      </div>
                    )}
              </div>

              {newVariation.sizeOptions?.map((option, index) => {
                return (
                  <div className='items-start gap-4 w-full' key={index}>
                    <div className='mb-4 w-full relative'>
                      <label htmlFor='size' className='text-sm text-neutral mb-2 block'>
                        Size:
                      </label>
                      <div 
                          className = {
                              clsx('h-[48px] bg-[#E0E2E7] px-4 py-2 rounded-lg border border-dark-100 flex gap-2 items-center',)
                          }
                          onClick={() => setSizePicker(index)}
                      >
                          {/* {sizes?.filter((size: any) => size.id == option?.sizeId)} */}
                          {/* {option?.sizeId} */}
                          {sizes?.find((size: ISize) => size.id == option?.sizeId)?.code ? sizes?.find((size: ISize) => size.id == option?.sizeId)?.code : "Select a variation size..."}
                          {/* {} */}
                          <IoIosArrowDown className='absolute right-4 top-auto bottom-auto' />
                      </div>
                      
                      {sizePicker === index && (
                        <div
                          className='absolute top-2 right-2 p-4 border border-gray-200 bg-white rounded-lg z-20'
                        >   
                          <div
                            className="flex justify-between align-center mb-2"
                          >
                            <p>Cant find size?</p>
                            <Button 
                              onClick={() => {
                                setDisplayAddSize(index);
                                setSizePicker(-1);
                              }}
                            >
                              <FaPlus />
                              Add Size
                            </Button>
                          </div>

                          <div className='w-full'>
                              <p className='text-sm text-neutral mb-2'>Presets</p>

                              <div className='flex flex-wrap gap-1'>
                                {sizes?.map((size: any, sizeIndex: number) => {
                                  return (
                                      <Button variant='outlined' color='grey' key={sizeIndex} onClick={() => updateSizeVariationValue(index, size?.id)}>
                                        <p className='text-xs text-neutral'>{size?.code}</p>
                                      </Button>
                                  )
                                })}
                              </div>
                          </div>
                        </div>
                      )}

                      {displayAddSize === index && (
                        <div
                          className='absolute top-2 right-2 p-4 border border-gray-200 bg-white rounded-lg z-20'
                        >  
                          <label htmlFor='size' className='text-sm text-neutral mb-2 block'>
                              Input size presets:
                          </label>

                          <TextInput
                            type='string'
                            // id='sizeToAdd'
                            value={sizeToAdd}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              console.log(e);
                              setSizeToAdd((prev: any) => prev = e.target.value);
                            }}
                            className='mb-3'
                          />

                          <label htmlFor='sizeCode' className='text-sm text-neutral mb-2 block'>
                              Input size code:
                          </label>

                          <TextInput
                            type='string'
                            // id='sizeToAdd'
                            value={sizeCode}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              console.log(e);
                              setSizeCode((prev: any) => prev = e.target.value);
                            }}
                            className='mb-3'
                          />

                          <Button className='w-full' onClick={() => createNewSizePreset(sizeToAdd, sizeCode)}>
                              {/* <FaPlus /> */}
                              Update Size preset
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className='mb-4 w-full'>
                      <label htmlFor='quantity' className='text-sm text-neutral mb-2 block'>
                        Quantity:
                      </label>
                      <TextInput
                        type='number'
                        id='quantity'
                        value={option.quantity}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateVariationQuantity(e, index)}
                      />
                    </div>
                  </div>
                );
              })}
              
              <div className='flex mt-3 items-start'>
                  <Button 
                    onClick={addNewSizeOptions} 
                  >
                      Add
                  </Button>
              </div>
          </div>

          <div className='flex mt-3 items-center justify-center'>
            <Button 
              onClick={() => createNewProductVariation(newVariation)}
            >
                Create new product variation
            </Button>
          </div>
        </Modal>
    </div>
  );
};

export default ProductVariations;
