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
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1YTg5ODU1Zi0xNWExLTQwMDctYTRiYi1kNDFkOTQ5NjkzMWUiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95bWFyeUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6bnVsbCwiYWJvdXQiOm51bGwsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3NjkwMTY5LCJleHAiOjE2ODgwNTAxNjl9.u57Ru9R0SRx7UjiXqnJ39a8O6LWJ51I6fEzgQzBufBQ"
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
  
}
