import { BsFillBasket3Fill } from 'react-icons/bs';
import { FiShoppingCart, FiUsers } from 'react-icons/fi';
import { IoHomeSharp } from 'react-icons/io5';
import { LuMail } from 'react-icons/lu';
import {
  MdOutlineAssignmentReturned,
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineShoppingBag,
  MdWallpaper,
} from 'react-icons/md';
import { CiShop } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { RiPercentLine } from 'react-icons/ri';
import testimonial1 from '../../public/assets/testimonials/testimonial-1.png';
import testimonial2 from '../../public/assets/testimonials/testimonial-2.png';
import testimonial3 from '../../public/assets/testimonials/testimonial-3.png';
import testimonial4 from '../../public/assets/testimonials/testimonial-4.png';
import testimonial5 from '../../public/assets/testimonials/testimonial-5.png';

export const links: ISidebarLink[] = [
  { name: 'dashboard', icon: <MdOutlineDashboard />, page: '/admin' },
  { 
    name: 'products', 
    icon: <MdOutlineShoppingBag />, 
    page: '/admin/products' ,
    children: [
      { name: 'Product List', page: '/admin/products' },
      { name: 'Categories', page: '/admin/categories' },
    ],
  },
  { name: 'orders', icon: <FiShoppingCart />, page: '/admin/orders' },
  { name: 'customers', icon: <FiUsers />, page: '/admin/customers' },
  {
    name: 'home slideshow',
    icon: <MdWallpaper />,
    page: '/admin/home-slideshow',
  },
  {
    name: 'return request',
    icon: <MdOutlineAssignmentReturned />,
    page: '/admin/return-request',
  },
  {
    name: 'discount codes',
    icon: <RiPercentLine />,
    page: '/admin/discount-codes',
  },
  { name: 'notification', icon: <LuMail />, page: '/admin/notifications' },
  // { name: 'settings', icon: <IoMdSettings />, page: '/admin/settings' },
];

export type ISidebarLink = {
  name: string;
  page: string;
  icon: React.ReactNode;
  children?: ILink[];
}

type ILink = {
  name: string;
  page: string;
  children?: {
    name: string;
    page: string;
  }[];
};

export type RootLink = {
  title: string;
  root: string;
  icon: React.ReactNode;
  children: ILink[];
};

export const sellerLinks: RootLink[] = [
  {
    title: 'home',
    root: '/seller',
    icon: <IoHomeSharp />,
    children: [
      { name: 'dashboard', page: '/seller' },
      { name: 'sales', page: '/seller/sales' },
    ],
  },
  {
    title: 'ecommerce',
    root: '/seller/products',
    icon: <BsFillBasket3Fill />,
    children: [
      {
        name: 'products',
        page: '/seller/products',
        children: [
          { name: 'all products', page: '/seller/products' },
          { name: 'edit product', page: '/seller/products/edit' },
          { name: 'new product', page: '/seller/products/new' },
        ],
      },
      {
        name: 'orders',
        page: '/seller/orders',
        children: [
          { name: 'order list', page: '/seller/orders' },
          { name: 'edit detail', page: '/seller/orders/order-detail' },
        ],
      },
    ],
  },
];

export const testimonials = [
  {
    title: 'the best fashion app ever!',
    body: 'Urban Overstock has completely transformed my wardrobe game! With their app, I`ve been able to discover unique pieces that perfectly match my style. The curated collections are always on point, and the personalized recommendations make shopping a breeze. Thanks to Urban Overstock, I`m always ahead of the fashion curve!',
    user: 'Nick Jonas',
    color: 'bg-red-500',
    imgUrl: testimonial1,
  },
  {
    title: 'Curated Collections',
    body: 'Step into a world of handpicked urban fashion, from streetwear staples to bold statement pieces.',
    user: 'Jonas Nick',
    color: 'bg-orange-500',
    imgUrl: testimonial2,
  },
  {
    title: 'Interactive Shopping Experience',
    body: 'Shop effortlessly. Explore trends, discover details, and purchase seamlessly with our intuitive app.',
    user: 'Smith John',
    color: 'bg-yellow-500',
    imgUrl: testimonial3,
  },
  {
    title: 'Personalized Recommendations',
    body: 'Get style recommendations tailored just for you. Our app learns your preferences for a truly personalized shopping experience.',
    user: 'Jane Doe',
    color: 'bg-green-500',
    imgUrl: testimonial4,
  },
  {
    title: 'Urban Fashion store',
    body: 'The app offers a seamless shopping experience, making it effortless to browse, discover, and purchase your favorite urban fashion pieces.',
    user: 'Adam Smith',
    color: 'bg-blue-500',
    imgUrl: testimonial5,
  },
];
