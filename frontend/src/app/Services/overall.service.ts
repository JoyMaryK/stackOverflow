import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question, ReturnedMessage, SuccessMessages, Tag, User, UserSignup } from '../Interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TagContentType } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class OverallService {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1YTg5ODU1Zi0xNWExLTQwMDctYTRiYi1kNDFkOTQ5NjkzMWUiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95bWFyeUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6bnVsbCwiYWJvdXQiOm51bGwsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3NzYwNzUxLCJleHAiOjE2ODgxMjA3NTF9.DU2_BO6cM6qqSOQA3PxGJlVcLZtU5pYO6jeHYs7rjrg"
    
    tags:Tag[]=[{ id:'1',tagname:"Javascript", description:'its just vanilla'}, 
    { id:'2',tagname:"Java", description:'stable and versatile'},
    { id:'3',tagname:"PHP", description:'where do I begin?'}]
  constructor( private http:HttpClient) { }

  //user related 
  addUser(user:UserSignup):Observable<Tag[]> {
    let newUser = {id:"sth",...user}
    return of(this.tags)
}
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`http://localhost:4000/users`,{
      headers:new HttpHeaders().set('token',this.token)})
    
  }
  deleteUser(uid:string):Observable<SuccessMessages> {
    return this.http.delete<SuccessMessages>(
      `http://localhost:4000/users/${uid}`,
      {
        headers: new HttpHeaders().set('token', this.token),
      }
    );
  }

  //question related
  getQuestions():Observable<Question[]> {
    return this.http.get<Question[]>(`http://localhost:4000/questions`,{
      headers:new HttpHeaders().set('token',this.token)})
}

getQuestionById(qid:string):Observable<Question> {
  
  return this.http.get<Question>(`http://localhost:4000/questions/question/${qid}`,{
    headers:new HttpHeaders().set('token',this.token)})
}

getQuestionsByUserId(uid:string):Observable<Question[]> {

  return this.http.get<Question[]>(`http://localhost:4000/questions/user/${uid}`,{
    headers:new HttpHeaders().set('token',this.token)})
}

addQuestion(newQuestion:Question):Observable<SuccessMessages> {
  return this.http.post<SuccessMessages>(
    `http://localhost:4000/questions`,
    newQuestion,
    {
      headers: new HttpHeaders().set('token', this.token),
    }
  );
}

deleteQuestion(qid:string):Observable<SuccessMessages> {
  return this.http.delete<SuccessMessages>(
    `http://localhost:4000/questions/delete/${qid}`,
    {
      headers: new HttpHeaders().set('token', this.token),
    }
  );
}

//tags related
getTags():Observable<Tag[]> {
  return this.http.get<Tag[]>(`http://localhost:4000/tags`,{
    headers:new HttpHeaders().set('token',this.token)})
}


}
