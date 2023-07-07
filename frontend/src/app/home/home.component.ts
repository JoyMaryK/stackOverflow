import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../Interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as actions from '../Store/actions/questionActions';
import { selectAllQuestions, selectQuestionAnswered, selectQuestionById } from '../Store/Selectors/selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HashPrefixPipe } from '../Pipes/hash-prefix.pipe';
import { BackgroundHighlightDirective } from '../directives/background-highlight.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule,BackgroundHighlightDirective,  HashPrefixPipe,  ],
  providers: [HashPrefixPipe],
  standalone: true
})
export class HomeComponent implements OnInit{

  constructor(private store:Store<AppState>){}

  questions$!:Question[]
 ngOnInit(): void {
    this.store.dispatch(actions.getAllQuestions()) 
    this.store.select(selectAllQuestions).subscribe(res=>{
      this.questions$ = res
    })
 }

  oneQ(qid:string){
    
 }
 all(){
  this.store.select(selectAllQuestions).subscribe(res=>{
    console.log(res);
    
    this.questions$ = res
  });
 }
 answered(){
  this.store.select(selectAllQuestions).subscribe(res=>{
    console.log(res);
    
    this.questions$ = res.filter(q=>q.answer_count>0)
    this.questions$.sort((a, b) => b.answer_count - a.answer_count);
  })

 }
 unanswered(){
  this.store.select(selectAllQuestions).subscribe(res=>{
    console.log(res);
    
    this.questions$ = res.filter(q=>q.answer_count<1)
  });
  
 }
}
