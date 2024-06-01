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
import { IoIosArrowDown } from 'react-icons/io';
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
  colorId: number,
  imageFile: File | null,
  imageUrl: string
  sizeOptions: { sizeId: number, quantity: number | undefined }[],
}

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
    type: 'ADD' | 'DELETE' | 'UPDATE';
    payload: ProductVariationData;
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
    const variationQuantitySum: number = allVariations.reduce((acc, current) => acc + current.sizeOptions.reduce((accum, cur) => accum + (cur?.quantity ?? 0), 0), 0);

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
    });
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
    });

    setSizePicker(null);
  }

  const deleteVariationQuantity = (index: number) => {
    const newSizeOptions = variation.sizeOptions.map((option, idx) => {
      if(idx === index) {
        return {...option, quantity: undefined };
      }
      return option;
    });

    dispatch({
      type: 'UPDATE',
      payload: { ...variation, sizeOptions: newSizeOptions },
    });
  };

  const updateColorVaritionValue = (colorId: number) => {
    dispatch({
      type: 'UPDATE',
      payload: { ...variation, colorId: colorId },
    });
  }

  const addNewSizeOptions = () => {
    const newSizeOptions = [...variation.sizeOptions, { sizeId: 0, quantity: undefined }]

    dispatch({
      type: 'UPDATE',
      payload: { ...variation, sizeOptions: newSizeOptions },
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

    if(sizes?.find((existingSize: ISize) => existingSize.code === code) || sizes?.find((existingSize: ISize) => existingSize.name === size)) {
      toast.error("This size preset already exists!");
      setDisplayAddSize(-1);
    } else {
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
  }

  const createNewColorPreset = async (color: string) => {
    const cookies = new Cookies();
    const token = cookies.get('urban-token');

    const httpService = new HTTPService();

    const data = {
      name: GetColorName(color),
      code: color,
    }

    if(colors?.find((existingColor: IColor) => existingColor.code.toString() === color)) {
      toast.error("This color preset already exists!");
      setDisplayAddColor(false);
    } else {
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
  }

  const deleteSizePreset = async (variationIndex: number, sizeId: number) => {
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
            // updateSizeVariationValue(variationIndex, 0)
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteColorPreset = async (colorId: number) => {
    const cookies = new Cookies();
    const token = cookies.get('urban-token');

    const httpService = new HTTPService();
    toast.loading("Deleting color preset...");

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
            // updateColorVaritionValue(0);
            // toast.dismiss();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
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

        <div className='w-full flex justify-between gap-2 align-center justify-center'>
            <div className='w-full relative'>
                <label htmlFor='color' className='text-sm text-neutral mb-2 block'>
                    Color:
                </label>
                <div 
                    className = {
                        clsx('h-[48px] bg-[#F0F1F3] text-black px-4 py-2 rounded-lg border border-dark-100 flex gap-2 items-center',)
                    }
                    onClick={() => setActiveColorPicker(true)}
                >
                    {/* {variationColor === "" ? "Select a color..." : variationColor} */}
                    {colors?.find((color: IColor) => color.id == variation.colorId)?.name ? colors?.find((color: IColor) => color.id == variation.colorId)?.name : "Select a color..."}
                    <IoIosArrowDown className='absolute right-4 top-auto bottom-auto'/>
                </div>

                  {activeColorPicker && (
                    <div
                      className='absolute top-2 right-2 p-4 border border-gray-200 bg-white rounded-lg z-20'
                      ref={activeColorPickerRef}
                    >   
                      <div
                        className="flex justify-between align-center mb-2 items-center gap-2"
                      >
                        <p>Cant find your color?</p>
                        <Button 
                          size='small'
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

                          <div className='flex flex-wrap gap-2'>
                            {colors?.map((color: IColor, colorIndex: number) => {
                              return (
                                <div key={colorIndex} className='flex gap-2'>
                                  <Button 
                                    variant='outlined' 
                                    color='grey' 
                                    size='small'
                                    
                                    className='relative'
                                    onClick={() => {
                                      setVariationColor(color?.name);
                                      updateColorVaritionValue(color.id);
                                      setActiveColorPicker(false);
                                    }}
                                  >
                                    <p className='text-xs text-neutral'>{color?.name}</p>
                                    {/* <button
                                      className='absolute  p-1  bg-gray-100 text-xl rounded-full text-secondary-text'
                                      onClick={() => deleteColorPreset(color.id)}
                                      style={{
                                        transform: 'translate(-190%, -70%)'
                                      }}
                                    >
                                      <AiOutlineClose size={15}/>
                                    </button> */}
                                  </Button>
                                  <div
                                    className='bg-red-100 px-6 py-3 text-xs text-red-600 text-center flex items-center justify-center gap-2 rounded-md'
                                    onClick={() => deleteColorPreset(color.id)}
                                  >
                                    <IoClose />
                                  </div>
                                </div>
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
                          // color={variationColor}
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

            
            <div
              className='bg-red-100 px-6 h-[48px] text-xs text-red-600 text-center flex items-center justify-center mt-auto gap-2 rounded-md'
              onClick={() => updateColorVaritionValue(0)}
            >
              <IoClose />
            </div>
        </div>

        {variation.sizeOptions.map((option, index) => {
          return (
            <div className='items-start gap-4 w-full' key={index}>
              <div className='w-full flex justify-between gap-2 mb-4'>
                <div className='w-full relative'>
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
                      <IoIosArrowDown className='absolute right-4 top-auto bottom-auto'/>
                  </div>
                  
                  {sizePicker === index && (
                    <div
                      className='absolute top-2 right-2 p-4 border border-gray-200 bg-white rounded-lg z-20'
                      ref={sizePickerRef}
                    >   
                      <div
                        className="flex justify-between align-center mb-2 gap-2"
                      >
                        <p>Cant find size?</p>
                        <Button 
                          size='small'
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

                          <div className='flex flex-wrap gap-2'>
                            {sizes?.map((size: any, sizeIndex: number) => {
                              return (
                                <div key={sizeIndex} className='flex gap-2'>
                                  <Button variant='outlined' size='small' className='relative' color='grey' onClick={() => updateSizeVariationValue(index, size?.id)}>
                                    <p className='text-xs text-neutral'>{size?.code}</p>
                                    {/* <button
                                      className='absolute  p-1  bg-gray-100 text-xl rounded-full text-secondary-text'
                                      onClick={() => deleteSizePreset(index, size.id)}
                                      style={{
                                        transform: 'translate(-190%, -70%)'
                                      }}
                                    >
                                      <AiOutlineClose size={15}/>
                                    </button> */}
                                  </Button>
                                  <div
                                    className='bg-red-100 px-6 py-3 text-xs text-red-600 text-center flex items-center justify-center gap-2 rounded-md'
                                    onClick={() => deleteSizePreset(index, size.id)}
                                  >
                                    <IoClose />
                                  </div>
                                </div>
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

                {/* <button
                  className='bg-red-100 text-red-600 px-3.5 rounded-md my-5 text-xl'
                  onClick={() => updateSizeVariationValue(index, 0)}
                >
                  <IoClose />
                </button> */}
                <div
                  className='bg-red-100 px-6 h-[48px] text-xs text-red-600 text-center flex items-center justify-center mt-auto gap-2 rounded-md'
                  onClick={() => updateSizeVariationValue(index, 0)}
                >
                  <IoClose />
                </div>
              </div>
              
              <div className='w-full flex justify-between gap-2'>
                <div className='w-full'>
                  <label htmlFor='quantity' className='text-sm text-neutral mb-2 block'>
                    Quantity:
                  </label>
                  <TextInput
                    type='number'
                    id='quantity'
                    placeholder='Enter quantity...'
                    value={option.quantity}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateVariationQuantity(e, index)}
                  />
                </div>
                
                {/* <button
                  className='bg-red-100 text-red-600 px-3.5 rounded-md my-5 text-xl'
                  type='submit'
                  onClick={() => deleteVariationQuantity(index)}
                >
                  <IoClose />
                </button> */}
                <div
                  className='bg-red-100 px-6 h-[48px] text-xs text-red-600 text-center flex items-center justify-center mt-auto gap-2 rounded-md'
                  onClick={() => deleteVariationQuantity(index)}
                >
                  <IoClose />
                </div>
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

      {/* <button
        className='bg-red-100 text-red-600 p-3.5 rounded-md mt-2 text-xl'
        onClick={() => onDelete(variation.id)}
      >
        <IoClose />
      </button> */}
    </div>
  );
};

const ProductVariations = ({
  dispatch,
  state,
  colors,
  sizes,
  amount,
}: {
  dispatch: React.Dispatch<{
    type: 'ADD' | 'DELETE' | 'UPDATE';
    payload: ProductVariationData;
  }>;
  state: ProductVariationData[];
  colors?: IColors | undefined;
  sizes?: ISizes | undefined;
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

    dispatch({ type: 'ADD', payload: newVariation });
  };

  const handleVariationChange = (
    id: number,
    colorId: 0,
    imageUrl: '',
    imageFile: null,
    sizeOptions: [],
  ) => {
    dispatch({ type: 'UPDATE', payload: { id, colorId, imageFile, imageUrl, sizeOptions, } });
  };

  const deleteVariation = (id: number) => {
    const current = state.find((variation) => variation.id === id);

    if (current)
      dispatch({
        type: 'DELETE',
        payload: current,
      });
  };

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
            <Button onClick={addVariation} variant='outlined' color='primary-2'>
                <FaPlus />
                Add Variant
            </Button>
        </div>
        {state.map((variation, index) => {
            return (
                <div className='p-4 sm:p-6 border border-gray-200 bg-white rounded-lg my-4' key={index}>
                    {/* <p className='text-lg font-semibold text-gray-700 mb-8'>Variation</p> */}
                    {/* <div className='flex items-center gap-2'>
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
    </div>
  );
};

export default ProductVariations;
