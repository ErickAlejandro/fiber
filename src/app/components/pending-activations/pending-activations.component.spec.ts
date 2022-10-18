import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingActivationsComponent } from './pending-activations.component';

describe('PendingActivationsComponent', () => {
  let component: PendingActivationsComponent;
  let fixture: ComponentFixture<PendingActivationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingActivationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingActivationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
