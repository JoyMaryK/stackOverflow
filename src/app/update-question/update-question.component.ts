import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Tag } from '../Interfaces';
import { Store } from '@ngrx/store';
import { getAllTags } from '../Store/actions/tagsActions';
import { selectAllTags } from '../Store/Selectors/selectors';
import { AppState } from '../app.state';
import { RouterModule } from '@angular/router';

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
  
  constructor(
   private store:Store<AppState>,
   private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
     this.msg=null
    this.form = this.fb.group({
      title: ['How do I center a div?', [Validators.required]],
      question: ['I need help in centering a div', [Validators.required, Validators.minLength(1)]],
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
     
    }

  }
}
