import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashBoxesComponent } from './cash-boxes.component';

describe('CashBoxesComponent', () => {
  let component: CashBoxesComponent;
  let fixture: ComponentFixture<CashBoxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashBoxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
