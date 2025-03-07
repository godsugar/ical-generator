'use client';

import { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import DateRangePicker from '@/components/DateRangePicker';
import BusinessDaySelector from '@/components/BusinessDaySelector';
import TimeSelector from '@/components/TimeSelector';
import BusinessDayDisplay from '@/components/BusinessDayDisplay';
import DownloadButton from '@/components/DownloadButton';
import { getAllNthBusinessDays } from '@/utils/businessDays';
import { generateNthBusinessDayEvents, downloadICalFile } from '@/utils/icalGenerator';

// 日本語ロケールを設定
dayjs.locale(ja);

export default function Home() {
  // 状態管理
  const [startDate, setStartDate] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1); // 今月の1日
  });
  
  const [endDate, setEndDate] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear() + 1, now.getMonth(), 0); // 1年後の月末
  });
  
  const [businessDay, setBusinessDay] = useState<number>(7); // デフォルトは第7営業日
  
  const [startHour, setStartHour] = useState<number>(10); // デフォルトは10時
  const [startMinute, setStartMinute] = useState<number>(0);
  const [endHour, setEndHour] = useState<number>(11); // デフォルトは11時
  const [endMinute, setEndMinute] = useState<number>(0);
  
  // 計算された営業日
  const calculatedBusinessDays = useMemo(() => {
    return getAllNthBusinessDays(startDate, endDate, businessDay);
  }, [startDate, endDate, businessDay]);
  
  // iCalファイルのダウンロード処理
  const handleDownload = () => {
    if (calculatedBusinessDays.length === 0) return;
    
    const icalContent = generateNthBusinessDayEvents(
      calculatedBusinessDays,
      startHour,
      startMinute,
      endHour,
      endMinute,
      businessDay
    );
    
    const filename = `第${businessDay}営業日_${startHour}時${startMinute}分〜${endHour}時${endMinute}分.ics`;
    downloadICalFile(icalContent, filename);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">営業日カレンダー生成ツール</h1>
          <p className="mt-2 text-gray-600">
            指定した期間の第N営業日のスケジュールを含む.icalファイルを生成します。
          </p>
        </header>
        
        <main className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-900 mb-4">期間設定</h2>
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">営業日設定</h2>
                <BusinessDaySelector
                  businessDay={businessDay}
                  onBusinessDayChange={setBusinessDay}
                />
              </div>
              
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">時間設定</h2>
                <TimeSelector
                  startHour={startHour}
                  startMinute={startMinute}
                  endHour={endHour}
                  endMinute={endMinute}
                  onStartHourChange={setStartHour}
                  onStartMinuteChange={setStartMinute}
                  onEndHourChange={setEndHour}
                  onEndMinuteChange={setEndMinute}
                />
              </div>
            </div>
            
            <BusinessDayDisplay businessDays={calculatedBusinessDays} />
            
            <div className="mt-8 flex justify-center">
              <DownloadButton
                onClick={handleDownload}
                disabled={calculatedBusinessDays.length === 0}
              />
            </div>
          </div>
        </main>
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} 営業日カレンダー生成ツール</p>
        </footer>
      </div>
    </div>
  );
}
