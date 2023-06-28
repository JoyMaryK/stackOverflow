import { Injectable } from '@angular/core';
import * as actions from '../actions/answersActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, switchMap ,tap} from 'rxjs';
import { AnswersService } from 'src/app/Services/answers.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class AnswersEffects {
  constructor(private actions$: Actions, private service: AnswersService, private store:Store<AppState>) {}

  addAnswer$ = createEffect(() => {
    let q_id:string
    return this.actions$.pipe(
      ofType(actions.addAnswer),
      mergeMap((action) =>
    
        this.service.addAnswer(action.newAnswer, action.qid).pipe(
          map((answers) => {
             q_id = action.qid
            console.log(answers);
            return  actions.addAnswerSuccess({ message:'success' });
          }),
          catchError((error: any) => of(actions.addAnswerFailure(error)))
        )
      ),
      tap(() => this.store.dispatch(actions.getAllAnswers({ qid: q_id })))
    );
  });
  getAnswers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getAllAnswers),
      mergeMap((action) =>
        this.service.getAnswers(action.qid).pipe(
          map((answers) => {
            console.log(answers);
            return actions.getAnswersSuccess({ answers });
          }),
          catchError((error: any) => of(actions.getAnswersFailure(error)))
        )
      )
    );
  });
}