import { TestBed } from '@angular/core/testing';
import { CrudApiService } from './crud-api.service';
describe('CrudApiService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CrudApiService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=crud-api.service.spec.js.map