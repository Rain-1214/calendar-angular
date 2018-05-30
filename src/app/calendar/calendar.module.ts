import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { LunarCalendarDataService } from './service/lunarCalendarData.service';
import { CalendarDetailWrapperComponent } from './children/calendar-detail-wrapper/calendar-detail-wrapper.component';
import { ScheduleWrapperComponent } from './children/schedule-wrapper/schedule-wrapper.component';
import { DropdownComponent } from './children/common/dropdown/dropdown.component';
import { MinScrollBarComponent } from './children/common/min-scroll-bar/min-scroll-bar.component';
import { CalendarBodyComponent } from './children/calendar-detail-wrapper/children/calendar-body/calendar-body.component';
import { MissionService } from './service/mission.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CalendarComponent,
    CalendarDetailWrapperComponent,
    ScheduleWrapperComponent,
    DropdownComponent,
    MinScrollBarComponent,
    CalendarBodyComponent
  ],
  providers: [LunarCalendarDataService, MissionService],
  exports: [CalendarComponent]
})
export class CalendarModule { }
