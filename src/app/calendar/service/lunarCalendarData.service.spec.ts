/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { LunarCalendarDataService } from './lunarCalendarData.service';
import { LunarData } from '../calendar.type';

describe('Service: LunarCalendarData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LunarCalendarDataService]
    });
  });

  it('should service can be created', inject([LunarCalendarDataService], (service: LunarCalendarDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should get lunar data from "getLunarMonthAndDay"', inject([LunarCalendarDataService], (service: LunarCalendarDataService) => {
    const [year, month, day] = [2018, 6, 5];
    const lunarData: LunarData = {
      month: 4,
      monthStr: '四月',
      day: 22,
      dayStr: '廿二',
      currentMonthDaysNum: 30,
      isLeapMonth: false,
      isLeapYear: false,
      chineseEra: {
        heavenlyStems: 4,
        earthlyBranches: 10,
        era: '戊戌',
        chineseZodiacAnimal: '狗'
      }
    };
    expect(service.getLunarMonthAndDay(year, month, day)).toEqual(lunarData, 'test 2018-6-5 return value failed');
    const [ year1, month1, day1 ] = [ 1900, 1, 1 ];
    const lunarData1: LunarData = {
      month: 12,
      monthStr: '腊月',
      day: 1,
      dayStr: '初一',
      currentMonthDaysNum: 30,
      isLeapMonth: false,
      isLeapYear: false,
      chineseEra: {
        heavenlyStems: 5,
        earthlyBranches: 11,
        era: '己亥',
        chineseZodiacAnimal: '猪'
      }
    };
    expect(service.getLunarMonthAndDay(year1, month1, day1)).toEqual(lunarData1, 'test 1900-1-1 return value failed');
    const [ year2, month2, day2 ] = [ 2050, 12, 31 ];
    const lunarData2: LunarData = {
      month: 11,
      monthStr: '十一月',
      day: 18,
      dayStr: '十八',
      currentMonthDaysNum: 30,
      isLeapMonth: false,
      isLeapYear: true,
      chineseEra: {
        heavenlyStems: 6,
        earthlyBranches: 6,
        era: '庚午',
        chineseZodiacAnimal: '马'
      }
    };
    expect(service.getLunarMonthAndDay(year2, month2, day2)).toEqual(lunarData2, 'test 2050-12-31 return value failed');
  }));

  it('should throw error when param is out of safety scope', inject([LunarCalendarDataService], (service: LunarCalendarDataService) => {
    expect(() => service.getLunarMonthAndDay(1899, 11, 31)).toThrow();
    expect(() => service.getLunarMonthAndDay(1899, 12, 1)).not.toThrow();
    expect(() => service.getLunarMonthAndDay(2051, 2, 1)).toThrow();
    expect(() => service.getLunarMonthAndDay(2051, 1, 31)).not.toThrow();
  }));

  it('should return boolean from method "getIsLeapYear"', inject([LunarCalendarDataService], (service: LunarCalendarDataService) => {
    expect(service.getIsLeapYear(1900)).toBe(true);
    expect(service.getIsLeapYear(1901)).toBe(false);
    expect(() => service.getIsLeapYear(1890)).toThrow();
    expect(() => service.getIsLeapYear(2052)).toThrow();
  }));

  it('should return day number from "getLunarYearDayNum"', inject([LunarCalendarDataService], (service: LunarCalendarDataService) => {
    expect(service.getLunarYearDayNum(1900)).toBe(384);
    expect(() => service.getLunarYearDayNum(1898)).toThrow();
    expect(() => service.getLunarYearDayNum(2052)).toThrow();
  }));

  it('shuold return leap month number from "getLeapMonthNum"', inject([LunarCalendarDataService], (service: LunarCalendarDataService) => {
    expect(service.getLeapMonthNum(1900)).toBe(8);
    expect(service.getLeapMonthNum(2017)).toBe(6);
    expect(() => service.getLeapMonthNum(1898)).toThrow();
    expect(() => service.getLeapMonthNum(2052)).toThrow();
  }));
});
