
export interface LunarData {
  month: number;
  monthStr: string;
  day: number;
  dayStr: string;
  currentMonthDaysNum: number;
  isLeapMonth: boolean;
  isLeapYear: boolean;
}

export interface ListData {
  label: string;
  value: string | number;
}


export interface DateTableData {
  day: number;
  lunarDay: number;
  lunarDayStr: string;
  isWeekend: boolean;
}
