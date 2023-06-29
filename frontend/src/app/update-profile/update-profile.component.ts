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
import { Question, User } from '../Interfaces';
import { RouterModule } from '@angular/router';
import { getUser, updateUser } from '../Store/actions/userActions';
import { selectUser } from '../Store/Selectors/selectors';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  form!:FormGroup
  invalid!: string | null
  user!:User  
  constructor(
    private fb: FormBuilder,
    private store:Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getUser())
    this.store.select(selectUser).subscribe(
      res=>{
        this.user = res as User
        this.prePopulate()
      }
    )
    
  }
  prePopulate(){
    this.form = this.fb.group({
      
      username: [this.user?.username, [Validators.required]],
      email: [this.user?.email, [Validators.required]],
      location: [this.user?.location, [Validators.required]],
      about: [this.user?.about, [Validators.required]],
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
      this.store.dispatch(updateUser({user:this.form.value}))
    }

  }
}
