'use client';

interface TimeSelectorProps {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  onStartHourChange: (hour: number) => void;
  onStartMinuteChange: (minute: number) => void;
  onEndHourChange: (hour: number) => void;
  onEndMinuteChange: (minute: number) => void;
}

export default function TimeSelector({
  startHour,
  startMinute,
  endHour,
  endMinute,
  onStartHourChange,
  onStartMinuteChange,
  onEndHourChange,
  onEndMinuteChange
}: TimeSelectorProps) {
  // 時間の選択肢（0-23）
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  // 分の選択肢（0, 15, 30, 45）
  const minutes = [0, 15, 30, 45];

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">時間</label>
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={startHour}
              onChange={(e) => onStartHourChange(parseInt(e.target.value, 10))}
            >
              {hours.map((hour) => (
                <option key={`start-hour-${hour}`} value={hour}>
                  {hour.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
            <span>:</span>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={startMinute}
              onChange={(e) => onStartMinuteChange(parseInt(e.target.value, 10))}
            >
              {minutes.map((minute) => (
                <option key={`start-minute-${minute}`} value={minute}>
                  {minute.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
            <span className="mx-2">〜</span>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={endHour}
              onChange={(e) => onEndHourChange(parseInt(e.target.value, 10))}
            >
              {hours.map((hour) => (
                <option key={`end-hour-${hour}`} value={hour}>
                  {hour.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
            <span>:</span>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={endMinute}
              onChange={(e) => onEndMinuteChange(parseInt(e.target.value, 10))}
            >
              {minutes.map((minute) => (
                <option key={`end-minute-${minute}`} value={minute}>
                  {minute.toString().padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
