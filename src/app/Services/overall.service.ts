import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question, ReturnedMessage, Tag, User, UserSignup } from '../Interfaces';



@Injectable({
  providedIn: 'root'
})
export class OverallService {
  questions:Question[] = [{id:"1",
  title:"question title",
  tag:"tag",
  description:"desc",
  user_id:"u_id", answersNo:2,
  date:"12/1/22"}]

  users:User[]=[{ id:'1',
    username:"Joy",
    email:"joy@gmail.com",
    password:"password"}]
    
    tags:Tag[]=[{ id:'1',
    tagName:"Joy", description:'a really good kid'
  }]
  constructor() { }

  //user related 
  addUser(user:UserSignup):Observable<User[]> {
    let newUser = {id:"sth",...user}
    this.users.push(newUser)
    return of(this.users)
}
  getUsers():Observable<User[]>{
    return of(this.users)
  }

  //question related
  getQuestions():Observable<Question[]> {
    return of(this.questions)
}

addQuestion(newQuestion:Question):Observable<Question[]> {
  // console.log(newQuestion);
  
  // this.questions.push(newQuestion)
  this.questions = [...this.questions, newQuestion]
  return of(this.questions)
}

//tags related
getTags():Observable<Tag[]> {
  return of(this.tags)
}

}
