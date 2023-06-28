import { Injectable } from '@angular/core';
import * as actions from '../actions/commentsActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap} from 'rxjs';
import { CommentsService } from 'src/app/Services/comments.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class CommentsEffects {
  constructor(private actions$: Actions, private service: CommentsService, private store:Store<AppState>) {}

  addComment$ = createEffect(() => {
    let a_id:string
    return this.actions$.pipe(
      ofType(actions.addComment),
      mergeMap((action) =>
         
        this.service.addComment(action.newComment, action.aid).pipe(
          map((comments) => {
            a_id = action.aid
            console.log(comments);
            return actions.addCommentSuccess({ message:'success' });
          }),
          catchError((error: any) => of(actions.addCommentFailure(error)))
        )
      ),
      tap(() => this.store.dispatch(actions.getAllComments({ aid: a_id })))
    );
  });
  getComment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getAllComments),
      mergeMap((action) =>
        this.service.getComments(action.aid).pipe(
          map((comments) => {
            console.log(comments);
            return actions.getCommentsSuccess({ comments });
          }),
          catchError((error: any) => of(actions.getCommentsFailure(error)))
        )
      )
    );
  });
}