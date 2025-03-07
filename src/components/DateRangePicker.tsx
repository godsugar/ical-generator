'use client';

import { useState } from 'react';
import dayjs from 'dayjs';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}: DateRangePickerProps) {
  // 日付をYYYY-MM-DD形式に変換
  const formatDate = (date: Date): string => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  // 文字列からDateオブジェクトに変換
  const parseDate = (dateStr: string): Date => {
    return dayjs(dateStr).toDate();
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
      <div className="flex flex-col">
        <label htmlFor="start-date" className="mb-1 text-sm font-medium text-gray-700">
          開始日
        </label>
        <input
          id="start-date"
          type="date"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formatDate(startDate)}
          onChange={(e) => onStartDateChange(parseDate(e.target.value))}
        />
      </div>
      
      <div className="flex flex-col">
        <label htmlFor="end-date" className="mb-1 text-sm font-medium text-gray-700">
          終了日
        </label>
        <input
          id="end-date"
          type="date"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formatDate(endDate)}
          onChange={(e) => onEndDateChange(parseDate(e.target.value))}
          min={formatDate(startDate)}
        />
      </div>
    </div>
  );
}
