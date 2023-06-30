import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginSuccess, Question,  SuccessMessages, Tag, User, UserLogin, UserSignup } from '../Interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TagContentType } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class OverallService {
    token = localStorage.getItem('token') as string
    
  
  constructor( private http:HttpClient) { }

  //user related 
  addUser(user:UserSignup):Observable<SuccessMessages> {
    return this.http.post<SuccessMessages>(
      `http://localhost:4000/users`,
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
    return this.http.get<Question[]>(`http://localhost:4000/questions/1`,{
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
updateQuestion(qid:string,updatedQuestion:Question):Observable<SuccessMessages> {
  return this.http.put<SuccessMessages>(
    `http://localhost:4000/questions/question/${qid}`,
    updatedQuestion,
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

getQuestionsByTag(tagname:string):Observable<Question[]>{
    return this.http.get<Question[]>(`http://localhost:4000/questions/tag/${tagname}`,{
    headers:new HttpHeaders().set('token',this.token)})
}

 searchQuestion(searchStr:string){
  return this.http.get<Question[]>(`http://localhost:4000/questions/search/${searchStr}`,{
    headers:new HttpHeaders().set('token',this.token)})
 }
//tags related
getTags():Observable<Tag[]> {
  return this.http.get<Tag[]>(`http://localhost:4000/tags`,{
    headers:new HttpHeaders().set('token',this.token)})
}


}
