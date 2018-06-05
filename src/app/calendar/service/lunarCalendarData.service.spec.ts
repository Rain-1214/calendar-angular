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

  it('should ...', inject([LunarCalendarDataService], (service: LunarCalendarDataService) => {
    expect(service).toBeTruthy();
    const [year, month, day] = [2018, 6, 5];
    const lunarData: LunarData = {
      month: 4,
      monthStr: '四月',
      day: 23,
      dayStr: '廿三',
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
    expect(service.getLunarMonthAndDay(year, month, day)).toBe(lunarData, 'getLunarMonthAndDay return value');
  }));
});
