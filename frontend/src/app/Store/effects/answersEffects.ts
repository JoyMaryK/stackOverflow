import { Injectable } from '@angular/core';
import * as actions from '../actions/answersActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { AnswersService } from 'src/app/Services/answers.service';

@Injectable()
export class AnswersEffects {
  constructor(private actions$: Actions, private service: AnswersService) {}

  addAnswer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.addAnswer),
      mergeMap((action) =>
        this.service.addAnswer(action.newAnswer, action.qid).pipe(
          map((answers) => {
            console.log(answers);
            return actions.addAnswerSuccess({ message:'success' });
          }),
          catchError((error: any) => of(actions.addAnswerFailure(error)))
        )
      )
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