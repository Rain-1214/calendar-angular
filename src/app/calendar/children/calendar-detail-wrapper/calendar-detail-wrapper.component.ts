import { Component, OnInit, Input } from '@angular/core';
import { ListData, DateTableData, ScheduleList } from '../../calendar.type';
import { LunarCalendarDataService } from '../../service/lunarCalendarData.service';
import { MissionService } from '../../service/mission.service';

@Component({
  selector: 'app-calendar-detail-wrapper',
  templateUrl: './calendar-detail-wrapper.component.html',
  styleUrls: ['./calendar-detail-wrapper.component.scss']
})
export class CalendarDetailWrapperComponent implements OnInit {

  /**
   * 年份选项
   */
  yearListData: ListData[];
  /**
   * 月份选项
   */
  monthListData: ListData[];

  @Input() scheduleList: ScheduleList[]; // 日程数据
  @Input() showSchedule: boolean; // 是否在日历中显示哪天有日程
  @Input() showToday: boolean; // 是否高亮显示今天
  @Input() scheduleIconColor: string; // 日历中有日程的日期icon颜色

  _currentYear: number;
  _currentMonth: number;
  _currentDay: number;

  /**
   * 当前选择的年
   */
  @Input()
  set currentYear (value: number) {
    if (value) {
      this.missionService.announcedMission({year: value, month: this.currentMonth, day: this.currentDay});
    }
    this._currentYear = value;
  }

  get currentYear () {
    return this._currentYear;
  }

  /**
   * 当前选择的月
   */
  @Input()
  set currentMonth (value: number) {
    if (value) {
      this.missionService.announcedMission({year: this.currentYear, month: value, day: this.currentDay});
    }
    this._currentMonth = value;
  }

  get currentMonth () {
    return this._currentMonth;
  }

  /**
   * 当前选择的日号
   */
  @Input()
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
    this.initSelectData();
  }

  /**
   * 生成年份月份选项
   */
  initSelectData(): void {
    const currentDate = new Date();
    if (!this.currentYear) {
      this.currentYear = currentDate.getFullYear();
    }
    const scopeOfYear = this.lunarCalendarDataService.getScopeOfLunarYear();
    this.yearListData = [];
    for (let i = scopeOfYear.startYear; i <= scopeOfYear.endYear; i++) {
      this.yearListData.push({
        label: `${i}年`,
        value: i
      });
    }
    if (!this.currentMonth) {
      this.currentMonth = currentDate.getMonth() + 1;
    }
    this.monthListData = [];
    for (let i = 1; i <= 12; i++) {
      this.monthListData.push({
        label: `${i}月`,
        value: i
      });
    }
    if (!this.currentDay) {
      this.currentDay = currentDate.getDate();
    }
  }

  /**
   * 返回今天
   */
  resetDate (): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
    this.currentMonth = currentDate.getMonth() + 1;
    this.currentDay = currentDate.getDate();
  }

  /**
   * 切换到下个月
   */
  nextMonth(): void {
    const { endYear } = this.lunarCalendarDataService.getScopeOfLunarYear();
    if (this.currentYear === endYear && this.currentMonth === 12) {
      return;
    }
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  /**
   * 切换到上个月
   */
  prevMonth(): void {
    const { startYear } = this.lunarCalendarDataService.getScopeOfLunarYear();
    if (this.currentYear === startYear && this.currentMonth === 1) {
      return;
    }
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

}
