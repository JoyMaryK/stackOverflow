import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectAllQuestions } from 'src/app/Store/Selectors/selectors';
import * as actions from '../../Store/actions/questionActions';
import { map } from 'rxjs';
import { deleteQuestion } from '../../Store/actions/questionActions';


@Component({
  selector: 'app-admin-questions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.css']
})
export class AdminQuestionsComponent {
  constructor(private store:Store<AppState>){}

  questions$ = this.store.select(selectAllQuestions)
 ngOnInit(): void {
    this.store.dispatch(actions.getAllQuestions()) 
 }

 delete(qid:string){
  this.store.dispatch(deleteQuestion({qid:qid}))
}
}
