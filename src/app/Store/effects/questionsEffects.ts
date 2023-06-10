import { Injectable } from '@angular/core';
import * as actions from '../actions/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { OverallService } from 'src/app/Services/overall.service';

@Injectable()
export class QuestionsEffects {
  constructor(private actions$: Actions, private service: OverallService) {}

  getQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getAllQuestions),
      mergeMap((action) =>
        this.service.getQuestions().pipe(
          map((questions) => {
            console.log(questions);
            return actions.getQuestionsSuccess({ questions });
          }),
          catchError((error: any) => of(actions.getQuestionsFailure(error)))
        )
      )
    );
  });
}