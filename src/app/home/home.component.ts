import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../Interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as actions from '../Store/actions/questionActions';
import { selectAllQuestions } from '../Store/Selectors/selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HashPrefixPipe } from '../Pipes/hash-prefix.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule, ],
  providers: [HashPrefixPipe],
  standalone: true
})
export class HomeComponent implements OnInit{

  constructor(private store:Store<AppState>){}

  questions$ = this.store.select(selectAllQuestions)
 ngOnInit(): void {
    this.store.dispatch(actions.getAllQuestions()) 
    this.questions$ = this.store.select(selectAllQuestions)
 }
}
