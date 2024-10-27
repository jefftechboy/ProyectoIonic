import { TestBed } from '@angular/core/testing';
import { DetalleAsistenciaService } from './detalle-asistencia.service';
describe('DetalleAsistenciaService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DetalleAsistenciaService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=detalle-asistencia.service.spec.js.map