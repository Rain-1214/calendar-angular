import { Component, OnInit } from '@angular/core';
import { DateTableData, LunarData } from '../../../../calendar.type';
import { LunarCalendarDataService } from '../../../../service/lunarCalendarData.service';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss']
})
export class CalendarBodyComponent implements OnInit {

  dateTableData: Array<Array<DateTableData>>;

  constructor(
    private lunarCalendarDataService: LunarCalendarDataService
  ) { }

  ngOnInit() {
    const date = new Date();
    this.createDate(date.getFullYear(), date.getMonth() + 1);
  }

  createDate(year: number, month: number): void {
    const currentMonthFirstDayDate = new Date(year, month - 1, 1); // 当前月一号日期对象
    const currentMonthFirstDayWeek = currentMonthFirstDayDate.getDay(); // 当前月一号星期几
    const currentMonthDaysNum = new Date(year, month, 0).getDate(); // 当前月一共几天
    const currentMonthLastDayWeek = new Date(year, month - 1, currentMonthDaysNum).getDay(); // 当前月最后一天星期几

    // 计算上个月最后显示的几天和下个月显示出的前几天 这个月一共的天数
    const sumDays = (currentMonthFirstDayWeek - 1) + currentMonthDaysNum + (7 - currentMonthLastDayWeek);
    // 初始化月份数据表格
    this.dateTableData = new Array(sumDays / 7);
    // 获取这个月的阴历数据
    const lunarDateData = this.lunarCalendarDataService.getLunarMonthAndDay(year, month, 1);
    this.addPrevMonthDate(currentMonthFirstDayDate);
    let lunarDay = lunarDateData.day;
    for (let i = 0, y = 1; i <= this.dateTableData.length; i++) {
      lunarDay++;
      if (!this.dateTableData[i]) {
        this.dateTableData[i] = [];
      }
      this.dateTableData[i].push({
        day: y++,
        lunarDay: lunarDay,
        lunarDayStr: this.lunarCalendarDataService.translateDayNumToCalendarStr(lunarDay),
        isWeekend: false
      });
    }
  }

  /**
   * 在月份对象中添加需要显示的上个月最后几天
   * @param monthFirstDayDate 这个月一号的Date对象
   */
  addPrevMonthDate (monthFirstDayDate: Date): void {
    const currentMonthFirstWeek = monthFirstDayDate.getDay();
    const lunarMonthDate = this.lunarCalendarDataService.getLunarMonthAndDay(monthFirstDayDate.getFullYear(),
                                                                             monthFirstDayDate.getMonth() + 1,
                                                                             monthFirstDayDate.getDate());
    const prevMonthDate = new Date(monthFirstDayDate.getFullYear(), monthFirstDayDate.getMonth(), 0);
    if (currentMonthFirstWeek !== 1) {
      const prevLunarMonthDate = this.lunarCalendarDataService.getLunarMonthAndDay(prevMonthDate.getFullYear(),
                                                                                   prevMonthDate.getMonth() + 1,
                                                                                   prevMonthDate.getDate());
      const firstWeek = this.dateTableData[0] = [];
      let lunarDay = lunarMonthDate.day - 1;
      for (let i = prevMonthDate.getDate(); i > (prevMonthDate.getDate() - currentMonthFirstWeek + 1); i--) {
        lunarDay = lunarDay > 0 ? lunarDay-- : (lunarDay = prevLunarMonthDate.day, prevLunarMonthDate.day);
        firstWeek.unshift({
          day: i,
          lunarDay: lunarDay,
          lunarDayStr: this.lunarCalendarDataService.translateDayNumToCalendarStr(lunarDay),
          isWeekend: new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), i).getDay() >= 6
        });
      }
    }
  }


}
