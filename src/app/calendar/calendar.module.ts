import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { LunarCalendarDataService } from './service/lunarCalendarData.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CalendarComponent],
  providers: [LunarCalendarDataService],
  exports: [CalendarComponent]
})
export class CalendarModule { }
