/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ScheduleWrapperComponent } from './schedule-wrapper.component';
import { MissionService } from '../../service/mission.service';
import { LunarCalendarDataService } from '../../service/lunarCalendarData.service';

describe('ScheduleWrapperComponent', () => {
  let component: ScheduleWrapperComponent;
  let fixture: ComponentFixture<ScheduleWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleWrapperComponent ],
      providers: [
        MissionService,
        LunarCalendarDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
