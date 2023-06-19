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
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  invalid!:string|null
  form!:FormGroup
  matchingPWD!:string | null
  constructor(
    private fb: FormBuilder, private store:Store, private router:Router
  ) {}
  
  ngOnInit(): void {
    this.matchingPWD= null
    this.form = this.fb.group({
      username:['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
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
      this.invalid="confirm all fields are valid"
      return
    } else{
      this.matchValues( this.form.get('password')?.value,this.form.get('cpassword')?.value)
      if (!this.matchingPWD){
        console.log(this.form.value) 
        let newUser:User = {id:"theid", ...this.form.value}
        this.store.dispatch(actions.addUser({user:newUser}))  
        this.router.navigateByUrl('/login')
      } else{
        console.log(this.matchingPWD);
        
      }
      
    }
  
}
}
