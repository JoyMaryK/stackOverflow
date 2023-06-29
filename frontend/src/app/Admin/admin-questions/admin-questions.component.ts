import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectAllQuestions } from 'src/app/Store/Selectors/selectors';
import * as actions from '../../Store/actions/questionActions';
import { Observable, map } from 'rxjs';
import { deleteQuestion } from '../../Store/actions/questionActions';
import { Question } from 'src/app/Interfaces';


@Component({
  selector: 'app-admin-questions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-questions.component.html',
  styleUrls: ['./admin-questions.component.css']
})
export class AdminQuestionsComponent {
  constructor(private store:Store<AppState>, private router:Router){}

  questions$!:Observable<Question[]>
 ngOnInit(): void {
    this.store.dispatch(actions.getAllQuestions()) 
    this.questions$= this.store.select(selectAllQuestions)
 }

 delete(qid:string){
  this.store.dispatch(actions.deleteQuestionAdmin({qid:qid}))
}

logout(){
  localStorage.clear()
  this.router.navigateByUrl('/login')
}
}
