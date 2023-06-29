import { Injectable } from '@angular/core';
import { SuccessMessages } from '../Interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  token = localStorage.getItem('token') as string
  constructor( private http:HttpClient) { }

  upvote(aid:string):Observable<SuccessMessages> {      
    let header = new HttpHeaders()
    header= header.append('anx', 'gsdfhjkfdsksfd')        
    return this.http.post<SuccessMessages>(`http://localhost:4000/votes/upvote/${aid}`,{},{headers:new HttpHeaders().append('token', this.token)})
  }

  downvote(aid:string):Observable<SuccessMessages> {
    console.log(aid);
    
   return this.http.post<SuccessMessages>(
     `http://localhost:4000/votes/downvote/${aid}`,{},
     {
       headers: new HttpHeaders().set('token', this.token)
     }
   );
 }
 
}
