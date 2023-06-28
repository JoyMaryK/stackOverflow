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


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
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
if(this.form.get('email')?.value ==='admin@gmail.com'){
  this.router.navigateByUrl('/admin-questions')
} else{
   this.store.dispatch(userLogin({user:this.form.value}))
 
}

 
}
}
