import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question, ReturnedMessage, SuccessMessages, Tag, User, UserSignup } from '../Interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TagContentType } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class OverallService {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDA3ODRhZC0zZDQyLTQxMDQtYmRiNi0yNjc1NjlhZGM0NTAiLCJ1c2VybmFtZSI6ImpveW1hcnkiLCJlbWFpbCI6ImpveW1hcjg5NjJAZ21haWwuY29tIiwibG9jYXRpb24iOm51bGwsImFib3V0IjpudWxsLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM4MDU1OSwiZXhwIjoxNjg3NzQwNTU5fQ.QgNrI_HDgE_WHzgMfOfI54JV93XACd8C0MSnw36NzP0"
    
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
      headers:new HttpHeaders().set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDA3ODRhZC0zZDQyLTQxMDQtYmRiNi0yNjc1NjlhZGM0NTAiLCJ1c2VybmFtZSI6ImpveW1hcnkiLCJlbWFpbCI6ImpveW1hcjg5NjJAZ21haWwuY29tIiwibG9jYXRpb24iOm51bGwsImFib3V0IjpudWxsLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM4MDU1OSwiZXhwIjoxNjg3NzQwNTU5fQ.QgNrI_HDgE_WHzgMfOfI54JV93XACd8C0MSnw36NzP0")})
    
  }

  //question related
  getQuestions():Observable<Question[]> {
    return this.http.get<Question[]>(`http://localhost:4000/questions`,{
      headers:new HttpHeaders().set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDA3ODRhZC0zZDQyLTQxMDQtYmRiNi0yNjc1NjlhZGM0NTAiLCJ1c2VybmFtZSI6ImpveW1hcnkiLCJlbWFpbCI6ImpveW1hcjg5NjJAZ21haWwuY29tIiwibG9jYXRpb24iOm51bGwsImFib3V0IjpudWxsLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM4MDU1OSwiZXhwIjoxNjg3NzQwNTU5fQ.QgNrI_HDgE_WHzgMfOfI54JV93XACd8C0MSnw36NzP0")})
}

getQuestionById(qid:string):Observable<Question[]> {
  console.log("in service",qid)
  return this.http.get<Question[]>(`http://localhost:4000/questions/question/${qid}`,{
    headers:new HttpHeaders().set('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDA3ODRhZC0zZDQyLTQxMDQtYmRiNi0yNjc1NjlhZGM0NTAiLCJ1c2VybmFtZSI6ImpveW1hcnkiLCJlbWFpbCI6ImpveW1hcjg5NjJAZ21haWwuY29tIiwibG9jYXRpb24iOm51bGwsImFib3V0IjpudWxsLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM4MDU1OSwiZXhwIjoxNjg3NzQwNTU5fQ.QgNrI_HDgE_WHzgMfOfI54JV93XACd8C0MSnw36NzP0")})
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

//tags related
getTags():Observable<Tag[]> {
  return this.http.get<Tag[]>(`http://localhost:4000/tags`,{
    headers:new HttpHeaders().set('token',this.token)})
}


}
