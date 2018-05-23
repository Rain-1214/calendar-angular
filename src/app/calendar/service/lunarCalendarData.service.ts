// tslint:disable:no-bitwise
import { Injectable } from '@angular/core';
import { LunarData } from '../calendar.type';

@Injectable({
  providedIn: 'root'
})
export class LunarCalendarDataService {

  public static lunarMonthNumberToStrData = {
    1: '正月',
    2: '二月',
    3: '三月',
    4: '四月',
    5: '五月',
    6: '六月',
    7: '七月',
    8: '八月',
    9: '九月',
    10: '十月',
    11: '十一月',
    12: '腊月'
  };

  /**
   * 1、1899年-2051年 阴历每月天数和闰月信息;
   * 2、16进制数要将其转换成2进制 并在高位补0至17位，数据为了不使高位0丢失所以在最前一位补了无意义的1(一共18位)，删除后剩余17位如下;
   * 3、高四位若为0000标识当年没有闰月 否则为置闰月的月份数值 例: 0101 => 当年闰五月;
   * 4、低13位中 若当年有闰 则13位为每月天数 1 => 30天,0 => 29天, 例: 1 0111 0101 0000 => 1月30天 二月29天... [注1]
   *            若当年无闰 则13位中第一位为无意义0，剩余12位为每月天数 同上 👆
   *  注1： 若置闰，闰月数值月份有两个对应阴历月 如:
   *  0101 1011 1010 1000 0 : 0101 => 闰五月,1011 1010 1000 0 => 第一位->正月有30天 第二位->二月有29天....第五位->五月有30天 第六位->闰五月29天 第七位->六月30天...以此类推
   */
  private lunarCalendarData = [
                                0x3096d, 0x204ae, 0x20a57, 0x2aa4d, 0x20d26, 0x20d95, 0x28d55, 0x2056a, 0x209ad,
                                0x2495d, 0x204ae, 0x2d49b, 0x20a4d, 0x20d25, 0x2baa5, 0x20b54, 0x20d6a, 0x252da, 0x2095b,
                                0x2e937, 0x20497, 0x20a4b, 0x2b64b, 0x206a5, 0x206d4, 0x295b5, 0x202b6, 0x20957, 0x2492f,
                                0x20497, 0x2cc96, 0x20d4a, 0x20ea5, 0x2ada9, 0x205ad, 0x202b6, 0x2726e, 0x2092e, 0x2f92d,
                                0x20c95, 0x20d4a, 0x2db4a, 0x20b55, 0x2056a, 0x2955b, 0x2025d, 0x2092d, 0x2592b, 0x20a95,
                                0x2f695, 0x206ca, 0x20b55, 0x2aab5, 0x204da, 0x20a5b, 0x26a57, 0x2052b, 0x3152a, 0x20e95,
                                0x206aa, 0x2d5aa, 0x20ab5, 0x204b6, 0x294ae, 0x20a57, 0x20526, 0x27d26, 0x20d95, 0x2eb55,
                                0x2056a, 0x2096d, 0x2a95d, 0x204ad, 0x20a4d, 0x29a4d, 0x20d25, 0x31aa5, 0x20b54, 0x20b6a,
                                0x2d2da, 0x2095b, 0x2049b, 0x29497, 0x20a4b, 0x3564b, 0x206a5, 0x206d4, 0x2d5b4, 0x20ab6,
                                0x20957, 0x2a92f, 0x20497, 0x2064b, 0x26d4a, 0x20ea5, 0x30d65, 0x205ac, 0x20ab6, 0x2b26d,
                                0x2092e, 0x20c96, 0x29a95, 0x20d4a, 0x20da5, 0x24b55, 0x2056a, 0x2f55b, 0x2025d, 0x2092d,
                                0x2b92b, 0x20a95, 0x20b4a, 0x296aa, 0x20ad5, 0x32ab5, 0x204ba, 0x20a5b, 0x2ca57, 0x2052b,
                                0x20a93, 0x28e95, 0x206aa, 0x20ad5, 0x249b5, 0x204b6, 0x2d4ae, 0x20a4e, 0x20d26, 0x2bd26,
                                0x20d53, 0x205aa, 0x26d6a, 0x2096d, 0x3695d, 0x204ad, 0x20a4d, 0x2da4b, 0x20d25, 0x20d52,
                                0x2bb54, 0x20b5a, 0x2056d, 0x2495b, 0x2049b, 0x2f497, 0x20a4b, 0x20aa5, 0x2b6a5, 0x206d2,
                                0x20ada, 0x26ab6
                              ];

