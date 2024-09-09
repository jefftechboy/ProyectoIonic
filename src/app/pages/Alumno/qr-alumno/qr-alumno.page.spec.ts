import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrAlumnoPage } from './qr-alumno.page';

describe('QrAlumnoPage', () => {
  let component: QrAlumnoPage;
  let fixture: ComponentFixture<QrAlumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrAlumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
