import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question } from '../Interfaces';



@Injectable({
  providedIn: 'root'
})
export class OverallService {

  constructor() { }

  getQuestions():Observable<Question[]> {
    const questions = [{id:"1",
      title:"question title",
      description:"desc",
      user_id:"u_id", answersNo:2,
      date:"12/1/22"}]
    return of(questions)
}
}
