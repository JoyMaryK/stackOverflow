import { Injectable } from '@angular/core';
import * as actions from '../actions/questionActions';
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
  addQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.addQuestion),
      mergeMap((action) =>
        this.service.addQuestion(action.newQuestion).pipe(
          map((message) => {
            console.log(message);
            return actions.addQuestionSuccess({ message: message });
          }),
          catchError((error: any) => of(actions.addQuestionFailure(error)))
        )
      )
    );
  });
  getOneQuestion$ = createEffect(() =>
  this.actions$.pipe(
    ofType(actions.getOneQuestion),
    exhaustMap((action) =>
      this.service.getQuestionById(action.qid).pipe(
        map((question) => {
          console.log(question);
                  
          return actions.getOneQuestionSuccess({ question});
        }),
        catchError((error: any) => of(actions.getOneQuestionFailure(error)))
      )
    )
  )
);
getUserQuestions$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(actions.getAllUserQuestions),
    mergeMap((action) =>
      this.service.getQuestionsByUserId(action.uid).pipe(
        map((questions) => {
          console.log(questions);
          return actions.getUserQuestionsSuccess({ questions });
        }),
        catchError((error: any) => of(actions.getUserQuestionsFailure(error)))
      )
    )
  );
});
deleteQuestion$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(actions.deleteQuestion),
    mergeMap((action) =>
      this.service.deleteQuestion(action.qid).pipe(
        map((message) => {
          console.log(message);
          return actions.deleteQuestionSuccess({ message });
        }),
        catchError((error: any) => of(actions.deleteQuestionFailure(error)))
      )
    )
  );
});

}