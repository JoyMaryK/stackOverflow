import { Injectable } from '@angular/core';
import * as actions from '../actions/votesActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError,  map, mergeMap, of, withLatestFrom } from 'rxjs';
import { VotesService } from 'src/app/Services/votes.service';
import { Store } from '@ngrx/store';
import {  Router } from '@angular/router';
import { selectQuestion, selectQuestionById } from '../Selectors/selectors';
import { Question } from 'src/app/Interfaces';

@Injectable()
export class VotesEffects {
  constructor(private actions$: Actions, private service: VotesService, private store:Store, private router:Router) {}

  upvote$ = createEffect(() => {
    
    return this.actions$.pipe(
      ofType(actions.upvote),
      
      mergeMap((action) =>
      
        this.service.upvote(action.aid).pipe(
          map((msg) => {
            console.log(msg);
            return actions.upvoteSuccess({message:msg });
          }),
          catchError((error: any) => of(actions.upvoteFailure(error)))
        )
      ),
     
      // tap((action) => this.store.dispatch(actions.getAllAnswers({ qid: })))
    );
  });
  downvote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.downvote),
      mergeMap((action) =>
        this.service.downvote(action.aid).pipe(
          map((msg) => {
            console.log(msg);
            return actions.downvoteSuccess({message:msg });
          }),
          catchError((error: any) => of(actions.downvoteFailure(error)))
        )
      ),
    //   tap((action) => this.store.dispatch(actions.getAllAnswers({ qid: q_id })))
    );
  });
}


