import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DateTableData, LunarData } from '../../../../calendar.type';
import { LunarCalendarDataService } from '../../../../service/lunarCalendarData.service';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss']
})
export class CalendarBodyComponent implements OnInit, OnChanges {

  private dateTableDataCache: {[key: string]: Array<Array<DateTableData>>} = {};
  private today = new Date();
  dateTableData: Array<Array<DateTableData>>;
  @Input() year: number;
  @Input() month: number;
  @Input() day: number;
  @Input() showToday = true;

  @Output() monthChange = new EventEmitter<number>();
  @Output() yearChange = new EventEmitter<number>();
  @Output() dayChange = new EventEmitter<number>();

  constructor(
    private lunarCalendarDataService: LunarCalendarDataService
  ) { }

  ngOnInit() {
    const date = new Date();
    this.createDate(this.year || date.getFullYear(), this.month || date.getMonth() + 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.year && changes.year.currentValue !== changes.year.previousValue) ||
        (changes.month && changes.month.currentValue !== changes.month.previousValue)) {
      this.createDate(this.year, this.month);
    }
  }

  /**
   * 创建一个年月对应的月份数据表
   * @param year 获取的年
   * @param month 获取的月份
   */
  createDate(year: number, month: number): void {
    if (Object.prototype.hasOwnProperty.call(this.dateTableDataCache, `${year}${month}`)) {
      this.dateTableData = this.dateTableDataCache[`${year}${month}`];
      return;
    }
    const currentMonthFirstDayDate = new Date(year, month - 1, 1); // 当前月一号日期对象
    let currentMonthFirstDayWeek = currentMonthFirstDayDate.getDay(); // 当前月一号星期几
    currentMonthFirstDayWeek = currentMonthFirstDayWeek === 0 ? 7 : currentMonthFirstDayWeek;
    const currentMonthDaysNum = new Date(year, month, 0).getDate(); // 当前月一共几天
    const currentMonthLastDayDate = new Date(year, month - 1, currentMonthDaysNum); // 当前月最后一天日期对象
    let currentMonthLastDayWeek = currentMonthLastDayDate.getDay();
    currentMonthLastDayWeek = currentMonthLastDayWeek === 0 ? 7 : currentMonthLastDayWeek;
    // 计算上个月最后显示的几天和下个月显示的前几天 这个月一共的天数
    const sumDays = (currentMonthFirstDayWeek - 1) + currentMonthDaysNum + (7 - currentMonthLastDayWeek);
    // 初始化月份数据表格
    this.dateTableData = new Array(sumDays / 7);
    // 获取这个月的阴历数据
    let lunarDateData = this.lunarCalendarDataService.getLunarMonthAndDay(year, month, 1);

    this.addPrevMonthDate(currentMonthFirstDayDate);
    let lunarDay = lunarDateData.day;
    let week = currentMonthFirstDayWeek;
    for (let i = 0, y = 1; i < this.dateTableData.length; i++) {
      if (!this.dateTableData[i]) {
        this.dateTableData[i] = [];
      }
      while (this.dateTableData[i].length < 7) {
        this.dateTableData[i].push({
          year,
          month: month,
          day: y,
          lunarDay: lunarDay,
          lunarDayStr: this.lunarCalendarDataService.translateDayNumToCalendarStr(lunarDay),
          isWeekend: week >= 6,
          isNotInCurrentMonth: false,
        });
        y++;
        lunarDay++;
        week++;
        if (week > 7) {
          week = 1;
        }
        if (lunarDay >= lunarDateData.currentMonthDaysNum) {
          lunarDateData = this.lunarCalendarDataService.getLunarMonthAndDay(year, month, y);
          lunarDay = lunarDateData.day;
        }
        if (y > currentMonthDaysNum) {
          break;
        }
      }
    }
    this.addNextMonthDate(currentMonthLastDayDate);
    this.dateTableDataCache[`${year}${month}`] = this.dateTableData;
  }

  /**
   * 在月份对象中添加需要显示的上个月最后几天
   * @param monthFirstDayDate 这个月一号的Date对象
   */
  addPrevMonthDate (monthFirstDayDate: Date): void {
    const tempWeek = monthFirstDayDate.getDay();
    const currentMonthFirstWeek = tempWeek === 0 ? 7 : tempWeek;
    const prevMonthDate = new Date(monthFirstDayDate.getFullYear(), monthFirstDayDate.getMonth(), 0);
    if (currentMonthFirstWeek !== 1) {
      const prevLunarMonthDate = this.lunarCalendarDataService.getLunarMonthAndDay(prevMonthDate.getFullYear(),
                                                                                   prevMonthDate.getMonth() + 1,
                                                                                   prevMonthDate.getDate());
      const firstWeek = this.dateTableData[0] = [];
      let lunarDay = prevLunarMonthDate.day;
      let week = prevMonthDate.getDay();
      week = week === 0 ? 7 : week;
      const month = prevMonthDate.getMonth() + 1;
      const year = prevMonthDate.getFullYear();
      for (let i = prevMonthDate.getDate(); i > (prevMonthDate.getDate() - currentMonthFirstWeek + 1); i--, lunarDay--, week--) {
        if (lunarDay <= 0) {
          lunarDay = this.lunarCalendarDataService.getLunarMonthAndDay(prevMonthDate.getFullYear(),
                                                                       prevMonthDate.getMonth() + 1,
                                                                       i).day;
        }
        firstWeek.unshift({
          year,
          month,
          day: i,
          lunarDay: lunarDay,
          lunarDayStr: this.lunarCalendarDataService.translateDayNumToCalendarStr(lunarDay),
          isWeekend: week >= 6,
          isNotInCurrentMonth: true
        });
      }
    }
  }

  /**
   * 在月份对象中添加下一个月需要显示的前几天日期
   * @param monthLastDayDate 月份最后一天日期对象
   */
  addNextMonthDate (monthLastDayDate: Date): void {
    const tempWeek = monthLastDayDate.getDay();
    const currentMonthLastDayWeek = tempWeek === 0 ? 7 : tempWeek;
    const nextMonthDate = new Date(monthLastDayDate.getFullYear(), monthLastDayDate.getMonth(), monthLastDayDate.getDate() + 1);
    if (currentMonthLastDayWeek !== 7) {
      const nextLunarMonthDate = this.lunarCalendarDataService.getLunarMonthAndDay(nextMonthDate.getFullYear(),
                                                                                   nextMonthDate.getMonth() + 1,
                                                                                   nextMonthDate.getDate());
      const lastWeek = this.dateTableData[this.dateTableData.length - 1];
      const month = nextMonthDate.getMonth() + 1;
      const year = nextMonthDate.getFullYear();
      let week = nextMonthDate.getDay();
      week = week === 0 ? 7 : week;
      let lunarDay = nextLunarMonthDate.day;
      for (let i = nextMonthDate.getDate(); i <= (7 - currentMonthLastDayWeek); i++, lunarDay++, week++) {
        if (lunarDay > nextLunarMonthDate.currentMonthDaysNum) {
          lunarDay = this.lunarCalendarDataService.getLunarMonthAndDay(nextMonthDate.getFullYear(),
                                                                       nextMonthDate.getMonth() + 1,
                                                                       i).day;
        }
        lastWeek.push({
          year,
          month,
          day: i,
          lunarDay: lunarDay,
          lunarDayStr: this.lunarCalendarDataService.translateDayNumToCalendarStr(lunarDay),
          isWeekend: week >= 6,
          isNotInCurrentMonth: true
        });
      }
    }
  }

  /**
   * 检测这个日期是否是今天
   * @param item 一个日期信息
   */
  checkToday(item: DateTableData): boolean {
    if (this.showToday) {
      return item.month === this.today.getMonth() + 1 && item.day === this.today.getDate() && item.year === this.today.getFullYear();
    } else {
      return false;
    }
  }

  /**
   * 判断是否是选中的日期
   * @param item 一个日期的信息
   */
  checkActive(item: DateTableData): boolean {
    if (!this.day) {
      return false;
    }
    return item.month === this.month && item.day === this.day && item.year === this.year;
  }

  /**
   * 选择一个日期
   * @param item 一个日期信息
   */
  selectDayEvent(item: DateTableData) {
    if (item.month !== this.month) {
      this.month = item.month;
      this.monthChange.emit(this.month);
    }
    if (item.year !== this.year) {
      this.year = item.year;
      this.yearChange.emit(this.year);
    }
    this.day = item.day;
    this.dayChange.emit(this.day);
  }
}
