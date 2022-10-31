import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveProvincesComponent } from './save-provinces.component';

describe('SaveProvincesComponent', () => {
  let component: SaveProvincesComponent;
  let fixture: ComponentFixture<SaveProvincesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveProvincesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveProvincesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
