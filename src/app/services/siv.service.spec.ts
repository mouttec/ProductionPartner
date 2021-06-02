import { TestBed } from '@angular/core/testing';

import { SivService } from './siv.service';

describe('SivService', () => {
  let service: SivService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SivService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
