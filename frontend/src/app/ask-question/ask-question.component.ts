import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl
} from '@angular/forms';
import { OnInit} from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { addQuestion} from '../Store/actions/questionActions';
import { Question, Tag } from '../Interfaces';
import { Observable } from 'rxjs';
import { selectAddQuestionError, selectAddQuestionSuccess, selectAllTags } from '../Store/Selectors/selectors';
import { getAllTags } from '../Store/actions/tagsActions';
import { ActivatedRoute } from '@angular/router';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-ask-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorComponent],
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  form!:FormGroup
  invalid!: string | null
  msg!: string | null
  tags$!:Observable<Tag[]>
  
  constructor(
    private fb: FormBuilder,
    private store:Store<AppState>,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
     this.msg=null
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required, Validators.minLength(1)]],
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

      let tagsValue:string[]=[""]
      
        if(this.form.get('tags')){
      tagsValue = this.form.get('tags')!.value.split(",")}
      this.store.dispatch(addQuestion({newQuestion: {...this.form.value,tags:tagsValue} }))
      this.store.select(selectAddQuestionSuccess).subscribe(res=>{
        console.log(res?.message);
        
        this.msg = res?.message as string
      })
      this.store.select(selectAddQuestionError).subscribe(res=>{
        console.log(res);
        
        this.msg = res as string
      })
      
      this.form.reset()
    }

  }
}
