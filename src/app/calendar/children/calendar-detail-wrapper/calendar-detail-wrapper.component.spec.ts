/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component, Input } from '@angular/core';

import { CalendarDetailWrapperComponent } from './calendar-detail-wrapper.component';
import { MinScrollBarComponent } from '../common/min-scroll-bar/min-scroll-bar.component';
import { LunarCalendarDataService } from '../../service/lunarCalendarData.service';
import { MissionService } from '../../service/mission.service';
import { Subject } from 'rxjs';
import { SelectDate, ListData, ScheduleList } from '../../calendar.type';

@Component({
  template: '',
  selector: 'app-dropdown'
})
class DropdownComponent {
  @Input() maxHeight: number;
  @Input() selectValue: number;
  @Input() listData: ListData[];
}

@Component({
  template: '',
  selector: 'app-calendar-body'
})
class CalendarBodyComponent {
  @Input() year: number;
  @Input() month: number;
  @Input() day: number;
  @Input() showToday: boolean;
  @Input() scheduleList: ScheduleList[];
  @Input() showSchedule: boolean;
  @Input() scheduleIconColor: string;
}

describe('CalendarDetailWrapperComponent', () => {
  let component: CalendarDetailWrapperComponent;
  let fixture: ComponentFixture<CalendarDetailWrapperComponent>;
  let debugelement: DebugElement;

  const missionAnnounced = new Subject<SelectDate>();
  const MissionServiceStub = {
    announcedMission(selectDate: SelectDate) {
      missionAnnounced.next(selectDate);
    }
  };

  const LunarCalendarDataServiceStub = {
    getScopeOfLunarYear() {
      return {
        startYear: 1900,
        endYear: 2050
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarDetailWrapperComponent,
        DropdownComponent,
        CalendarBodyComponent
      ],
      providers: [
        {
          provide: LunarCalendarDataService,
          useValue: LunarCalendarDataServiceStub
        },
        {
          provide: MissionService,
          useValue: MissionServiceStub
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDetailWrapperComponent);
    component = fixture.componentInstance;
    debugelement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have div with class "wrapper".then, should have a ".header" and ".body" inside', () => {
    const wrapperDiv = debugelement.query(By.css('.wrapper'));
    expect(wrapperDiv).toBeTruthy();
    const headerDiv = wrapperDiv.query(By.css('.header'));
    expect(headerDiv).toBeTruthy();
    const bodyDiv = wrapperDiv.query(By.css('.body'));
    expect(bodyDiv).toBeTruthy();
  });

  it('should have three div in ".header", should have icon div in the seconed div, should have button in the third div', () => {
    const headerDiv = debugelement.query(By.css('.header'));
    expect(headerDiv.children.length).toBe(3);
    const iconWrapperDiv = headerDiv.children[1];
    expect(iconWrapperDiv.children.length).toBeGreaterThan(2);
    const prevIcon = headerDiv.query(By.css('.icon.prev'));
    const nextIcon = headerDiv.query(By.css('.icon.next'));
    expect(prevIcon).toBeTruthy();
    expect(nextIcon).toBeTruthy();
    const buttonWrapperDiv = headerDiv.children[2];
    const button = buttonWrapperDiv.query(By.css('.btn'));
    expect(button).toBeTruthy();
    expect((button.nativeElement as HTMLElement).innerText.trim()).toBe('返回今日');
  });

  it('should init select data in ngOnInit', () => {
    const lunarService = TestBed.get(LunarCalendarDataService);
    const { startYear, endYear} = lunarService.getScopeOfLunarYear();
    component.ngOnInit();
    fixture.detectChanges();
    const yearListData = [];
    for (let i = startYear; i <= endYear; i++) {
      yearListData.push({
        label: `${i}年`,
        value: i
      });
    }
    expect(component.yearListData).toEqual(yearListData);
    const monthListData = [];
    for (let i = 1; i <= 12; i++) {
      monthListData.push({
        label: `${i}月`,
        value: i
      });
    }
    expect(component.monthListData).toEqual(monthListData);
    const today = new Date();
    expect(component.currentYear).toBe(today.getFullYear());
    expect(component.currentMonth).toBe(today.getMonth() + 1);
    expect(component.currentDay).toBe(today.getDate());
  });

  it('should set "currentYear", "currentMonth", "currentDay" to today when click "return today" button', () => {
    component.currentYear = 2000;
    component.currentMonth = 5;
    component.currentDay = 1;
    fixture.detectChanges();
    const btn = debugelement.query(By.css('.btn'));
    btn.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    const today = new Date();
    expect(component.currentYear).toBe(today.getFullYear());
    expect(component.currentMonth).toBe(today.getMonth() + 1);
    expect(component.currentDay).toBe(today.getDate());
  });

  it('should jump to next month when click the "next" icon', () => {
    const nextIconSpan = debugelement.query(By.css('.icon.next'));
    component.currentYear = 2000;
    component.currentMonth = 6;
    component.currentDay = 1;
    expect(component.currentMonth).toBe(6);
    nextIconSpan.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.currentMonth).toBe(7);
    component.currentMonth = 12;
    fixture.detectChanges();
    nextIconSpan.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.currentYear).toBe(2001);
    expect(component.currentMonth).toBe(1);
  });

  it('should jump to prev month when click the "prev" icon', () => {
    const prevIconSpan = debugelement.query(By.css('.icon.prev'));
    component.currentYear = 2000;
    component.currentMonth = 6;
    component.currentDay = 1;
    expect(component.currentMonth).toBe(6);
    prevIconSpan.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.currentMonth).toBe(5);
    component.currentMonth = 1;
    fixture.detectChanges();
    prevIconSpan.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();
    expect(component.currentYear).toBe(1999);
    expect(component.currentMonth).toBe(12);
  });

  it('should dispatch day change when "currentYear", "currentMonth", "currentDay" change', () => {
    const currentSelectDate = {
      year: 0,
      month: 0,
      day: 0
    };
    component.ngOnInit();
    component.currentYear = 2000;
    component.currentMonth = 6;
    component.currentDay = 1;
    fixture.detectChanges();
    missionAnnounced.subscribe(res => {
      expect(res).toEqual(currentSelectDate);
    });
    currentSelectDate.year = 2010;
    currentSelectDate.month = 6;
    currentSelectDate.day = 1;
    component.currentYear = 2010;
    currentSelectDate.month = 8;
    component.currentMonth = 8;
    currentSelectDate.day = 11;
    component.currentDay = 11;
  });
});
