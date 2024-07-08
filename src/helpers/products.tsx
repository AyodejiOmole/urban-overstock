import { IProduct } from '@/interfaces/products';

export function productStatusTemplate(product: IProduct) {
  const { status } = product;

  let styles = '';

  switch (product.status.toLocaleLowerCase()) {
    case 'draft':
      styles = 'bg-gray-100 text-gray-600';
      break;
    case 'low stock':
      styles = 'bg-orange-100 text-orange-600';
      break;
    case 'published':
      styles = 'bg-green-100 text-green-600';
      break;
    case 'out of stock':
      styles = 'bg-red-100 text-red-600';
      break;
    default:
      styles = 'bg-blue-100 text-blue-600';
  }

  return (
    <span
      className={`p-2 px-4 text-xs font-semibold rounded-full whitespace-nowrap ${styles}`}
      // className={`w-[100px] h-[25px] flex justify-center items-center text-xs font-semibold rounded-full ${styles}`}      
    >
      {product.status}
    </span>
  );
}
