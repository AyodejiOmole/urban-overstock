export default function Loading() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-6'>
      <div className='lg:col-span-4'>
        <div className='border border-gray-200 bg-white rounded-lg min-h-60 skeleton-loader p-16' />
        <div className='border border-gray-200 bg-white rounded-lg my-4 min-h-40 skeleton-loader p-16' />
        <div className='border border-gray-200 bg-white rounded-lg my-4 min-h-32 skeleton-loader p-24' />
        <div className='border border-gray-200 bg-white rounded-lg my-4 min-h-40 p-16 skeleton-loader' />
      </div>
      <div className='lg:col-span-2 skeleton-loader p-16' />
    </div>
  );
}
