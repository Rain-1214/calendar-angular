import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ScheduleList, SelectDate } from './calendar.type';
import { MissionService } from './service/mission.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() width = 550; // 日历宽度
  @Input() scheduleList: Array<ScheduleList> = []; // 日程数据
  @Input() showSchedule = false; // 是否在日历中显示哪天有日程
  @Input() scheduleIconColor = '#fb0'; // 日历中有日程的日期icon颜色
  @Input() showToday = true; // 是否高亮显示今天
  @Input() defaultYear: number;
  @Input() defaultMonth: number;
  @Input() defaultDay: number;
  @Output() updateDate = new EventEmitter<SelectDate>();

  constructor(
    private missionService: MissionService
  ) { }

  ngOnInit(): void {
    this.missionService.missionAnnounced$.subscribe((res) => {
      if (res.year && res.month && res.day) {
        this.updateDate.emit(res);
      }
    });
  }

}
