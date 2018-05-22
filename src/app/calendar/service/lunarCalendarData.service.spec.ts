/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { LunarCalendarDataService } from './lunarCalendarData.service';

describe('Service: LunarCalendarData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LunarCalendarDataService]
    });
  });

  it('should ...', inject([LunarCalendarDataService], (service: LunarCalendarDataService) => {
    expect(service).toBeTruthy();
  }));
});
