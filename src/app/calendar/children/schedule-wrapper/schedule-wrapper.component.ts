import { Component, OnInit, Input } from '@angular/core';
import { MissionService } from '../../service/mission.service';
import { SelectDate, LunarData, Schedule, ScheduleList } from '../../calendar.type';
import { LunarCalendarDataService } from '../../service/lunarCalendarData.service';

@Component({
  selector: 'app-schedule-wrapper',
  templateUrl: './schedule-wrapper.component.html',
  styleUrls: ['./schedule-wrapper.component.scss']
})
export class ScheduleWrapperComponent implements OnInit {

  private _currentDay: SelectDate;
  /**
   * 今天的阴历信息
   */
  private currentDayLunarCalendar: LunarData;
  private currentDate: Date; // 当前日期对象
  private chineseWeek = ['日', '一', '二', '三', '四', '五', '六'];

  /**
   * 选择的日期
   */
  @Input()
  set currentDay(value: SelectDate) {
    this._currentDay = value;
    this.initData();
  }

  get currentDay() {
    return this._currentDay;
  }

  @Input() scheduleList: Array<ScheduleList> = [];
  currentDaySchedule: Schedule[];

  constructor(
    private missionService: MissionService,
    private lunarCalendarDataService: LunarCalendarDataService
  ) { }

  ngOnInit() {
    /**
     * 订阅日期变更
     */
    this.missionService.missionAnnounced$.subscribe(res => {
      this.currentDay = res;
    });
    const today = new Date();
    if (!this.currentDay) {
      this.currentDay = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      };
    }
  }

  initData() {
    const { year, month, day } = this.currentDay;
    this.currentDayLunarCalendar = this.lunarCalendarDataService.getLunarMonthAndDay(year, month, day);
    this.currentDate = new Date(this.currentDay.year, this.currentDay.month - 1, this.currentDay.day);
    const currentDaySchedule = this.scheduleList.find(e => e.year === year && e.month === month && e.day === day);
    this.currentDaySchedule = currentDaySchedule ? currentDaySchedule.schedules : [];
  }

}
