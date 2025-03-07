'use client';

import dayjs from 'dayjs';
import { useMemo } from 'react';

interface BusinessDayDisplayProps {
  businessDays: Date[];
  maxDisplay?: number;
}

export default function BusinessDayDisplay({
  businessDays,
  maxDisplay = 10
}: BusinessDayDisplayProps) {
  // 表示する営業日の数を制限
  const displayedBusinessDays = useMemo(() => {
    return businessDays.slice(0, maxDisplay);
  }, [businessDays, maxDisplay]);

  // 残りの営業日数
  const remainingCount = businessDays.length - displayedBusinessDays.length;

  // 日付をフォーマット
  const formatDate = (date: Date): string => {
    return dayjs(date).format('YYYY年MM月DD日(ddd)');
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">計算された営業日</h3>
      {businessDays.length === 0 ? (
        <p className="text-gray-500">該当する営業日はありません</p>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {displayedBusinessDays.map((date, index) => (
              <li key={index} className="px-4 py-2 bg-white">
                {formatDate(date)}
              </li>
            ))}
          </ul>
          {remainingCount > 0 && (
            <div className="px-4 py-2 bg-gray-50 text-gray-500 text-sm">
              他 {remainingCount} 日...
            </div>
          )}
          <div className="px-4 py-2 bg-gray-50 text-gray-700">
            合計: {businessDays.length} 日
          </div>
        </div>
      )}
    </div>
  );
}
