import { Injectable } from '@angular/core';
import { Comment, SuccessMessages } from '../Interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1YTg5ODU1Zi0xNWExLTQwMDctYTRiYi1kNDFkOTQ5NjkzMWUiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95bWFyeUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6bnVsbCwiYWJvdXQiOm51bGwsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3NzYwNzUxLCJleHAiOjE2ODgxMjA3NTF9.DU2_BO6cM6qqSOQA3PxGJlVcLZtU5pYO6jeHYs7rjrg"
  constructor( private http:HttpClient,
    private store:Store<AppState>,) { }

  addComment(newComment:Comment, aid:string):Observable<SuccessMessages> {
    return this.http.post<SuccessMessages>(
      `http://localhost:4000/comments/${aid}`,
      newComment,
      {
        headers: new HttpHeaders().set('token', this.token),
      }
    );
  }

  getComments(aid:string):Observable<Comment[]> {
    return this.http.get<Comment[]>(`http://localhost:4000/comments/${aid}`,{
      headers:new HttpHeaders().set('token',this.token)})
}
}
