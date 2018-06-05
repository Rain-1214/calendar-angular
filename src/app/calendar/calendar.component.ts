import { Component, OnInit, Input } from '@angular/core';
import { LunarCalendarDataService } from './service/lunarCalendarData.service';
import { Schedule, ScheduleList } from './calendar.type';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() width = 550; // 日历宽度
  @Input() scheduleList: Array<ScheduleList>; // 日程数据
  @Input() showSchedule = false; // 是否在日历中显示哪天有日程
  @Input() scheduleIconColor = '#fb0'; // 日历中有日程的日期icon颜色
  @Input() showToday = true; // 是否高亮显示今天

  constructor() { }

  ngOnInit() {
    this.scheduleList = [
      {
        year: 2018,
        month: 6,
        day: 5,
        schedules: [
          {
            startTime: '9:00',
            endTime: '10:00',
            description: '睡觉',
            iconColor: 'red'
          }
        ]
      },
      {
        year: 2018,
        month: 6,
        day: 1,
        schedules: [
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
          {
            startTime: '8:00',
            endTime: '9:00',
            description: '吃饭',
            iconColor: '#ff6700'
          },
        ]
      }
    ];
  }

}
