
export interface LunarData {
  month: number;
  monthStr: string;
  day: number;
  dayStr: string;
  currentMonthDaysNum: number;
  isLeapMonth: boolean;
  isLeapYear: boolean;
  chineseEra: ChineseEra;
}

export interface ListData {
  label: string;
  value: string | number;
}


export interface DateTableData {
  year: number;
  month: number;
  day: number;
  lunarDay: number;
  lunarDayStr: string;
  isWeekend: boolean;
  isNotInCurrentMonth: boolean;
  hasSchedule: boolean;
}

export interface SelectDate {
  year: number;
  month: number;
  day: number;
}

export interface ChineseEra {
  heavenlyStems: number;
  earthlyBranches: number;
  era: string;
  chineseZodiacAnimal: string;
}

export interface Schedule {
  startTime: string;
  endTime: string;
  description: string;
  iconColor: string;
}

export interface ScheduleList {
  year: number;
  month: number;
  day: number;
  schedules: Schedule[];
}
