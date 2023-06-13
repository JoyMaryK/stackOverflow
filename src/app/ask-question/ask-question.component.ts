import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms'
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { addQuestion, addQuestionSuccess } from '../Store/actions/questionActions';
import { Question, Tag } from '../Interfaces';
import { Observable } from 'rxjs';
import { selectAllTags } from '../Store/Selectors/selectors';
import { getAllTags } from '../Store/actions/tagsActions';

@Component({
  selector: 'app-ask-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent {
  form!:FormGroup
  invalid!: string | null
  msg!: string | null
  tags$!:Observable<Tag[]>
  
  constructor(
    private fb: FormBuilder,
    private store:Store<AppState>
  ) {}

  ngOnInit(): void {
     this.msg=null
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      question: ['', [Validators.required, Validators.minLength(1)]],
      tags: [[],Validators.required]
    });
    this.store.dispatch(getAllTags())
    this.tags$=this.store.select(selectAllTags)
  }

  onSubmit(){
    if (this.form.invalid){
      this.invalid="please ensure all fields are correct"
      console.log("invalid");
      return
    }else{
      this.invalid=null
      console.log(this.form.value)
      let newq:Question = {...this.form.value, id:"2", user_id:'2',date:'12/3/22'}
      this.store.dispatch(addQuestion({newQuestion:newq}))
      this.msg='posted successfully'
      this.form.reset()
    }

  }
}
