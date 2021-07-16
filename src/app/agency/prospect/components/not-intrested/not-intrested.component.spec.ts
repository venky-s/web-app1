import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotIntrestedComponent } from './not-intrested.component';

describe('NotIntrestedComponent', () => {
  let component: NotIntrestedComponent;
  let fixture: ComponentFixture<NotIntrestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotIntrestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotIntrestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
