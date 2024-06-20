import { CgMenu } from 'react-icons/cg';

import { CiSearch } from 'react-icons/ci';
import TextInput from '../Global/TextInput';
import UserAvatar from '../Shared/UserAvatar';

export default function SellerHeader({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <div
      className={`p-4 flex gap-4 items-center justify-between bg-primary md:px-8 fixed top-0 left-0 w-full z-20 duration-500 ${
        isOpen ? 'lg:left-[16.66%] lg:w-5/6' : 'lg:left-[8.33%] lg:w-11/12'
      }`}
    >
      <div className='flex items-center gap-16 w-full flex-1'>
        <button
          className='font-bold capitalize text-2xl text-gray-700'
          onClick={toggleSidebar}
        >
          <CgMenu />
        </button>
        <p className='text-xl font-medium'>Dashboard</p>
        <div className='w-full max-w-md'>
          <TextInput
            placeholder='Search...'
            rightIcon={<CiSearch />}
            onChange={() => {}}
            rounded
          />
        </div>
      </div>

      {/* <UserAvatar name='Aiden Max' title='' /> */}
    </div>
  );
}
