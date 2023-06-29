import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionByTagComponent } from './question-by-tag.component';

describe('QuestionByTagComponent', () => {
  let component: QuestionByTagComponent;
  let fixture: ComponentFixture<QuestionByTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionByTagComponent]
    });
    fixture = TestBed.createComponent(QuestionByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
