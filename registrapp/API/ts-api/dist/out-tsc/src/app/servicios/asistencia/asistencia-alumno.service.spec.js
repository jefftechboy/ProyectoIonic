import { TestBed } from '@angular/core/testing';
import { AsistenciaAlumnoService } from './asistencia-alumno.service';
describe('AsistenciaAlumnoService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AsistenciaAlumnoService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=asistencia-alumno.service.spec.js.map