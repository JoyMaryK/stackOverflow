import { Injectable } from '@angular/core';
import { Answer, SuccessMessages } from '../Interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  token = localStorage.getItem('token') as string
  constructor( private http:HttpClient,
    private store:Store<AppState>,) { }

  addAnswer(newAnswer:Answer, qid:string):Observable<SuccessMessages> {
    return this.http.post<SuccessMessages>(
      `http://localhost:4000/answers/${qid}`,
      newAnswer,
      {
        headers: new HttpHeaders().set('token', this.token),
      }
    );
  }

  getAnswers(qid:string):Observable<Answer[]> {
    return this.http.get<Answer[]>(`http://localhost:4000/answers/${qid}`,{
      headers:new HttpHeaders().set('token',this.token)})
}

markPreferred(aid:string):Observable<SuccessMessages>{
  return this.http.post<SuccessMessages>(`http://localhost:4000/answers/prefer/${aid}`,{},{
    headers:new HttpHeaders().set('token',this.token)})
}
  
}
