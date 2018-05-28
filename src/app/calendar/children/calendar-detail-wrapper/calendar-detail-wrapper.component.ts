import { Component, OnInit } from '@angular/core';
import { ListData, DateTableData } from '../../calendar.type';
import { LunarCalendarDataService } from '../../service/lunarCalendarData.service';

@Component({
  selector: 'app-calendar-detail-wrapper',
  templateUrl: './calendar-detail-wrapper.component.html',
  styleUrls: ['./calendar-detail-wrapper.component.scss']
})
export class CalendarDetailWrapperComponent implements OnInit {

  currentYear: number;
  yearListData: ListData[];

  currentMonth: number;
  monthListData: ListData[];


  constructor(
    private lunarCalendarDataService: LunarCalendarDataService
  ) { }

  ngOnInit() {
    this.initSelectDate();
  }

  initSelectDate(): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    const scopeOfYear = this.lunarCalendarDataService.getScopeOfLunarYear();
    this.yearListData = [];
    for (let i = scopeOfYear.startYear; i <= scopeOfYear.endYear; i++) {
      this.yearListData.push({
        label: `${i}年`,
        value: i
      });
    }
    this.currentMonth = currentDate.getMonth() + 1;
    this.monthListData = [];
    for (let i = 1; i <= 12; i++) {
      this.monthListData.push({
        label: `${i}月`,
        value: i
      });
    }
  }

  resetDate (): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1;
  }

}
