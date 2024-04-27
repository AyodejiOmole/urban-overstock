import { TableProps } from '@/interfaces';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

export default function CustomTable(props: TableProps) {
  const {
    data,
    headers,
    stripedRows = true,
    selectable = false,
    dataKey = '_id',
    scrollHeight = '30rem',
    selectionMode = 'multiple',
    scrollable = true,
    loading = false,
    desktopOnly = false,
    children,
    ...rest
  } = props;

  const bodyTemplate = (data: any, options: ColumnBodyOptions) => {
    return <div>{data[options?.field]}</div>;
  };

  return (
    <div className='relative overflow-hidden pt-1'>
      {loading && (
        <div
          className={`mx-2 rounded-none w-full absolute left-0 top-0 bottom-0 right-0 h-full bg-white/10 backdrop-blur-[2px] z-10 flex items-center justify-center`}
        >
          <Loader />
        </div>
      )}

      <div className={`${desktopOnly ? 'hidden md:block' : ''}`}>
        <DataTable
          id='table-style'
          {...rest}
          stripedRows={stripedRows}
          scrollable={scrollable}
          columnResizeMode='fit'
          value={data}
          tableStyle={{ minWidth: '50rem' }}
          className='text-sm rounded-xl'
          dataKey='id'
          // paginator
        >
          {/* If selectable is enabled */}
          {selectable && (
            <Column
              selectionMode={selectionMode}
              headerStyle={{ width: '3rem' }}
            ></Column>
          )}

          {headers.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.title}
              body={col.body || bodyTemplate}
            />
          ))}
        </DataTable>
      </div>

      {desktopOnly && <div className='block md:hidden'>{children}</div>}
    </div>
  );
}
