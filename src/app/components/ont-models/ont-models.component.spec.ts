import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OntModelsComponent } from './ont-models.component';

describe('OntModelsComponent', () => {
  let component: OntModelsComponent;
  let fixture: ComponentFixture<OntModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OntModelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OntModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
