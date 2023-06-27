import { Injectable } from '@angular/core';
import { SuccessMessages } from '../Interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1YTg5ODU1Zi0xNWExLTQwMDctYTRiYi1kNDFkOTQ5NjkzMWUiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95bWFyeUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6bnVsbCwiYWJvdXQiOm51bGwsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3NzYwNzUxLCJleHAiOjE2ODgxMjA3NTF9.DU2_BO6cM6qqSOQA3PxGJlVcLZtU5pYO6jeHYs7rjrg"
  constructor( private http:HttpClient,
    private store:Store<AppState>,) { }

  upvote(aid:string):Observable<SuccessMessages> {
    return this.http.post<SuccessMessages>(
      `http://localhost:4000/votes/upvote/${aid}`,
      {
        headers: new HttpHeaders().set('token', this.token),
      }
    );
  }

  getAnswers(aid:string):Observable<SuccessMessages> {
    return this.http.get<SuccessMessages>(`http://localhost:4000/votes/downvote/${aid}`,{
      headers:new HttpHeaders().set('token',this.token)})
}
}
