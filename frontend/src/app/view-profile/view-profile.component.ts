import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectQuestions, selectUser, selectUserQuestions } from '../Store/Selectors/selectors';
import { Question, User } from '../Interfaces';
import { Observable } from 'rxjs';
import { getAllUserQuestions } from '../Store/actions/questionActions';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit{
  user!:User
  questions$!:Observable<Question[]>
  constructor(private store:Store<AppState>){}
  ngOnInit(): void {
      this.store.select(selectUser).subscribe(
        res=>{
          this.user = res as User
        }
      )

      this.questions$= this.store.select(selectUserQuestions) 

  }

}
