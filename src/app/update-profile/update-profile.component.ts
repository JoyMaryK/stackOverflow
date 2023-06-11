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
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  form!:FormGroup
  invalid!: string | null
  constructor(
    private fb: FormBuilder,
    private store:Store<AppState>
  ) {}

  ngOnInit(): void {
  
    this.form = this.fb.group({
      
      username: ['Joy', [Validators.required]],
      email: ['joy@gmail.com', [Validators.required]],
      location: ['Nyeri', [Validators.required]],
      about: ['About Me?', [Validators.required]],
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
     
    }

  }
}
