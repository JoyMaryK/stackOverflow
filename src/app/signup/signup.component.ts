import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as actions from '../Store/actions/userActions'
import { User } from '../Interfaces';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  form!:FormGroup
  matchingPWD!:string | null
  constructor(
    private fb: FormBuilder, private store:Store
  ) {}
  
  ngOnInit(): void {
    this.matchingPWD= null
    this.form = this.fb.group({
      username:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cpassword:['',[Validators.required]],
      
    });
  }

  matchValues(password: string, cpassword: string) {
   if (password===cpassword){
    this.matchingPWD= null
    return 
   }else
   { this.matchingPWD= "password missmatch"
  return}
  }


  signup() {
    if (this.form.invalid){
      console.log("invalid");
      return
    } else{
      this.matchValues( this.form.get('password')?.value,this.form.get('cpassword')?.value)
      if (!this.matchingPWD){
        console.log(this.form.value) 
        let newUser:User = {id:"theid", ...this.form.value}
        this.store.dispatch(actions.addUser({user:newUser}))   
      } else{
        console.log(this.matchingPWD);
        
      }
      
    }
  
}
}
