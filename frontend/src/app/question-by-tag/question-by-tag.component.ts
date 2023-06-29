import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../Interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as actions from '../Store/actions/questionActions';
import { selectAllQuestions, selectQuestionById } from '../Store/Selectors/selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HashPrefixPipe } from '../Pipes/hash-prefix.pipe';

@Component({
  selector: 'app-question-by-tag',
  templateUrl: './question-by-tag.component.html',
  styleUrls: ['./question-by-tag.component.css'],
  imports: [CommonModule, RouterModule, ],
  standalone:true
})
export class QuestionByTagComponent {
  constructor(private store:Store<AppState>){}

  questions$!:Observable<Question[]>
 ngOnInit(): void {
    // this.store.dispatch(actions.getAllQuestions()) 
    this.questions$ = this.store.select(selectAllQuestions)
 }

}
