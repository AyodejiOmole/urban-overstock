import React from 'react';

interface IProps {
  defaultOption: number;
  categories: string[];
  handleCategoryChange: (newIndex: number) => void;
}

const CategoryNavigation = ({
  categories,
  defaultOption,
  handleCategoryChange,
}: IProps) => {
  return (
    <div className='flex items-center gap-4 flex-wrap p-2 bg-white rounded-lg w-full max-w-xl'>
      {categories.map((option, i) => (
        <button
          key={option}
          className={`p-2 px-4 rounded-lg capitalize text-sm duration-500  ${
            i === defaultOption ? 'bg-yellow-50 text-primary-2' : 'text-neutral'
          }`}
          onClick={() => handleCategoryChange(i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default CategoryNavigation;
