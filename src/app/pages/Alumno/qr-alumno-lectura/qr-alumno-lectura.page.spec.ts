import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrAlumnoLecturaPage } from './qr-alumno-lectura.page';

describe('QrAlumnoLecturaPage', () => {
  let component: QrAlumnoLecturaPage;
  let fixture: ComponentFixture<QrAlumnoLecturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrAlumnoLecturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
