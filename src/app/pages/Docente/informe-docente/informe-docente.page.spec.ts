import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformeDocentePage } from './informe-docente.page';

describe('InformeDocentePage', () => {
  let component: InformeDocentePage;
  let fixture: ComponentFixture<InformeDocentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
