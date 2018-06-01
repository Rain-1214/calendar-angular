import { Component, OnInit } from '@angular/core';
import { ListData, DateTableData } from '../../calendar.type';
import { LunarCalendarDataService } from '../../service/lunarCalendarData.service';
import { MissionService } from '../../service/mission.service';

@Component({
  selector: 'app-calendar-detail-wrapper',
  templateUrl: './calendar-detail-wrapper.component.html',
  styleUrls: ['./calendar-detail-wrapper.component.scss']
})
export class CalendarDetailWrapperComponent implements OnInit {

  yearListData: ListData[];
  monthListData: ListData[];

  _currentYear: number;
  _currentMonth: number;
  _currentDay: number;

  set currentYear (value: number) {
    if (value) {
      this.missionService.announcedMission({year: value, month: this.currentMonth, day: this.currentDay});
    }
    this._currentYear = value;
  }

  get currentYear () {
    return this._currentYear;
  }

  set currentMonth (value: number) {
    if (value) {
      this.missionService.announcedMission({year: this.currentYear, month: value, day: this.currentDay});
    }
    this._currentMonth = value;
  }

  get currentMonth () {
    return this._currentMonth;
  }

  set currentDay (value: number) {
    if (value) {
      this.missionService.announcedMission({year: this.currentYear, month: this.currentMonth, day: value});
    }
    this._currentDay = value;
  }

  get currentDay () {
    return this._currentDay;
  }

  constructor(
    private lunarCalendarDataService: LunarCalendarDataService,
    private missionService: MissionService
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
    this.currentDay = currentDate.getDate();
  }

  resetDate (): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1;
  }

}
