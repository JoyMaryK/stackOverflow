import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Question, Tag } from '../Interfaces';
import { Store } from '@ngrx/store';
import { getAllTags } from '../Store/actions/tagsActions';
import { selectAllTags, selectQuestion, selectQuestionById } from '../Store/Selectors/selectors';
import { AppState } from '../app.state';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { getOneQuestion, updateQuestion } from '../Store/actions/questionActions';

@Component({
  selector: 'app-update-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent {
  form!:FormGroup
  invalid!: string | null
  msg!: string | null
  tags$!:Observable<Tag[]>
  question!:Question
  constructor(
   private store:Store<AppState>,
   private fb: FormBuilder,
   private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
     this.msg=null
     let qid = this.route.snapshot.params['id'] 
     this.store.dispatch(getOneQuestion({qid:qid}))
     this.store.select(selectQuestionById('')).subscribe(
      res=>{
        console.log(res);
        
        this.question = res as Question
        this.initializeForm()
      }
    )
    
    
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: [this.question.title, [Validators.required]],
      body: [this.question.body, [Validators.required, Validators.minLength(1)]],
      tags: [this.question.tag_names, Validators.required]
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
      let qid = this.route.snapshot.params['id'] 
      let tagsValue:string[]=[""]
      
      if(this.form.get('tags')){
    tagsValue = this.form.get('tags')!.value.split(",")}
    this.store.dispatch(updateQuestion({qid,updatedQuestion: {...this.form.value,tags:tagsValue} }))
   
    
    }

  }
}
