import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoCursoDocenteDetallePage } from './listado-curso-docente-detalle.page';

describe('ListadoCursoDocenteDetallePage', () => {
  let component: ListadoCursoDocenteDetallePage;
  let fixture: ComponentFixture<ListadoCursoDocenteDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCursoDocenteDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
