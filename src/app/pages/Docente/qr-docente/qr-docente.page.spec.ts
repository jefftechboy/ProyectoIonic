import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrDocentePage } from './qr-docente.page';

describe('QrDocentePage', () => {
  let component: QrDocentePage;
  let fixture: ComponentFixture<QrDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
