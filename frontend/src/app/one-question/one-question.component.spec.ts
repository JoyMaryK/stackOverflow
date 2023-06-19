import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneQuestionComponent } from './one-question.component';

describe('OneQuestionComponent', () => {
  let component: OneQuestionComponent;
  let fixture: ComponentFixture<OneQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OneQuestionComponent]
    });
    fixture = TestBed.createComponent(OneQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
