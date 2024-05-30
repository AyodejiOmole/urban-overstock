"use client"
import React from 'react'
import Header from './Header';
import StatCards from '../StatCards';
import Sales from '../Sales';
import SalesChart from '../SalesChart';
import OrdersTable from '../Orders/OrdersTable';
import { IGraphDetails } from '@/interfaces/graph';
import { ITopSellingProducts } from '@/interfaces/top-selling-products';
import { IOrder } from '@/interfaces/orders';
import { useState } from 'react';
import CategoryNavigation from '@/components/Shared/CategoryNavigation';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

const filter_options = [
    'all time',
    '12 months',
    '30 days',
    '7 days',
    '24 hours',
  ];

export interface IDashboardData {
    costomers: number
    quantity: number
    sales: number
    revenue: number
}

export default function AdminPage ({
    dashboardData,
    graph,
    topSellingProducts,
    orders,
}: {
    dashboardData: IDashboardData | null;
    graph: IGraphDetails | null,
    topSellingProducts: ITopSellingProducts | undefined,
    orders: IOrder[] | null;
}) {

    // const [categoryNavigation, setCategoryNavigation] = useState<any>();
    const [categoryNavigation, setCategoryNavigation] = useState<{ startDate: Date | null; endDate: Date | null } | null>(null);

    const [defaultFilterOption, setDefaultFilterOption] = useState(0);

    const handleCategoryChange = (newIndex: number, option: any) => {
                            
        const now = new Date();
        let dateRange: { startDate: Date | null, endDate: Date | null } = {
            startDate: null,
            endDate: null,
        };
        
        switch (option) {
            case 'All time':
            dateRange.startDate = new Date(0); // earliest possible date
            dateRange.endDate = now;
            break;
            case '12 months':
            dateRange.startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
            dateRange.endDate = now;
            break;
            case '30 days':
            dateRange.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
            dateRange.endDate = now;
            break;
            case '7 days':
            dateRange.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
            dateRange.endDate = now;
            break;
            case '24 hours':
            dateRange.startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() - 24);
            dateRange.endDate = now;
            break;
            default:
            return; // return null for unknown filter options
        }

        // setCategoryNavigation(dateRange);
        // setDefaultFilterOption(newIndex);
        console.log(option);
    }

    return (
        <div>
            {/* <Header setCategoryNavigation={setCategoryNavigation} defaultFilterOption={defaultFilterOption} setDefaultFilterOption={setDefaultFilterOption}/> */}
            <div className='flex lg:flex-row gap-2 flex-col mb-4 justify-between w-full'>
                {/* flex flex-col w-full justify-between lg:flex-col 2xl:items-center gap-8 mb-8 */}
                <CategoryNavigation
                    categories={filter_options}
                    defaultOption={defaultFilterOption}
                    handleCategoryChange={handleCategoryChange}
                />

                <div className='flex items-center gap-[16px]'>
                    {/* <DatePicker handleSelectDate={(date) => console.log(date)} /> */}
                    <Link href='/admin/products/new'>
                    <button className='rounded-[8px] h-fit w-fit text-[14px] text-[#090917] gap-[4px] flex items-center whitespace-nowrap bg-[#F2C94C] py-[10px] px-[14px] ' >
                        <FaPlus />
                        Add Product
                    </button>
                    </Link>
                </div>
            </div>
            <StatCards dashboardData={dashboardData}/>
            <SalesChart graph={graph}/>
            <Sales 
                products={topSellingProducts?.topProducts} 
                salesByLocation={topSellingProducts?.topOrdersLocation}
                // categoryNavigation={categoryNavigation}
            />
            <OrdersTable
                orders={orders?.sort((a: IOrder, b: IOrder) => Date.parse(b.createdAt) - Date.parse(a.createdAt)).slice(0, 10) ?? null}
                selectedOrders={[]}
                searchValue=''
                page="recent orders"
                categoryNavigation={categoryNavigation}
            />
        </div>
    )
}

// export default AdminPage;