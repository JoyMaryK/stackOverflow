import { Injectable } from '@angular/core';
import * as actions from '../actions/userActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { OverallService } from 'src/app/Services/overall.service';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private service: OverallService) {}
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
            return actions.addUserSuccess({message:"success" });
          }),
          catchError((error: any) => of(actions.addUserFailure(error)))
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
}