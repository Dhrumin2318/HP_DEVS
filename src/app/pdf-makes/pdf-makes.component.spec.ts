import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfMakesComponent } from './pdf-makes.component';

describe('PdfMakesComponent', () => {
  let component: PdfMakesComponent;
  let fixture: ComponentFixture<PdfMakesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfMakesComponent]
    });
    fixture = TestBed.createComponent(PdfMakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
