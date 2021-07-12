import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BybComponent } from './byb.component';

describe('BybComponent', () => {
  let component: BybComponent;
  let fixture: ComponentFixture<BybComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BybComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BybComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
