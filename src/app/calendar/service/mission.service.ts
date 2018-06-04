import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectDate } from '../calendar.type';

@Injectable()
export class MissionService {

  constructor() { }

  /**
   * 组件间通信流
   */
  private missionAnnounced = new Subject<SelectDate>();

  missionAnnounced$ = this.missionAnnounced.asObservable();

  announcedMission(selectDate: SelectDate) {
    this.missionAnnounced.next(selectDate);
  }

}
