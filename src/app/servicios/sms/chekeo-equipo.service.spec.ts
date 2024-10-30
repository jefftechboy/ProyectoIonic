import { TestBed } from '@angular/core/testing';

import { ChekeoEquipoService } from './chekeo-equipo.service';

describe('ChekeoEquipoService', () => {
  let service: ChekeoEquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChekeoEquipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
