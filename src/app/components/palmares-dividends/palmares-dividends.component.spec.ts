import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalmaresDividendsComponent } from './palmares-dividends.component';

describe('PalmaresDividendsComponent', () => {
  let component: PalmaresDividendsComponent;
  let fixture: ComponentFixture<PalmaresDividendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalmaresDividendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PalmaresDividendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
