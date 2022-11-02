import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesEmptyComponent } from './tables-empty.component';

describe('TablesEmptyComponent', () => {
  let component: TablesEmptyComponent;
  let fixture: ComponentFixture<TablesEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesEmptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
