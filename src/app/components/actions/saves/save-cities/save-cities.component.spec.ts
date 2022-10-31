import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveCitiesComponent } from './save-cities.component';

describe('SaveCitiesComponent', () => {
  let component: SaveCitiesComponent;
  let fixture: ComponentFixture<SaveCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
