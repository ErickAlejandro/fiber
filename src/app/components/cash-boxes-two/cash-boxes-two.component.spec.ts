import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBoxesTwoComponent } from './cash-boxes-two.component';

describe('CashBoxesTwoComponent', () => {
  let component: CashBoxesTwoComponent;
  let fixture: ComponentFixture<CashBoxesTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashBoxesTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBoxesTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
