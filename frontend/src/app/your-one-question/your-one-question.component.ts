import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { addAnswer } from '../Store/actions/answersActions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Answer, Comment, Question } from '../Interfaces';
import { Observable } from 'rxjs';
import {
  selectAllAnswers,
  selectAllComments,
  selectQuestionById,
} from '../Store/Selectors/selectors';
import * as answersActions from '../Store/actions/answersActions';
import * as commentsActions from '../Store/actions/commentsActions';
import { getOneQuestion } from '../Store/actions/questionActions';
import { downvote, upvote } from '../Store/actions/votesActions';


@Component({
  selector: 'app-your-one-question',
  templateUrl: './your-one-question.component.html',
  styleUrls: ['./your-one-question.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
  standalone:true
})
export class YourOneQuestionComponent {
  showComment = false
  selectedOption='';
  invalid: string | null = null;
  formData = {
    answer: '',
  };
  qid=''
  answers$!: Observable<Answer[]>;
  question:Question | null = null;
  comments$!: Observable<Comment[]>;
  constructor(private store: Store<AppState>,private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['id']
    this.store.dispatch(getOneQuestion({qid:this.qid}))
    this.store.select(selectQuestionById(this.qid)).subscribe(
     res=>{
      this.question=res
      console.log(this.question);
      
     }
    )

    this.store.dispatch(answersActions.getAllAnswers({qid:this.qid}));
    this.answers$ = this.store.select(selectAllAnswers);

    

  }
  

  onSub(form: NgForm, aid:string) {
    if (form.valid) {
      this.invalid = null;
      console.log(form.value);
      this.store.dispatch(commentsActions.addComment({newComment:form.value, aid:aid}))
      form.reset();
    } else {
      this.invalid = 'invalid input';
    }
  }
  getComment(aid:string){
    console.log(aid);
    
    this.showComment = !this.showComment
    if(this.showComment){
    this.store.dispatch(commentsActions.getAllComments({aid:aid}))
    this.comments$ = this.store.select(selectAllComments)
    }
  }
  upvote(aid:string){
    this.store.dispatch(upvote({aid:aid}))
  }
  downvote(aid:string){
    this.store.dispatch(downvote({aid}))
  }

  markPreferred(): void {
  
    if (this.selectedOption) {
      this.store.dispatch(answersActions.markPreferred({aid:this.selectedOption, qid:this.qid}))    
    }
     

  }
  onSubmit() {
    console.log(this.formData);
    let newA: Answer = {
      ...this.formData,
      username: '',
      aid: '',
      uid:'',
      isPrefered: false,
      vote_count: 0,
    };
     if(this.formData.answer= ''){
      this.invalid="invalid"
      return 
     }
    this.store.dispatch(addAnswer({ newAnswer: newA ,qid:this.qid}));
  }

}
    
  

