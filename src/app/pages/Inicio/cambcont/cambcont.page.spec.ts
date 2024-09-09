import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambcontPage } from './cambcont.page';

describe('CambcontPage', () => {
  let component: CambcontPage;
  let fixture: ComponentFixture<CambcontPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambcontPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
