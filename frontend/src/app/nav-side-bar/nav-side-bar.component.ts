import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { searchQuestion } from '../Store/actions/questionActions';
import { selectAllQuestions, selectQuestionSearched } from '../Store/Selectors/selectors';
import { Question } from '../Interfaces';


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
  questions!:Question[] | null
  constructor(private router:Router, private store:Store<AppState>){}
  onSubmit(form:NgForm){
    if (form.valid) {
      this.invalid=null
      console.log(form.value);

       this.store.dispatch(searchQuestion(form.value))
       this.store.select(selectQuestionSearched).subscribe(res=>{
        console.log(res);
        this.questions=res
       })
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
  logout(){
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
  close(){
    this.questions= null
  }
}
