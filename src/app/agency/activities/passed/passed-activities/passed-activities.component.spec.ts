import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassedActivitiesComponent } from './passed-activities.component';

describe('PassedActivitiesComponent', () => {
  let component: PassedActivitiesComponent;
  let fixture: ComponentFixture<PassedActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassedActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassedActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