  /**
   * 1899年2月10号 是正月初一
   */
  private fromLunarDateSecondes = new Date(1900, 1, 31).getTime();
  private firstDateYear = 1900;
  private dataCache = {};

  constructor() {}

  getLunarMonthAndDay (year: number, month: number, day: number): LunarData {
    const isLeapYear = this.getIsLeapYear(year);
    const currentDate = new Date(year, month, day);
    let betweenDays = (currentDate.getTime() - this.fromLunarDateSecondes) / 1000 / 60 / 60 / 24 + 1;
    let isLeapMonth = false;
    let lunarMonth = 0, lunarYear = this.firstDateYear;
    while (betweenDays >= 0) {
      const tempYearDays = this.getLunarYearDayNum(lunarYear);
      console.log(betweenDays, tempYearDays);
      if (betweenDays > tempYearDays) {
        betweenDays -= tempYearDays;
        lunarYear++;
      } else if (betweenDays > 30) {
        const currentYearIsLeapYear = this.getIsLeapYear(lunarYear);
        for (let i = currentYearIsLeapYear ? 12 : 11; i >= 0; i--) {
          const monthDayNum = ((this.lunarCalendarData[lunarYear - this.firstDateYear] & (1 << i)) >> i) === 1 ? 30 : 29;
          if (betweenDays <= monthDayNum) {
            break;
          }
          lunarMonth = (currentYearIsLeapYear ? 13 : 12) - i + 1;
          betweenDays -= monthDayNum;
        }
      } else {
        if (isLeapYear) {
          const currentLeapMonthNum = this.getLeapMonthNum(lunarYear);
          if (lunarMonth > currentLeapMonthNum + 1) {
            lunarMonth--;
          } else if (lunarMonth === lunarMonth + 1) {
            isLeapMonth = true;
            lunarMonth--;
          }
        }
        console.log(betweenDays, lunarMonth);
        break;
      }
    }
    return {
      month: 1,
      day: 1,
      currentMonthDaysNum: 1,
      prevMonthDaysNum: 1,
      nextMonthDaysNum: 1,
      isLeapMonth,
      isLeapYear,
    };
  }

  /**
   * 获取一个阴历年当中是否有闰月
   * @param year 要获取的年份
   */
  getIsLeapYear (year: number): boolean {
    const currentYearData = this.lunarCalendarData[year - this.firstDateYear];
    return ((currentYearData & 0x1e000) >> 13) > 0;
  }

  /**
   * 获取一个阴历年份的全年天数
   * @param year 要获取的年份
   */
  getLunarYearDayNum (year: number): number {
    const currentYearData = this.lunarCalendarData[year - this.firstDateYear];
    const isLeapYear = this.getIsLeapYear(year);
    let monthNum = isLeapYear ? 13 : 12;
    let JanBit =  isLeapYear ? 0x1000 : 0x800, yearDayNum = 0;
    for (; monthNum > 0; monthNum--, JanBit >>= 1) {
      yearDayNum += (currentYearData & JanBit) === 0 ? 29 : 30;
    }
    return yearDayNum;
  }

  /**
   * 获取一个阴历闰年中闰月的月份值
   * @param year 要获取的年份
   */
  getLeapMonthNum (year: number): number {
    if (this.getIsLeapYear(year)) {
      return (this.lunarCalendarData[year - this.firstDateYear] & 0x1e000) >> 13;
    } else {
      return -1;
    }
  }

  /**
   * 获取一个阴历月份的天数，如果要获取闰月需要指定 isLeapMonth
   * @param year 获取的年份
   * @param month 获取约人
   * @param isLeapMonth 要获取的月份是否是闰月
   */
  getLunarMonthDays (year: number, month: number, isLeapMonth?: boolean): number {
    const currentYearData = this.lunarCalendarData[year - this.firstDateYear];
    let tempMonth = month;
    if (isLeapMonth) {
      const isLeapYear = this.getIsLeapYear(year);
      if (isLeapYear) {
        const leapMonthNum = this.getLeapMonthNum(year);
        tempMonth = month >= leapMonthNum ? tempMonth + 1 : tempMonth;
      }
    }

  }
}
