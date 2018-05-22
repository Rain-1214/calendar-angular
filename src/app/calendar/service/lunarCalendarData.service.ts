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
   * 2、16进制数要将其转换成2进制 并在高位补0至20位，数据为了不使高位0丢失所以在最前一位补了无意义的1，删除后剩余20位如下;
   * 3、高四位若为0000标识当年没有闰月 否则为置闰月的月份数值 例: 0101 => 当年闰五月;
   * 4、低16位中 若当年有闰 则钱三位无效 后13位为每月天数 1 => 30天,0 => 29天, 例: 0001 0111 0101 0000 => 去掉高三位后1月30天 二月 29天 [注1]
   *            若当年无闰 则前四位无效 后12位为每月天数 同上 👆
   *  注1： 若置闰，闰月数值月份有两个对应阴历月 如:
   *  0101 0001 0111 0101 0000: 0101 => 闰五月,0001 0111 0101 0000 => 去除高三位后 第一位正月30天 第二位二月29天....第五位为五月30天 第六位为闰五月29天 第七位为六月30天...以此类推
   */
  private lunarCalendarData = [
                                0x10ab4, 0x3096f, 0x104ae, 0x10a57, 0x2aa4d, 0x10d26, 0x10d95, 0x28d55, 0x1056a, 0x109ad, 0x2495d,
                                0x104ae, 0x2d49b, 0x10a4d, 0x10d25, 0x2baa5, 0x10b54, 0x10d6a, 0x252da, 0x1095b, 0x2e957, 0x10497,
                                0x10a4b, 0x2b64b, 0x106a5, 0x106d4, 0x295b5, 0x102b6, 0x10957, 0x2492f, 0x10497, 0x2cc96, 0x10d4a,
                                0x10ea5, 0x2ada9, 0x105ad, 0x102b6, 0x2726e, 0x1092e, 0x2f94d, 0x10c95, 0x10d4a, 0x2db4a, 0x10b55,
                                0x1056a, 0x2955b, 0x1025d, 0x1092d, 0x2592b, 0x10a95, 0x2f695, 0x106ca, 0x10b55, 0x2aab5, 0x104da,
                                0x10a5b, 0x26a57, 0x1052b, 0x3152a, 0x10e95, 0x106aa, 0x2d5aa, 0x10ab5, 0x104b6, 0x294ae, 0x10a57,
                                0x10526, 0x27d26, 0x10d95, 0x2eb35, 0x1056a, 0x1096d, 0x2a95d, 0x104ad, 0x10a4d, 0x29a4d, 0x10d25,
                                0x31aa5, 0x10b54, 0x10b6a, 0x2d2da, 0x1095b, 0x1049b, 0x29497, 0x10a4b, 0x3564b, 0x106a5, 0x106d4,
                                0x2d5b4, 0x10ab6, 0x10957, 0x2a92f, 0x10497, 0x1064b, 0x26d4a, 0x10ea5, 0x30d65, 0x105ac, 0x10ab6,
                                0x2b26d, 0x1092e, 0x10c96, 0x29a95, 0x10d4a, 0x10da5, 0x24b55, 0x1056a, 0x2f53b, 0x1025d, 0x1092d,
                                0x2b92b, 0x10a95, 0x10b4a, 0x296aa, 0x10ad5, 0x32ab5, 0x104ba, 0x10a5b, 0x2ca57, 0x1052b, 0x10a93,
                                0x28e95, 0x106aa, 0x10ad5, 0x249b5, 0x104b6, 0x2d4ae, 0x10a4e, 0x10d26, 0x2bd26, 0x10d53, 0x105aa,
                                0x26d6a, 0x1096d, 0x3695d, 0x104ad, 0x10a4d, 0x2da4b, 0x10d25, 0x10d52, 0x2bb54, 0x10b5a, 0x1056d,
                                0x2495b, 0x1049b, 0x2f497, 0x10a4b, 0x10aa5, 0x2b6a5, 0x106d2, 0x10ada
                              ];

  private lunarDateAt18991201 = 1029;
  private fromLunarDateSecondes = new Date(1899, 12, 1).getTime();
  private firstDateYear = 1899;
  private dataCache = {};

  constructor() {}

  getLunarMonthAndDay (year: number, month: number, day: number): LunarData {
    const currentYearData = this.lunarCalendarData[year - this.firstDateYear];
    const additionalYearData = month === 1 ? this.lunarCalendarData[year - this.firstDateYear - 1] :
                               month === 12 ? this.lunarCalendarData[year - this.firstDateYear + 1] : null;
    const isLeapMonth = this.getIsLeapYear(year);
    const currentDate = new Date(year, month, day);
    const betweenDays = (currentDate.getTime() - this.fromLunarDateSecondes) / 1000 / 60 / 60 / 24;
    console.log(isLeapMonth);
    return {
      month: 1,
      monthFirstDay: 1,
      day: 1,
      currentMonthDaysNum: 1,
      prevMonthDaysNum: 1,
      nextMonthDaysNum: 1,
      isLeapMonth: true
    };
  }

  getIsLeapYear (year: number): boolean {
    const currentYearData = this.lunarCalendarData[year - this.firstDateYear];
    return (currentYearData & 0xf0000) >> 16 > 0;
  }


}
