
export interface LunarData {
  month: number;
  day: number;
  currentMonthDaysNum: number;
  prevMonthDaysNum: number;
  nextMonthDaysNum: number;
  isLeapMonth: boolean;
  isLeapYear: boolean;
  prevMonth?: LunarData;
  nextMonth?: LunarData;
}
