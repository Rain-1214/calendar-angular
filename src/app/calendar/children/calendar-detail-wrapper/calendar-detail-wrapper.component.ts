import { Component, OnInit } from '@angular/core';
import { ListData } from '../../calendar.type';
import { LunarCalendarDataService } from '../../service/lunarCalendarData.service';

@Component({
  selector: 'app-calendar-detail-wrapper',
  templateUrl: './calendar-detail-wrapper.component.html',
  styleUrls: ['./calendar-detail-wrapper.component.scss']
})
export class CalendarDetailWrapperComponent implements OnInit {

  currentYear: number;
  yearListData: ListData[];

  constructor(
    private lunarCalendarDataService: LunarCalendarDataService
  ) { }

  ngOnInit() {
    this.initData();
  }

  initData(): void {
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
  }

}
