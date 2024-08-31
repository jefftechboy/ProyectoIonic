import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoCursoDocentePage } from './listado-curso-docente.page';

describe('ListadoCursoDocentePage', () => {
  let component: ListadoCursoDocentePage;
  let fixture: ComponentFixture<ListadoCursoDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCursoDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
