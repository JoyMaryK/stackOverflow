import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Question } from '../Interfaces';
import { Observable } from 'rxjs';
import { deleteQuestion, getAllUserQuestions } from '../Store/actions/questionActions';
import { selectUserQuestions } from '../Store/Selectors/selectors';
import { AppState } from '../app.state';

@Component({
  selector: 'app-your-questions',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './your-questions.component.html',
  styleUrls: ['./your-questions.component.css']
})
export class YourQuestionsComponent implements OnInit {
 
  questions$!:Observable<Question[]>
  constructor(private store:Store<AppState>){}
   uid = localStorage.getItem("uid") as string
  ngOnInit(): void {
      this.store.dispatch(getAllUserQuestions({uid:this.uid}))
      this.questions$ = this.store.select(selectUserQuestions)
      console.log(this.uid);
      
  }

  delete(qid:string){
    this.store.dispatch(deleteQuestion({qid:qid}))
  }
}
