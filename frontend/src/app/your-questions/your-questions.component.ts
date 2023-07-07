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
 
  questions$!:Question[]
  constructor(private store:Store<AppState>){}
   uid = localStorage.getItem("uid") as string
  ngOnInit(): void {
     console.log(this.uid)
      this.store.dispatch(getAllUserQuestions({uid:this.uid}))
      this.store.select(selectUserQuestions).subscribe(res=>{
        this.questions$ = res
      })
      console.log(this.uid);
      
  }

  delete(qid:string){
    this.store.dispatch(deleteQuestion({qid:qid}))
  }

  all(){
    this.store.select(selectUserQuestions).subscribe(res=>{
      console.log(res);
      
      this.questions$ = res
    });
   }
   answered(){
    this.store.select(selectUserQuestions).subscribe(res=>{
      console.log(res);
      
      this.questions$ = res.filter(q=>q.answer_count>0)
    })
  
   }
   unanswered(){
    this.store.select(selectUserQuestions).subscribe(res=>{
      console.log(res);
      
      this.questions$ = res.filter(q=>q.answer_count<1)
    });}
}
