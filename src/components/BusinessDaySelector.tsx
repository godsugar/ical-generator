'use client';

interface BusinessDaySelectorProps {
  businessDay: number;
  onBusinessDayChange: (day: number) => void;
  maxBusinessDay?: number;
}

export default function BusinessDaySelector({
  businessDay,
  onBusinessDayChange,
  maxBusinessDay = 30
}: BusinessDaySelectorProps) {
  // 1からmaxBusinessDayまでの配列を生成
  const businessDays = Array.from({ length: maxBusinessDay }, (_, i) => i + 1);

  return (
    <div className="flex flex-col">
      <label htmlFor="business-day" className="mb-1 text-sm font-medium text-gray-700">
        営業日
      </label>
      <select
        id="business-day"
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        value={businessDay}
        onChange={(e) => onBusinessDayChange(parseInt(e.target.value, 10))}
      >
        {businessDays.map((day) => (
          <option key={day} value={day}>
            第{day}営業日
          </option>
        ))}
      </select>
    </div>
  );
}
