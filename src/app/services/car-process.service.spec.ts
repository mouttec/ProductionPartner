import { TestBed } from '@angular/core/testing';

import { CarProcessService } from './car-process.service';

describe('CarProcessService', () => {
  let service: CarProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
