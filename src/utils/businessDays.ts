import dayjs from 'dayjs';
import { japaneseHolidays } from '../data/holidays';

/**
 * 指定された日付が祝日かどうかを判定する
 * @param date 判定する日付
 * @returns 祝日の場合はtrue、そうでない場合はfalse
 */
export const isHoliday = (date: Date): boolean => {
  const formattedDate = dayjs(date).format('YYYY-MM-DD');
  return japaneseHolidays.some(holiday => holiday.date === formattedDate);
};

/**
 * 指定された日付が週末（土曜日または日曜日）かどうかを判定する
 * @param date 判定する日付
 * @returns 週末の場合はtrue、そうでない場合はfalse
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0: 日曜日, 6: 土曜日
};

/**
 * 指定された日付が営業日かどうかを判定する
 * @param date 判定する日付
 * @returns 営業日の場合はtrue、そうでない場合はfalse
 */
export const isBusinessDay = (date: Date): boolean => {
  return !isWeekend(date) && !isHoliday(date);
};

/**
 * 指定された開始日から指定された営業日数後の日付を取得する
 * @param startDate 開始日
 * @param businessDays 営業日数
 * @returns 指定された営業日数後の日付
 */
export const getDateAfterBusinessDays = (startDate: Date, businessDays: number): Date => {
  let currentDate = new Date(startDate);
  let businessDaysCount = 0;

  while (businessDaysCount < businessDays) {
    currentDate.setDate(currentDate.getDate() + 1);
    if (isBusinessDay(currentDate)) {
      businessDaysCount++;
    }
  }

  return currentDate;
};

/**
 * 指定された期間内の全営業日を取得する
 * @param startDate 開始日
 * @param endDate 終了日
 * @returns 営業日の配列
 */
export const getAllBusinessDaysBetween = (startDate: Date, endDate: Date): Date[] => {
  const businessDays: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (isBusinessDay(currentDate)) {
      businessDays.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return businessDays;
};

/**
 * 指定された月の第N営業日を取得する
 * @param year 年
 * @param month 月（0-11）
 * @param n 第N営業日（1から始まる）
 * @returns 第N営業日の日付
 */
export const getNthBusinessDayOfMonth = (year: number, month: number, n: number): Date | null => {
  if (n <= 0) return null;

  const firstDayOfMonth = new Date(year, month, 1);
  let businessDayCount = 0;
  const currentDate = new Date(firstDayOfMonth);

  while (businessDayCount < n) {
    if (isBusinessDay(currentDate)) {
      businessDayCount++;
      if (businessDayCount === n) {
        return new Date(currentDate);
      }
    }
    currentDate.setDate(currentDate.getDate() + 1);
    
    // 月が変わったら終了（その月の営業日数がn未満の場合）
    if (currentDate.getMonth() !== month) {
      return null;
    }
  }

  return null;
};

/**
 * 指定された期間内の全ての第N営業日を取得する
 * @param startDate 開始日
 * @param endDate 終了日
 * @param n 第N営業日（1から始まる）
 * @returns 第N営業日の配列
 */
export const getAllNthBusinessDays = (startDate: Date, endDate: Date, n: number): Date[] => {
  const result: Date[] = [];
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();

  for (let year = startYear; year <= endYear; year++) {
    const monthStart = (year === startYear) ? startMonth : 0;
    const monthEnd = (year === endYear) ? endMonth : 11;

    for (let month = monthStart; month <= monthEnd; month++) {
      const nthBusinessDay = getNthBusinessDayOfMonth(year, month, n);
      if (nthBusinessDay && nthBusinessDay >= startDate && nthBusinessDay <= endDate) {
        result.push(nthBusinessDay);
      }
    }
  }

  return result;
};
