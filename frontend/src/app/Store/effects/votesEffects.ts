import { Injectable } from '@angular/core';
import * as actions from '../actions/votesActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { VotesService } from 'src/app/Services/votes.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { selectQuestion, selectQuestionById } from '../Selectors/selectors';
import { Question } from 'src/app/Interfaces';
import { getAllAnswers } from '../actions/answersActions';
import { RouterNavigationAction, ROUTER_NAVIGATION } from '@ngrx/router-store';

@Injectable()
export class VotesEffects {
  constructor(
    private actions$: Actions,
    private service: VotesService,
    private store: Store,
    private router: Router,
    private route:ActivatedRoute
  ) {}
   qid!: string | null; 

   myEffect$ = createEffect(() =>
   this.actions$.pipe(
     ofType<RouterNavigationAction>(ROUTER_NAVIGATION),
     tap((action) => {
       const { params } = action.payload.routerState.root.firstChild?.params?.["id"] || {};
       this.qid = params ? params['id'] : null; 
       console.log(this.qid);
       console.log(params['id']);
     }),
     
   )
 );
  upvote$ = createEffect(() => {
    
    return this.actions$.pipe(
      ofType(actions.upvote),

      mergeMap((action) =>
        this.service.upvote(action.aid).pipe(
          map((msg) => {
           console.log(this.qid);
           
            console.log(msg);
            return actions.upvoteSuccess({ message: msg });
          }),
          catchError((error: any) => of(actions.upvoteFailure(error)))
        )
      ),

    // tap(() => this.store.dispatch(getAllAnswers({ qid:this.qid as string})))
    );
  });
  downvote$ = createEffect(() => {
    
    return this.actions$.pipe(
      ofType(actions.downvote),
      mergeMap((action) =>
        this.service.downvote(action.aid).pipe(
          map((msg) => {
            
            console.log(msg);
            console.log(this.qid);
            
            return actions.downvoteSuccess({ message: msg });
          }),
          catchError((error: any) => of(actions.downvoteFailure(error)))
        )
      ),
   //    tap(() => this.store.dispatch(getAllAnswers({ qid : this.qid as string})))
    );
  });
}
