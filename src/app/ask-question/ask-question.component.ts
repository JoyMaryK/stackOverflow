import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms'
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { addQuestion } from '../Store/actions/questionActions';
import { Question } from '../Interfaces';

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
  constructor(
    private fb: FormBuilder,
    private store:Store<AppState>
  ) {}

  ngOnInit(): void {
  
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      question: ['', [Validators.required]],
      tags: ['', [Validators.required]],
    });
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
    }

  }
}
