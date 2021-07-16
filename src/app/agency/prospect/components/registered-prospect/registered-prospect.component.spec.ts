import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredProspectComponent } from './registered-prospect.component';

describe('RegisteredProspectComponent', () => {
  let component: RegisteredProspectComponent;
  let fixture: ComponentFixture<RegisteredProspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredProspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredProspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
