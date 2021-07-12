import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptGuideComponent } from './script-guide.component';

describe('ScriptGuideComponent', () => {
  let component: ScriptGuideComponent;
  let fixture: ComponentFixture<ScriptGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScriptGuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
