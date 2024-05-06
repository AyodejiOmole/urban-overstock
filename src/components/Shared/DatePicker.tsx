'use client';

import { Calendar, CalendarProps } from 'primereact/calendar';
import React, { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';

export default function DatePicker({
  handleSelectDate,
}: {
  handleSelectDate: (
    date: Date | (Date | null)[] | Date[] | null | undefined
  ) => void;
}) {
  const [datetime24h, setDateTime24h] = useState<any>(null);

  const datePickerChangeHandler = (e: CalendarProps) => {
    setDateTime24h(e.value);
    handleSelectDate(e.value);
    e.hideOnDateTimeSelect
  };

  return (
    <Calendar
      id='calendar-24h'
      value={datetime24h}
      onChange={datePickerChangeHandler}
      // onChange={(e) => setDateTime24h(e.value)}
      showTime
      hourFormat='24'
      placeholder='Select Dates'
      className='p-0 text-neutral text-base bg-white rounded-md'
      icon={<FiCalendar />}
      showButtonBar
      showIcon
      iconPos='left'
      hideOnDateTimeSelect={true}
    />
  );
}
