import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-nav-side-bar',
  standalone: true,
  imports: [CommonModule, RouterModule,  FormsModule ],
  templateUrl: './nav-side-bar.component.html',
  styleUrls: ['./nav-side-bar.component.css']
})
export class NavSideBarComponent {
  invalid:string | null=null
  invalid1:string | null=null
  onSubmit(form:NgForm){
    if (form.valid) {
      this.invalid=null
      console.log(form.value);
     
    }else{
      this.invalid="invalid input"
    }
  }
  onSub(form:NgForm){
    if (form.valid) {
      this.invalid1=null
      console.log(form.value);
     
    }else{
      this.invalid1="invalid input"
    }
  }
}
