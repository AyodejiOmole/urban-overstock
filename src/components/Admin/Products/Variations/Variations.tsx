import Button from '@/components/Global/Button';
import TextInput from '@/components/Global/TextInput';
import React, { ChangeEvent, useReducer, useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface ProductVariationProps {
  value: string;
  quantity: number;
}

export interface VariationData {
  // [key: string]: string | number;
  id: number;
  type: string;
  value: string;
  quantity: number;
}

interface BrandVariationProps extends ProductVariationProps {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setQuantity: (e: ChangeEvent<HTMLInputElement>) => void;
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
    <div className='flex items-start gap-4 w-full'>
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

const BrandVariation: React.FC<BrandVariationProps> = ({
  value,
  onChange,
  quantity,
  setQuantity,
}) => {
  return (
    <div className='flex items-start gap-4 w-full'>
      <div className='mb-4 w-full'>
        <label htmlFor='brand' className='text-sm text-neutral mb-2 block'>
          Brand:
        </label>
        <TextInput type='text' id='brand' value={value} onChange={onChange} />
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
}: {
  variation: VariationData;
  onVariationChange: (
    id: number,
    type: string,
    value: string,
    quantity: number
  ) => void;
  onDelete: (id: number) => void;
  dispatch: React.Dispatch<{
    type: 'ADD' | 'DELETE' | 'UPDATE';
    payload: VariationData;
  }>;
}) => {
  const [variationType, setVariationType] = useState<string>('');
  const [variationValue, setVariationValue] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVariationType(e.target.value);
    setVariationValue('');

    onVariationChange(variation.id, e.target.value, variation.value, quantity);
  };

  const updateVariationQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));

    dispatch({
      type: 'UPDATE',
      payload: { ...variation, quantity: Number(e.target.value) },
    });
  };

  const updateVariationValue = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch({
      type: 'UPDATE',
      payload: { ...variation, value: e.target.value },
    });
  };

  return (
    <div className='flex items-start gap-4 w-full flex-col sm:flex-row sm:items-center py-4 border-b border-b-gray-100'>
      <div className='mb-4 w-full'>
        <label
          htmlFor='variationType'
          className='text-sm text-neutral mb-2 block'
        >
          Variation Type:
        </label>
        <select
          id='variationType'
          value={variationType}
          onChange={handleTypeChange}
        >
          <option value=''>Select Variation Type</option>
          <option value='size'>Size</option>
          <option value='brand'>Brand</option>
        </select>
      </div>

      {variationType === 'size' && (
        <SizeVariation
          value={variation.value}
          onChange={updateVariationValue}
          quantity={variation.quantity}
          setQuantity={updateVariationQuantity}
        />
      )}
      {variationType === 'brand' && (
        <BrandVariation
          value={variation.value}
          onChange={updateVariationValue}
          quantity={variation.quantity}
          setQuantity={updateVariationQuantity}
        />
      )}

      <button
        className='bg-red-100 text-red-600 p-3.5 rounded-md mt-2 text-xl'
        onClick={() => onDelete(variation.id)}
      >
        <IoClose />
      </button>
    </div>
  );
};

const ProductVariations = ({
  dispatch,
  state,
}: {
  dispatch: React.Dispatch<{
    type: 'ADD' | 'DELETE' | 'UPDATE';
    payload: VariationData;
  }>;
  state: VariationData[];
}) => {
  const addVariation = () => {
    const newVariation: VariationData = {
      id: state.length + 1,
      type: '',
      value: '',
      quantity: 0,
    };

    dispatch({ type: 'ADD', payload: newVariation });
  };

  const handleVariationChange = (
    id: number,
    type: string,
    value: string,
    quantity: number
  ) => {
    dispatch({ type: 'UPDATE', payload: { id, type, value, quantity } });
  };

  const deleteVariation = (id: number) => {
    const current = state.find((variation) => variation.id === id);

    if (current)
      dispatch({
        type: 'DELETE',
        payload: current,
      });
  };

  return (
    <div>
      {state.map((variation) => (
        <VariationItem
          key={variation.id}
          variation={variation}
          onVariationChange={handleVariationChange}
          onDelete={deleteVariation}
          dispatch={dispatch}
        />
      ))}
      <div className='flex items-center gap-4 mt-8'>
        <Button onClick={addVariation} variant='outlined' color='primary-2'>
          Add Variant
        </Button>
      </div>
    </div>
  );
};

export default ProductVariations;
