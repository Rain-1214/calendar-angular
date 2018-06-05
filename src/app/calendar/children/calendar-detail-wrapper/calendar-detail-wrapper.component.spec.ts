/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CalendarDetailWrapperComponent } from './calendar-detail-wrapper.component';
import { DropdownComponent } from '../common/dropdown/dropdown.component';
import { MinScrollBarComponent } from '../common/min-scroll-bar/min-scroll-bar.component';
import { CalendarBodyComponent } from './children/calendar-body/calendar-body.component';
import { LunarCalendarDataService } from '../../service/lunarCalendarData.service';
import { MissionService } from '../../service/mission.service';

describe('CalendarDetailWrapperComponent', () => {
  let component: CalendarDetailWrapperComponent;
  let fixture: ComponentFixture<CalendarDetailWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarDetailWrapperComponent,
        DropdownComponent,
        MinScrollBarComponent,
        CalendarBodyComponent
      ],
      providers: [
        LunarCalendarDataService,
        MissionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDetailWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
