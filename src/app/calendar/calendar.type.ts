
export interface LunarData {
  month: number;
  day: number;
  monthFirstDay: number;
  currentMonthDaysNum: number;
  prevMonthDaysNum: number;
  nextMonthDaysNum: number;
  isLeapMonth: boolean;
  prevMonth?: LunarData;
  nextMonth?: LunarData;
}
