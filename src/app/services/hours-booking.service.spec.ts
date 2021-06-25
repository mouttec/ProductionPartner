import { TestBed } from '@angular/core/testing';

import { HoursBookingService } from './hours-booking.service';

describe('HoursBookingService', () => {
  let service: HoursBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoursBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
