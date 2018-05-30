import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../service/mission.service';

@Component({
  selector: 'app-schedule-wrapper',
  templateUrl: './schedule-wrapper.component.html',
  styleUrls: ['./schedule-wrapper.component.scss']
})
export class ScheduleWrapperComponent implements OnInit {

  constructor(
    private missionService: MissionService
  ) { }

  ngOnInit() {
    this.missionService.missionAnnounced$.subscribe(res => {
      console.log(res);
    });
  }

}
