import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { userLogin } from '../Store/actions/userActions';
import { selectLoginError, selectLoginSuccess } from '../Store/Selectors/selectors';
import { ErrorComponent } from '../error/error.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,ErrorComponent ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  msg!:string | null
  showFP=false
  constructor(
    private fb: FormBuilder,
    private router:Router,
    private store:Store<AppState>
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

 logIn() {
    if (this.form.invalid){
      console.log("invalid");
      return
    }
  console.log(this.form.value)

   this.store.dispatch(userLogin({user:this.form.value}))
   this.store.select(selectLoginSuccess).subscribe(res=>{
    this.msg=res?.message as string
   })
   this.store.select(selectLoginError).subscribe(res=>{
    console.log(res);
    
    this.msg=res as string
   })
}

 
}

