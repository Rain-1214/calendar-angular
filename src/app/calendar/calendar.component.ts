import { Component, Input } from '@angular/core';
import { ScheduleList } from './calendar.type';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @Input() width = 550; // 日历宽度
  @Input() scheduleList: Array<ScheduleList> = []; // 日程数据
  @Input() showSchedule = false; // 是否在日历中显示哪天有日程
  @Input() scheduleIconColor = '#fb0'; // 日历中有日程的日期icon颜色
  @Input() showToday = true; // 是否高亮显示今天

  constructor() { }

}
