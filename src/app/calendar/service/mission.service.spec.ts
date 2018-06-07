/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MissionService } from './mission.service';
import { SelectDate } from '../calendar.type';

describe('Service: Mission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MissionService]
    });
  });

  it('should can be created', inject([MissionService], (service: MissionService) => {
    expect(service).toBeTruthy();
  }));

  it('Observable should dispatch value after value change', inject([MissionService], (service: MissionService) => {
    let afterChangeValue: SelectDate = {
      year: 1,
      month: 1,
      day: 1
    };
    service.missionAnnounced$.subscribe((res) => {
      afterChangeValue = res;
    });
    const beforeChangeValue: SelectDate = {
      year: 2,
      month: 2,
      day: 2
    };
    service.announcedMission(beforeChangeValue);
    expect(beforeChangeValue).toEqual(afterChangeValue);
  }));
});
