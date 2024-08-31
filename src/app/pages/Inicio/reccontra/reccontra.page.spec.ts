import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReccontraPage } from './reccontra.page';

describe('ReccontraPage', () => {
  let component: ReccontraPage;
  let fixture: ComponentFixture<ReccontraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReccontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
