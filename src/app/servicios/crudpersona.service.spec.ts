import { TestBed } from '@angular/core/testing';

import { CrudpersonaService } from './crudpersona.service';

describe('CrudpersonaService', () => {
  let service: CrudpersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudpersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
