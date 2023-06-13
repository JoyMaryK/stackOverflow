import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourOneQuestionComponent } from './your-one-question.component';

describe('YourOneQuestionComponent', () => {
  let component: YourOneQuestionComponent;
  let fixture: ComponentFixture<YourOneQuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourOneQuestionComponent]
    });
    fixture = TestBed.createComponent(YourOneQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
