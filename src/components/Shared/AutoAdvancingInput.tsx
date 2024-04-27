import React, { LegacyRef, useRef, useState } from 'react';

interface AutoAdvancingInputProps {
  numberOfBoxes: number;
  onInputChange: (value: string) => void;
}

const AutoAdvancingInput: React.FC<AutoAdvancingInputProps> = ({
  numberOfBoxes,
  onInputChange,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  let val: string[] = [];

  const handleInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    val[index] = value;

    if (value.length === 1 && index < numberOfBoxes - 1)
      inputRefs.current[index + 1]?.focus();

    if (index === numberOfBoxes - 1) {
      const stringVal = val.join('');

      onInputChange(stringVal);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    let currentFieldValue = inputRefs.current[index - 1]?.value;

    if (e.key === 'Backspace' && index > 0) {
      if (inputRefs.current[index]?.value === '') {
        inputRefs.current[index - 1]?.focus();
        currentFieldValue = '';
      } else {
        currentFieldValue = '';
      }
    }
  };

  return (
    <form className='flex items-center justify-center gap-4'>
      {[...Array(numberOfBoxes)].map((_, index) => (
        <input
          key={index}
          className='outline-none border border-primary rounded-lg bg-white text-xl text-center w-16 h-16'
          type='text'
          maxLength={1}
          onChange={(e) => {
            if (!isNaN(+e.target.value)) {
              handleInputChange(index, e);
            } else e.target.value = '';
          }}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(ref: HTMLInputElement | null) => {
            if(ref) {
              inputRefs.current[index] = ref
            }
          }}
          // ref={(instance: HTMLInputElement | null) => {
          //   if (instance) {
          //     inputRefs.current[index] = instance;
          //   }
          // }}
        />
      ))}
    </form>
  );
};

export default AutoAdvancingInput;
