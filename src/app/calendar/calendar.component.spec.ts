/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

import { CalendarComponent } from './calendar.component';
import { By } from '@angular/platform-browser';

@Component({ selector: 'app-schedule-wrapper', template: ''})
class SecheduleWrapperComponent {}

@Component({ selector: 'app-calendar-detail-wrapper', template: ''})
class CalendarDetailWrapperComponent {}

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarComponent,
        SecheduleWrapperComponent,
        CalendarDetailWrapperComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has "div" with class ".calendar-wrapper"', () => {
    const calendarWrapperDiv = debugElement.query(By.css('.calendar-wrapper'));
    expect(calendarWrapperDiv).toBeTruthy();
  });

  it('".calendar-wrapper" width of style should equal property width', () => {
    component.width = 500;
    fixture.detectChanges();
    const calendarWrapperDiv = debugElement.query(By.css('.calendar-wrapper'));
    expect((calendarWrapperDiv.nativeElement as HTMLElement).style.width).toBe('500px');
  });

  it('should has "div" with class ".calendar-detail-wrapper"', () => {
    const calendarDetailWrapperDiv = debugElement.query(By.css('.calendar-detail-wrapper'));
    expect(calendarDetailWrapperDiv).toBeTruthy();
  });

  it('should has "div" with class ".schedule-wrapper"', () => {
    const scheduleWrapperDiv = debugElement.query(By.css('.schedule-wrapper'));
    expect(scheduleWrapperDiv).toBeTruthy();
  });
});
