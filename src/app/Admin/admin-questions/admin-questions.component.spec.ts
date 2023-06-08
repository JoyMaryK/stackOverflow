import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestionsComponent } from './admin-questions.component';

describe('AdminQuestionsComponent', () => {
  let component: AdminQuestionsComponent;
  let fixture: ComponentFixture<AdminQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminQuestionsComponent]
    });
    fixture = TestBed.createComponent(AdminQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
