import { TestBed } from '@angular/core/testing';

import { HazardReport } from './hazard-report';

describe('HazardReport', () => {
  let service: HazardReport;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HazardReport);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
