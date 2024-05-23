import { admin_sales_chart_options, months_labels } from '@/utils/chart';
import { faker } from '@faker-js/faker';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import AreaChart from '../Chart/AreaChart';
import { IGraphDetails } from '@/interfaces/graph';
import { Graph } from '@/interfaces/graph';

<<<<<<< HEAD
export const data = {
  labels: months_labels,
  datasets: [
    {
      fill: true,
      label: 'Sales',
      data: months_labels.map(() => {
        return faker.number.int({ min: 15, max: 500 });
      }),
      borderColor: 'rgba(228, 106, 17, 1)',
      backgroundColor: 'rgba(233, 136, 65, 0.1)',
      borderWidth: 2,
      interpolationMode: 'smooth',
      lineTension: 0.5,
    },
    {
      fill: true,
      label: 'Revenue',
      data: months_labels.map(() => {
        return faker.number.int({ min: 10, max: 1000 });
      }),
      borderColor: 'rgba(242, 201, 76, 1)',
      backgroundColor: 'rgba(125, 122, 237, 0.1)',
      borderWidth: 2,
      interpolationMode: 'smooth',
      lineTension: 0.5,
    },
  ],
};
=======
// export const data = {
//   labels: months_labels,
//   datasets: [
//     {
//       fill: true,
//       label: 'Sales',
//       data: months_labels.map(() => {
//         return faker.number.int({ min: 15, max: 500 });
//       }),
//       borderColor: 'rgba(228, 106, 17, 1)',
//       backgroundColor: 'rgba(233, 136, 65, 0.1)',
//       borderWidth: 2,
//       interpolationMode: 'smooth',
//       lineTension: 0.5,
//     },
//     {
//       fill: true,
//       label: 'Revenue',
//       data: months_labels.map(() => {
//         return faker.number.int({ min: 10, max: 1000 });
//       }),
//       borderColor: 'rgba(242, 201, 76, 1)',
//       backgroundColor: 'rgba(125, 122, 237, 0.1)',
//       borderWidth: 2,
//       interpolationMode: 'smooth',
//       lineTension: 0.5,
//     },
//   ],
// };
>>>>>>> master

export default function SalesChart({
  graph
}: {
  graph: IGraphDetails | null
}) {
  const data = {
    labels: graph?.graph.map((item: Graph) => item.month),
    datasets: [
      {
        fill: true,
        label: 'Sales',
        data: graph?.graph.map((item: Graph) => {
          return item.sales;
        }),
        borderColor: 'rgba(228, 106, 17, 1)',
        backgroundColor: 'rgba(233, 136, 65, 0.1)',
        borderWidth: 2,
        interpolationMode: 'smooth',
        lineTension: 0.5,
      },
      {
        fill: true,
        label: 'Revenue',
        data: graph?.graph.map((item: Graph) => {
          return item.revenue;
        }),
        borderColor: 'rgba(242, 201, 76, 1)',
        backgroundColor: 'rgba(125, 122, 237, 0.1)',
        borderWidth: 2,
        interpolationMode: 'smooth',
        lineTension: 0.5,
      },
    ],
  };
  return (
    <section className='grid grid-cols-1 xl:grid-cols-6 gap-4 my-8'>
      <div className='rounded-lg bg-white border border-neural p-6 xl:col-span-2'>
        <div className='mb-8'>
          <p className='text-neutral font-semibold text-xl'>Sales Progress</p>
          <p className='text-neutral text-sm'>This Quarter</p>
        </div>

        {/*  */}
        <div>
          <div className='multigraph mx-auto mt-16 relative mb-4 z-10'>
            <span className='tooltip'>70%</span>
            <span className='graph'></span>
            <div className='absolute left-[50%] top-[60%] -translate-x-[50%] flex items-center justify-center flex-col'>
<<<<<<< HEAD
              <p className='font-bold text-2xl mb-1 text-gray-800'>75.55%</p>
=======
              <p className='font-bold text-2xl mb-1 text-gray-800'>{graph?.revenueDifference.percentageDifference}</p>
>>>>>>> master
              {/* <span className='bg-green-100 text-green-600 p-1 px-4 text-[12px] rounded-full'>
                +10%
              </span> */}
            </div>
          </div>

          <p className='text-neutral text-center'>
            You succeeded in earning <span className='font-bold'>{graph?.revenueDifference.todayRevenue}</span>{' '}
            today, it`s {(graph?.revenueDifference.todayRevenue && graph.revenueDifference.yesterdayRevenue) && graph?.revenueDifference.todayRevenue > graph?.revenueDifference.yesterdayRevenue ? "higher" : "lower"} than yesterday.
          </p>

          <div className='mt-8 grid grid-cols-2 gap-2 max-w-sm mx-auto'>
            {/* 1 */}
          
            {/* 2 */}
            <div className='flex flex-col justify-center items-center'>
              <p className='text-[12px] text-neutral font-medium leading-[18px]'>Revenue</p>
              <div className='flex items-center'>
                <p className='text-[#101828] text-[24px] leading-[32px]  font-medium'>
<<<<<<< HEAD
                  $30K{' '}
=======
                  {/* $30K{' '} */}
                  {graph?.revenueDifference.todayRevenue}
>>>>>>> master
                </p>
                <GoArrowUp className='text-green-500 h-[20px] w-[20px] '/>
              </div>
            </div>
            {/* 3 */}
            <div className='flex flex-col justify-center items-center'>
              <p className='text-[12px] text-neutral font-medium leading-[18px]'>Today</p>
              <div className='flex items-center'>
                <p className='text-[#101828] text-[24px] leading-[32px]  font-medium'>
<<<<<<< HEAD
                  $2.5K{' '}
=======
                  {/* $2.5K{' '} */}
                  {graph?.revenueDifference.todayRevenue}
>>>>>>> master
                </p>
                <GoArrowUp className='text-green-500 h-[20px] w-[20px] '/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-lg bg-white border border-neural p-6 xl:col-span-4'>
        <div className='mb-8'>
          <p className='text-neutral font-semibold text-xl'>Statistics</p>
          <p className='text-neutral text-sm'>Revenue and Sales</p>
        </div>

        <div>
          <AreaChart data={data} options={admin_sales_chart_options} />
        </div>
      </div>
    </section>
  );
}
