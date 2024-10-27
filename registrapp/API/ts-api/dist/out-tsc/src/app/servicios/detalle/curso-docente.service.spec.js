import { TestBed } from '@angular/core/testing';
import { CursoDocenteService } from './curso-docente.service';
describe('CursoDocenteService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CursoDocenteService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=curso-docente.service.spec.js.map