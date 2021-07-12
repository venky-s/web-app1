import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BybFormComponent } from './byb-form.component';

describe('BybFormComponent', () => {
  let component: BybFormComponent;
  let fixture: ComponentFixture<BybFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BybFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BybFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
