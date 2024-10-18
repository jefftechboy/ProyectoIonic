import { TestBed } from '@angular/core/testing';

import { ClaseActualService } from './clase-actual.service';

describe('ClaseActualService', () => {
  let service: ClaseActualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaseActualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
