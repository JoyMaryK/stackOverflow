import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/Interfaces';
import { Store } from '@ngrx/store';
import { deleteUser, getAllUsers } from 'src/app/Store/actions/userActions';
import { selectAllUsers, selectUsers } from 'src/app/Store/Selectors/selectors';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit{
  users$!:Observable<User[]>
  
  
constructor(private store:Store<AppState>){}

  ngOnInit(): void {
     this.users$= this.store.select(selectAllUsers)
    // this.users$.subscribe(res=>{
    //   console.log(res)
      
    // })
    this.store.dispatch(getAllUsers())
  }

  delete(uid:string){
    this.store.dispatch(deleteUser({uid}))
  }
}
