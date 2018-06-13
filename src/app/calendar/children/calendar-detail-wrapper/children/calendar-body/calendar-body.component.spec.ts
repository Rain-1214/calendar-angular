/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CalendarBodyComponent } from './calendar-body.component';
import { LunarCalendarDataService } from '../../../../service/lunarCalendarData.service';
import { LunarData } from '../../../../calendar.type';

describe('CalendarBodyComponent', () => {
  let component: CalendarBodyComponent;
  let fixture: ComponentFixture<CalendarBodyComponent>;
  let debugElement: DebugElement;
  const lunarDayNumberToStrData = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十',
    20: '廿',
    30: '三十',
  };
  const LunarCalendarDataServiceStub = {
    translateDayNumToCalendarStr (day: number): string {
      if (day <= 0 || day > 30) {
        throw new Error('LunarCalendarData: translateDayNumToCalendarStr: 参数day必须是大于0小于31,当前day: ' + day);
      }
      switch (true) {
        case (day <= 10):
          return '初' + lunarDayNumberToStrData[day];
        case (day < 20):
          return `${lunarDayNumberToStrData[10]}${lunarDayNumberToStrData[day % 10]}`;
        case (day === 20):
          return `${lunarDayNumberToStrData[2]}${lunarDayNumberToStrData[10]}`;
        case (day < 30):
          return `${lunarDayNumberToStrData[20]}${lunarDayNumberToStrData[day % 10]}`;
        case (day === 30):
          return lunarDayNumberToStrData[30];
      }
    },
    getLunarMonthAndDay (year: number, month: number, day: number): LunarData {
      switch (true) {
        case (year === 2014 && month === 7 && day === 1):
          return {
            month: 6,
            monthStr: '六月',
            day: 5,
            dayStr: '初五',
            currentMonthDaysNum: 30,
            isLeapMonth: false,
            isLeapYear: false,
            chineseEra: {
              heavenlyStems: 0,
              earthlyBranches: 6,
              era: '甲午',
              chineseZodiacAnimal: '马年'
            }
          };
        case (year === 2014 && month === 7 && day === 30):
          return {
            month: 6,
            monthStr: '六月',
            day: 4,
            dayStr: '初四',
            currentMonthDaysNum: 30,
            isLeapMonth: false,
            isLeapYear: false,
            chineseEra: {
              heavenlyStems: 0,
              earthlyBranches: 6,
              era: '甲午',
              chineseZodiacAnimal: '马年'
            }
          };
        case (year === 2014 && month === 7 && day === 27):
          return {
            month: 7,
            monthStr: '七月',
            day: 1,
            dayStr: '初一',
            currentMonthDaysNum: 29,
            isLeapMonth: false,
            isLeapYear: false,
            chineseEra: {
              heavenlyStems: 0,
              earthlyBranches: 6,
              era: '甲午',
              chineseZodiacAnimal: '马年'
            }
          };
        case (year === 2014 && month === 8 && day === 1):
          return {
            month: 7,
            monthStr: '七月',
            day: 6,
            dayStr: '初六',
            currentMonthDaysNum: 29,
            isLeapMonth: false,
            isLeapYear: false,
            chineseEra: {
              heavenlyStems: 0,
              earthlyBranches: 6,
              era: '甲午',
              chineseZodiacAnimal: '马年'
            }
          };
        default:
          return {
            month: 7,
            monthStr: '七月',
            day: 6,
            dayStr: '初六',
            currentMonthDaysNum: 29,
            isLeapMonth: false,
            isLeapYear: false,
            chineseEra: {
              heavenlyStems: 0,
              earthlyBranches: 6,
              era: '甲午',
              chineseZodiacAnimal: '马年'
            }
          };
      }
    },
    getScopeOfLunarYear () {
      return {
        startYear: 1900,
        endYear: 2050
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarBodyComponent ],
      providers: [
        {
          provide: LunarCalendarDataService,
          useValue: LunarCalendarDataServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBodyComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have div with class "body-wrapper",then have "table" and "th" inside', () => {
    const bodyWrapperDiv = debugElement.query(By.css('.body-wrapper'));
    expect(bodyWrapperDiv).toBeTruthy();
    const table = bodyWrapperDiv.query(By.css('table'));
    expect(table).toBeTruthy();
    const titleTr = table.query(By.css('tr:nth-child(1)'));
    expect(titleTr).toBeTruthy();
    expect(titleTr.children.length).toBe(7);
    const chineseWeekNum = ['一', '二', '三', '四', '五', '六', '日'];
    for (let i = 0; i < titleTr.children.length; i++) {
      const th = titleTr.children[i];
      expect(th).toBeTruthy();
      expect((th.nativeElement as HTMLElement).innerText.trim()).toBe(chineseWeekNum[i]);
      if (i >= 6) {
        expect((th.nativeElement as HTMLElement).classList.contains('text-red')).toBe(true);
      }
    }
  });

  it('should create calendar table according to the property of "year","month","day"', () => {
    component.year = 2014;
    component.month = 7;
    component.day = 15;
    component.ngOnInit();
    fixture.detectChanges();
    const lunarService = TestBed.get(LunarCalendarDataService);
    const tr = debugElement.queryAll(By.css('tr'));
    expect(tr.length).toBe(6);
    // const firstTr = tr[1];
    // expect(firstTr.children.length).toBe(7);
    // const firstTd = firstTr.children[0];
    // const fisrtTdDiv = firstTd.query(By.css('div'));
    // expect((fisrtTdDiv.nativeElement as HTMLElement).classList.contains('isNotInCurrentMonth')).toBe(true);
    // const firstTdNumberSpan = fisrtTdDiv.query(By.css('.number'));
    // expect((firstTdNumberSpan.nativeElement as HTMLElement).innerText.trim()).toBe('30');
    // const firstTdLunarTextSpan = fisrtTdDiv.query(By.css('.lunar-text'));
    // expect((firstTdLunarTextSpan.nativeElement as HTMLElement).innerText.trim()).toBe('初四');
    // const scheduleIcon = fisrtTdDiv.query(By.css('.schedule-icon'));
    // expect(scheduleIcon).toBeNull();
    let currentDay = 30;
    let currentLunarDay = 4;
    for (let i = 1; i < 6; i++) {
      const currentTr = tr[i];
      expect(currentTr.children.length).toBe(7);
      for (let y = 0; y < 7; y++) {
        const currentTd = currentTr.children[y];
        const currentDiv = currentTd.query(By.css('div'));
        const currentNumberSpan = currentDiv.query(By.css('.number'));
        expect((currentNumberSpan.nativeElement as HTMLElement).innerText.trim()).toBe(`${currentDay}`);
        const currentDivLunarTextSpan = currentDiv.query(By.css('.lunar-text'));
        if ((currentDivLunarTextSpan.nativeElement as HTMLElement).innerText.trim() === '初六') {
          console.log(currentDivLunarTextSpan.nativeElement);
          console.log(i, y);
        }
        expect((currentDivLunarTextSpan.nativeElement as HTMLElement).innerText.trim()).toBe(
          `${lunarService.translateDayNumToCalendarStr(currentLunarDay)}`
        );
        const scheduleIcon = currentDiv.query(By.css('.schedule-icon'));
        expect(scheduleIcon).toBeNull();
        currentDay++;
        currentLunarDay++;
        if (currentLunarDay > 30) {
          currentLunarDay = 1;
        }
        if (currentDay > 31) {
          currentDay = 1;
        }
        if (i === 1 && y === 0) {
          expect((currentDiv.nativeElement as HTMLElement).classList.contains('isNotInCurrentMonth')).toBe(true);
          currentDay = 1;
        } else if (i === 5 && y > 3) {
          expect((currentDiv.nativeElement as HTMLElement).classList.contains('isNotInCurrentMonth')).toBe(true);
        }
      }
    }
  });
});
