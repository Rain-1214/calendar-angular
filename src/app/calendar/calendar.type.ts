
export interface LunarData {
  month: number;
  monthStr: string;
  day: number;
  dayStr: string;
  currentMonthDaysNum: number;
  prevMonthDaysNum: number;
  nextMonthDaysNum: number;
  isLeapMonth: boolean;
  isLeapYear: boolean;
}

export interface ListData {
  label: string;
  value: string | number;
}
