import { Injectable } from '@angular/core';
import * as actions from '../actions/userActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { OverallService } from 'src/app/Services/overall.service';
import { Route, Router } from '@angular/router';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private service: OverallService, private router:Router) {}
  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getAllUsers),
      mergeMap((action) =>
        this.service.getUsers().pipe(
          map((Users) => {
            console.log(Users);
            return actions.getUsersSuccess({ users:Users });
          }),
          catchError((error: any) => of(actions.getUsersFailure(error)))
        )
      )
    );
  });
  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.addUser),
      mergeMap((action) =>
        this.service.addUser(action.user).pipe(
          map((res) => {
            console.log(res);
            return actions.addUserSuccess({message:res });
          }),
          catchError((error: any) => of(actions.addUserFailure(error)))
        )
      )
    );
  });
  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.userLogin),
      mergeMap((action) =>
        this.service.loginUser(action.user).pipe(
          map((res) => {
            console.log(res);
            localStorage.setItem('token',res.token)
            localStorage.setItem('uid',res.uid)
            if(res.role==='user'){
              this.router.navigateByUrl('/home')
            } else{this.router.navigateByUrl('/admin-questions')}
            return actions.userLoginSuccess({response:res});
          }),
          catchError((error: any) => of(actions.userLoginFailure(error)))
        )
      )
    );
  });
  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.deleteUser),
      mergeMap((action) =>
        this.service.deleteUser(action.uid).pipe(
          map((message) => {
            console.log(message);
            return actions.deleteUserSuccess({ uid:action.uid, message });
          }),
          catchError((error: any) => of(actions.deleteUserFailure(error)))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.updateUser),
      mergeMap((action) =>
        this.service.updateUser(action.user).pipe(
          map((message) => {
            console.log(message);
            return actions.updateUserSuccess({  message });
          }),
          catchError((error: any) => of(actions.updateUserFailure(error)))
        )
      )
    );
  });

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getUser),
      mergeMap((action) =>
        this.service.getUser(localStorage.getItem('uid') as string).pipe(
          map((User) => {
            console.log(User);
            return actions.getUserSuccess({ user:User });
          }),
          catchError((error: any) => of(actions.getUserFailure(error)))
        )
      )
    );
  });
}