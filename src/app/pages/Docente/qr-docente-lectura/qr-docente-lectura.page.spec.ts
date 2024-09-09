import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrDocenteLecturaPage } from './qr-docente-lectura.page';

describe('QrDocenteLecturaPage', () => {
  let component: QrDocenteLecturaPage;
  let fixture: ComponentFixture<QrDocenteLecturaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrDocenteLecturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
