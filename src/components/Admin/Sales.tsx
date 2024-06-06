import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import TopSellingProductsTable from './TopSellingProductsTable';
import SalesByLocationTable from './SalesByLocationTable';
import { ITopOrdersLocation, ITopProduct } from '@/interfaces/top-selling-products';
import { IoIosLock } from "react-icons/io";

const Sales = ({ 
    products, 
    // categoryNavigation 
    salesByLocation,
} : { 
    products: ITopProduct[] | null | undefined; 
    salesByLocation: ITopOrdersLocation[] | null | undefined;
    // categoryNavigation: any
}) => {
    
    return (
        <section className='grid grid-cols-1 xl:grid-cols-6 gap-4 my-8'>
            <div className='rounded-lg bg-white border border-neural p-6 xl:col-span-4'>
                <div className='mb-8'>
                    <p className='text-neutral font-semibold text-xl'>Top 10 selling products</p>
                </div>

                <div>
                    <TopSellingProductsTable 
                        products={products} 
                    />
                </div>
            </div>

            <div className='rounded-lg bg-white relative border border-neural p-6 xl:col-span-2'>
                {/* Gray out the entire display */}
                {/* <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                Display "Coming Soon" text
                <div className="absolute inset-0 flex items-center gap-2 justify-center text-sm font-bold text-black">
                    <IoIosLock color="black"/> Coming soon
                </div> */}
                <div className='mb-8'>
                    <p className='text-neutral font-semibold text-xl'>Sales by Location</p>
                    <p className='text-neutral text-sm'>Sales performance by location</p>
                </div>

                {/*  */}
                <div className='relative'>
                    <SalesByLocationTable salesByLocation={salesByLocation}/>
                </div>
            </div>
        </section>
    );
}

export default Sales;