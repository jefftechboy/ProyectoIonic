import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaAsistenciaTomadaPage } from './lista-asistencia-tomada.page';

describe('ListaAsistenciaTomadaPage', () => {
  let component: ListaAsistenciaTomadaPage;
  let fixture: ComponentFixture<ListaAsistenciaTomadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAsistenciaTomadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
