import { Texts } from "../constants";

/**
 * Add days to a date
 */
export function addDaysToDate(dateInput: Date, increment: number): Date {
  const dateFormatTotime: Date = new Date(dateInput);
  const increasedDate: Date = new Date(
    dateFormatTotime.getTime() + increment * 24 * 1000 * 60 * 60
  );
  return increasedDate;
}

/**
 * Returns date (YYYY-MM-DD) for a date (with format YYYY-MM-DD HH:MM
 */
export function getDateFromDate(date: string): string {
  return (date as unknown as string).split(" ")[0];
}

/**
 * Returns the first day of current week
 */
export function getFirstDayOfWeek(date: Date): Date {
  const tmp: Date = new Date(date.valueOf());
  const firstday = new Date(tmp.setDate(tmp.getDate() - tmp.getDay() + 1));
  return firstday;
}

/**
 * Returns the last day of current week
 */
export function getLastDayOfWeek(date: Date): Date {
  const tmp: Date = new Date(date.valueOf());
  const lastday = new Date(tmp.setDate(tmp.getDate() - tmp.getDay() + 7));
  return lastday;
}

/**
 * Returns HH:00 for an hour, e.g. "9" => "09:00"
 */
export function getHourStartTime(hour: number): string {
  return ("0" + hour).slice(-2) + ":00";
}

export function getMondayForDate(date: Date): Date {
  var day = date.getDay() || 7;
  if (day !== 1) date.setHours(-24 * (day - 1));
  return date;
}

/**
 * Returns start of selected day YYYY-MM-DD 00:00
 */
export function getStartOfDay(date: Date): string {
  return date.toLocaleDateString("sv") + " 00:00";
  //return new Date(date.toLocaleDateString("sv") + " 00:00");
}

/**
 * Returns end of selected day YYYY-MM-DD 23:59
 */
export function getEndOfDay(date: Date): string {
  return date.toLocaleDateString("sv") + " 23:59";
  //return new Date(date.toLocaleDateString("sv") + " 23:59");
}

export function getDateInFormatYYYYMMDD(date: string): string {
  return new Date(date).toLocaleDateString("sv");
}

/**
 * Returns time for a date (with format YYYY-MM-DD HH:MM
 */
export function getTimeFromDate(date: string): string {
  return (date as unknown as string).split(" ")[1];
}

/**
 * Get day and month from a date in format 1/10
 */
export function getDayAndMonth(date: Date): string {
  return date.getDate() + "/" + (1 + date.getMonth());
}

/**
 * Returns an array with the weekdays (abbreviations)
 */
export function getWeekdayShort(date: Date): string {
  const days = [
    Texts.dayShortSun,
    Texts.dayShortMon,
    Texts.dayShortTue,
    Texts.dayShortWed,
    Texts.dayShortThu,
    Texts.dayShortFri,
    Texts.dayShortSat,
  ];

  return days[date.getDay()];
}

/**
 * Returns an array with the weekdays
 */
export function getWeekdayLong(date: Date): string {
  const days = [
    Texts.daySunday,
    Texts.dayMonday,
    Texts.dayTuesday,
    Texts.dayWednesday,
    Texts.dayThursday,
    Texts.dayFriday,
    Texts.daySaturday,
  ];

  return days[date.getDay()];
}

/**
 * Returns an array with the month names
 */
export function getMonthNames(): string[] {
  const months = [
    Texts.january,
    Texts.february,
    Texts.march,
    Texts.april,
    Texts.may,
    Texts.june,
    Texts.july,
    Texts.august,
    Texts.september,
    Texts.october,
    Texts.november,
    Texts.december,
  ];
  return months;
}

/**
 * Check whether a date is valid date or not
 *
 * @returns boolean
 */
export function isValidDate(date: Date | string): boolean {
  return !isNaN(Date.parse(String(date)));
}
