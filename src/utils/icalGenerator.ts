import ical, { ICalCalendar, ICalEventData } from 'ical-generator';
import dayjs from 'dayjs';

/**
 * 指定された日付と時間に基づいてiCalendarイベントを作成する
 * @param date イベントの日付
 * @param startHour 開始時間（時）
 * @param startMinute 開始時間（分）
 * @param endHour 終了時間（時）
 * @param endMinute 終了時間（分）
 * @param summary イベントのタイトル
 * @param description イベントの説明
 * @returns iCalendarイベントデータ
 */
export const createEvent = (
  date: Date,
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number,
  summary: string,
  description: string = ''
): ICalEventData => {
  const startDate = new Date(date);
  startDate.setHours(startHour, startMinute, 0, 0);
  
  const endDate = new Date(date);
  endDate.setHours(endHour, endMinute, 0, 0);
  
  return {
    start: startDate,
    end: endDate,
    summary,
    description,
  };
};

/**
 * 複数の日付に対して同じ時間帯のイベントを作成する
 * @param dates イベントの日付の配列
 * @param startHour 開始時間（時）
 * @param startMinute 開始時間（分）
 * @param endHour 終了時間（時）
 * @param endMinute 終了時間（分）
 * @param summary イベントのタイトル
 * @param description イベントの説明
 * @returns iCalendarイベントデータの配列
 */
export const createEventsForDates = (
  dates: Date[],
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number,
  summary: string,
  description: string = ''
): ICalEventData[] => {
  return dates.map(date => 
    createEvent(date, startHour, startMinute, endHour, endMinute, summary, description)
  );
};

/**
 * iCalendarカレンダーを作成する
 * @param events イベントデータの配列
 * @param calendarName カレンダーの名前
 * @returns iCalendarカレンダー
 */
export const createCalendar = (
  events: ICalEventData[],
  calendarName: string = '営業日カレンダー'
): ICalCalendar => {
  const calendar = ical({ name: calendarName });
  
  events.forEach(event => {
    calendar.createEvent(event);
  });
  
  return calendar;
};

/**
 * iCalendarファイルの内容を生成する
 * @param events イベントデータの配列
 * @param calendarName カレンダーの名前
 * @returns iCalendarファイルの内容（文字列）
 */
export const generateICalContent = (
  events: ICalEventData[],
  calendarName: string = '営業日カレンダー'
): string => {
  const calendar = createCalendar(events, calendarName);
  return calendar.toString();
};

/**
 * 第N営業日のイベントを生成する
 * @param dates 第N営業日の日付の配列
 * @param startHour 開始時間（時）
 * @param startMinute 開始時間（分）
 * @param endHour 終了時間（時）
 * @param endMinute 終了時間（分）
 * @param n 第N営業日
 * @returns iCalendarファイルの内容（文字列）
 */
export const generateNthBusinessDayEvents = (
  dates: Date[],
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number,
  n: number
): string => {
  const summary = `第${n}営業日 ${startHour}:${startMinute.toString().padStart(2, '0')}〜${endHour}:${endMinute.toString().padStart(2, '0')}`;
  const description = `毎月第${n}営業日のスケジュール`;
  
  const events = createEventsForDates(
    dates,
    startHour,
    startMinute,
    endHour,
    endMinute,
    summary,
    description
  );
  
  return generateICalContent(events, `第${n}営業日カレンダー`);
};

/**
 * iCalendarファイルをダウンロードする
 * @param content iCalendarファイルの内容（文字列）
 * @param filename ダウンロードするファイル名
 */
export const downloadICalFile = (content: string, filename: string = 'calendar.ics'): void => {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // クリーンアップ
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};
