import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import TopSellingProductsTable from './TopSellingProductsTable';
import getAllProducts from '@/libs/products';
import { IProducts } from '@/interfaces/products';
// import HTTPService from '@/services/http';
import SalesByLocationTable from './SalesByLocationTable';

const Sales = async ({ products } : { products: IProducts | null | undefined}) => {
    // const httpService = new HTTPService();
    

    return (
        <section className='grid grid-cols-1 xl:grid-cols-6 gap-4 my-8'>
            <div className='rounded-lg bg-white border border-neural p-6 xl:col-span-4'>
                <div className='mb-8'>
                    <p className='text-neutral font-semibold text-xl'>Top selling products</p>
                    {/* <p className='text-neutral text-sm'>Revenue and Sales</p> */}
                </div>

                <div>
                    <TopSellingProductsTable products={products}/>
                </div>
            </div>

            <div className='rounded-lg bg-white border border-neural p-6 xl:col-span-2'>
                <div className='mb-8'>
                    <p className='text-neutral font-semibold text-xl'>Sales by Location</p>
                    <p className='text-neutral text-sm'>Sales performance by location</p>
                </div>

                {/*  */}
                <div>
                    <SalesByLocationTable />
                </div>
            </div>
        </section>
    );
}

export default Sales;