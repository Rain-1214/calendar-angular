import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SelectDate } from '../calendar.type';

@Injectable()
export class MissionService {

  constructor() { }

  private missionAnnounced = new Subject<SelectDate>();

  missionAnnounced$ = this.missionAnnounced.asObservable();

  announcedMission(selectDate: SelectDate) {
    this.missionAnnounced.next(selectDate);
  }

}
