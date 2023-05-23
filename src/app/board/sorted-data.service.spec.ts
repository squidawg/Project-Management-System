import { TestBed } from '@angular/core/testing';

import { SortedDataService } from './sorted-data.service';

describe('SortedDataService', () => {
  let service: SortedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
