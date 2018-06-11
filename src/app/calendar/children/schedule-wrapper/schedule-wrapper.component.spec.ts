/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ScheduleWrapperComponent } from './schedule-wrapper.component';
import { LunarCalendarDataService } from '../../service/lunarCalendarData.service';
import { Subject } from 'rxjs';
import { SelectDate, Schedule, ScheduleList } from '../../calendar.type';
import { MissionService } from '../../service/mission.service';

describe('ScheduleWrapperComponent', () => {
  let component: ScheduleWrapperComponent;
  let fixture: ComponentFixture<ScheduleWrapperComponent>;
  let debugElement: DebugElement;
  const missionAnnounced$ = new Subject<SelectDate>();
  const MissionServiceStub = {
    missionAnnounced$,
  };
  const LunarCalendarDataServiceStub = {
    getLunarMonthAndDay(year, month, day) {
      if (year === 2017 && month === 8 && day === 8) {
        return {
          month: 6,
          monthStr: '六月',
          day: 17,
          dayStr: '十七',
          currentMonthDaysNum: 30,
          isLeapMonth: true,
          isLeapYear: true,
          chineseEra: {
            heavenlyStems: 3,
            earthlyBranches: 9,
            era: '丁酉',
            chineseZodiacAnimal: '鸡'
          }
        };
      }
      return {
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
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleWrapperComponent ],
      providers: [
        {
          provide: MissionService,
          useValue: MissionServiceStub
        },
        {
          provide: LunarCalendarDataService,
          useValue: LunarCalendarDataServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has "div" with class "schedule-wrapper"', () => {
    const scheduleWrapperDiv = debugElement.query(By.css('.schedule-wrapper'));
    expect(scheduleWrapperDiv).toBeTruthy();
  });

  it('should has ".header" and ".list" in schedule wrapper div', () => {
    const scheduleWrapperDiv = debugElement.query(By.css('.schedule-wrapper'));
    const headerDiv = scheduleWrapperDiv.query(By.css('.header'));
    const listDiv = scheduleWrapperDiv.query(By.css('.list'));
    expect(headerDiv).toBeTruthy();
    expect(listDiv).toBeTruthy();
  });

  it('"currentDate" should equla today when parent do not pass this property', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const today = new Date();
    expect(component.currentDay.year).toBe(today.getFullYear());
    expect(component.currentDay.month).toBe(today.getMonth() + 1);
    expect(component.currentDay.day).toBe(today.getDate());
  });

  it('should show "currentDate" in ".header" div', () => {
    const [year, month, day] = [2018, 6, 5];
    component.currentDay = { year, month, day};
    fixture.detectChanges();
    const headerDiv = debugElement.query(By.css('.schedule-wrapper .header'));
    const calendarDiv = headerDiv.query(By.css('div:nth-child(1)'));
    const dayDiv = headerDiv.query(By.css('div:nth-child(2)'));
    const eraDiv = headerDiv.query(By.css('div:nth-child(3)'));
    const lunarCalendarDiv = headerDiv.query(By.css('div:nth-child(4)'));
    expect((calendarDiv.nativeNode as HTMLElement).innerText).toBe(`${year}-${month}-${day} 星期二`);
    expect((dayDiv.nativeElement as HTMLElement).innerText).toBe(`${day}`);
    expect((eraDiv.nativeElement as HTMLElement).innerHTML.trim()).toBe(`戊戌年 狗年`);
    expect((lunarCalendarDiv.nativeElement as HTMLElement).innerHTML.trim()).toBe('四月廿二');
    component.currentDay = { year: 2017, month: 8, day: 8 };
    fixture.detectChanges();
    expect((lunarCalendarDiv.nativeElement as HTMLElement).innerHTML.trim()).toBe('闰六月十七');
  });

  it('should has ".title" in ".list"', () => {
    const titleDiv = debugElement.query(By.css('.list .title'));
    expect(titleDiv).toBeTruthy();
  });

  it('should show ".empty" when currentDaySchedule length equal 0', () => {
    component.currentDaySchedule = [];
    component.ngOnInit();
    fixture.detectChanges();
    const ul = debugElement.query(By.css('ul'));
    expect(ul.children.length).toBe(1);
    const emptyLi = ul.children[0];
    expect((emptyLi.nativeElement as HTMLElement).classList.contains('empty')).toBe(true);
    expect((emptyLi.nativeElement as HTMLElement).innerText).toBe('暂无日程');
  });

  it('should show schedule list in ".list ul" when "currentDaySchedule" length greater than 0', () => {
    const currentDaySchedule: Schedule[] = [
      {
        startTime: '9:00',
        endTime: '10:00',
        description: '吃饭',
        iconColor: '#ff6700'
      },
      {
        startTime: '10:00',
        endTime: '11:00',
        description: '睡觉',
        iconColor: '#ab0020'
      },
      {
        startTime: '11:00',
        endTime: '12:00',
        description: '打豆豆',
        iconColor: '#cc0022'
      }
    ];
    const color2rgb = (color) => {
      const red = Number.parseInt((color as string).slice(1, 3), 16).toString();
      const green = Number.parseInt((color as string).slice(3, 5), 16).toString();
      const blue = Number.parseInt((color as string).slice(5), 16).toString();
      return `rgb(${red}, ${green}, ${blue})`;
    };
    const ul = debugElement.query(By.css('.list ul'));
    let lis = ul.children;
    expect(lis.length).toBe(1);
    component.currentDaySchedule = currentDaySchedule;
    fixture.detectChanges();
    lis = ul.children;
    expect(lis.length).toBe(currentDaySchedule.length);
    currentDaySchedule.forEach((e, i) => {
      const li = lis[i];
      const timeDiv = li.query(By.css('.time'));
      const iconI = timeDiv.query(By.css('.icon'));
      const descriptionDiv = li.query(By.css('.description'));
      expect(timeDiv).toBeTruthy();
      expect(iconI).toBeTruthy();
      expect(descriptionDiv).toBeTruthy();
      expect((timeDiv.nativeElement as HTMLElement).innerText.trim()).toBe(`${e.startTime} - ${e.endTime}`);
      expect((iconI.nativeElement as HTMLElement).style.backgroundColor).toBe(color2rgb(e.iconColor));
      expect((descriptionDiv.nativeElement as HTMLElement).innerText.trim()).toBe(e.description);
    });
  });

  it('should update "currentDayLunarCalendar" and "currentDate" and "currentDaySchedule" when currentDay change', () => {
    const scheduleList: ScheduleList[] = [
      {
        year: 2018,
        month: 6,
        day: 5,
        schedules: [
          {
            startTime: '9:00',
            endTime: '10:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '10:00',
            endTime: '11:00',
            description: '睡觉',
            iconColor: '#ab0020'
          },
        ]
      },
      {
        year: 2017,
        month: 8,
        day: 8,
        schedules: [
          {
            startTime: '11:00',
            endTime: '12:00',
            description: '打豆豆',
            iconColor: '#cc0022'
          }
        ]
      }
    ];
    component.scheduleList = scheduleList;
    component.currentDay = { year: 2018, month: 6, day: 5 };
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.currentDayLunarCalendar).toEqual({
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
    });
    expect(component.currentDaySchedule).toEqual(scheduleList[0].schedules);
    expect(component.currentDate).toEqual(new Date(2018, 5, 5));
    const nextDate = {year: 2017, month: 8, day: 8};
    missionAnnounced$.next(nextDate);
    fixture.detectChanges();
    expect(component.currentDay).toEqual(nextDate);
    expect(component.currentDayLunarCalendar).toEqual({
      month: 6,
      monthStr: '六月',
      day: 17,
      dayStr: '十七',
      currentMonthDaysNum: 30,
      isLeapMonth: true,
      isLeapYear: true,
      chineseEra: {
        heavenlyStems: 3,
        earthlyBranches: 9,
        era: '丁酉',
        chineseZodiacAnimal: '鸡'
      }
    });
    expect(component.currentDaySchedule).toEqual(scheduleList[1].schedules);
    expect(component.currentDate).toEqual(new Date(2017, 7, 8));
  });
});
