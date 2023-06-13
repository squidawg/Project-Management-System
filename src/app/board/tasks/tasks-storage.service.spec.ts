import { TestBed } from '@angular/core/testing';

import { TasksStorageService } from './tasks-storage.service';

describe('TasksStorageService', () => {
  let service: TasksStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
