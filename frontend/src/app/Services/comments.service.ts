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
  token = localStorage.getItem('token') as string
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
