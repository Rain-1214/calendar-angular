import { Component, OnInit, Input } from '@angular/core';
import { LunarCalendarDataService } from './service/lunarCalendarData.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() width = 550;

  constructor() { }

  ngOnInit() {
  }

}
