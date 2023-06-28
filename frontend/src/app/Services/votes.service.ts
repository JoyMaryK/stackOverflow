import { Injectable } from '@angular/core';
import { SuccessMessages } from '../Interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1YTg5ODU1Zi0xNWExLTQwMDctYTRiYi1kNDFkOTQ5NjkzMWUiLCJ1c2VybmFtZSI6ImpveSIsImVtYWlsIjoiam95bWFyeUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6bnVsbCwiYWJvdXQiOm51bGwsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg3OTM4MTgwLCJleHAiOjE2ODgyOTgxODB9.DkN7emjM-xtWnYfADm62_aXwLUCTyOylQS0MI_WCdlc"
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
