import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginSuccess, Question,  SuccessMessages, Tag, User, UserLogin, UserSignup } from '../Interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TagContentType } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class OverallService {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1YTg5ODU1Zi0xNWExLTQwMDctYTRiYi1kNDFkOTQ5NjkzMWUiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95bWFyeUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6bnVsbCwiYWJvdXQiOm51bGwsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3NzYwNzUxLCJleHAiOjE2ODgxMjA3NTF9.DU2_BO6cM6qqSOQA3PxGJlVcLZtU5pYO6jeHYs7rjrg"
  
  constructor( private http:HttpClient) { }

  //user related 
  addUser(user:UserSignup):Observable<SuccessMessages> {
    return this.http.post<SuccessMessages>(
      `http://localhost:4000/users/login`,
         user
    );
}

loginUser(user:UserLogin):Observable<LoginSuccess> {
  return this.http.post<LoginSuccess>(
    `http://localhost:4000/users/login`,
       user
  );
}
getUser(uid:string):Observable<User>{
  return this.http.get<User>(`http://localhost:4000/users/${uid}`,{
    headers:new HttpHeaders().set('token',this.token)})
  
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

  updateUser(userUpdate:User):Observable<SuccessMessages> {
    return this.http.put<SuccessMessages>(
      `http://localhost:4000/users/update`,
      userUpdate,
        {headers: new HttpHeaders().set('token', this.token)},
      
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
