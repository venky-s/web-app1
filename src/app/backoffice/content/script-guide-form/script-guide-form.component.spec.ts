import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptGuideFormComponent } from './script-guide-form.component';

describe('ScriptGuideFormComponent', () => {
  let component: ScriptGuideFormComponent;
  let fixture: ComponentFixture<ScriptGuideFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScriptGuideFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptGuideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
