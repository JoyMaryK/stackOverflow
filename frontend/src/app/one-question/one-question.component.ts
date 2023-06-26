import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { addAnswer } from '../Store/actions/answersActions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Answer, Question } from '../Interfaces';
import { Observable } from 'rxjs';
import {
  selectAllAnswers,
  selectQuestionById,
} from '../Store/Selectors/selectors';
import * as answersActions from '../Store/actions/answersActions';
import { getAllQuestions, getOneQuestion } from '../Store/actions/questionActions';

@Component({
  selector: 'app-one-question',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './one-question.component.html',
  styleUrls: ['./one-question.component.css'],
})
export class OneQuestionComponent implements OnInit {
  showComment = false;
  showComment1 = false;
  invalid: string | null = null;
  formData = {
    answer: '',
  };
  qid=''
  answers$!: Observable<Answer[]>;
  question!:Question;
  constructor(private store: Store<AppState>,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['id']
    this.store.dispatch(getOneQuestion({qid:this.qid}))
    this.store.select(selectQuestionById(this.qid)).subscribe(
     res=>{
      this.question=res as Question
      console.log(this.question);
      
     }
    )

    this.store.dispatch(answersActions.getAllAnswers({qid:this.qid}));
    this.answers$ = this.store.select(selectAllAnswers);

  }
  onSubmit() {
    console.log(this.formData);
    let newA: Answer = {
      ...this.formData,
      username: '',
      aid: '',
      isPrefered: false,
      vote_count: 0,
    };
    this.store.dispatch(addAnswer({ newAnswer: newA ,qid:this.qid}));
  }

  onSub(form: NgForm) {
    if (form.valid) {
      this.invalid = null;
      console.log(form.value);
    } else {
      this.invalid = 'invalid input';
    }
  }
}
