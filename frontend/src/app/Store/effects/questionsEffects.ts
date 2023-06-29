import { Injectable } from '@angular/core';
import * as actions from '../actions/questionActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { OverallService } from 'src/app/Services/overall.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class QuestionsEffects {
  constructor(private actions$: Actions, private service: OverallService, private store:Store<AppState>,private router:Router) {}

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
    ),
    tap(() => this.store.dispatch(actions.getAllUserQuestions({uid:localStorage.getItem("uid") as string})))
  );
});

deleteQuestionAdmin$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(actions.deleteQuestionAdmin),
    mergeMap((action) =>
      this.service.deleteQuestion(action.qid).pipe(
        map((message) => {
          console.log(message);
          return actions.deleteQuestionSuccess({ message });
        }),
        catchError((error: any) => of(actions.deleteQuestionFailure(error)))
      )
    ),
    tap(() => this.store.dispatch(actions.getAllQuestions()))
  );
});

updateQuestion$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(actions.updateQuestion),
    mergeMap((action) =>
      this.service.updateQuestion(action.qid,action.updatedQuestion).pipe(
        map((message) => {
          console.log(message);
          return actions.updateQuestionSuccess({ message: message });
        }),
        catchError((error: any) => of(actions.updateQuestionFailure(error)))
      )
    )
  );
});

getQuestionsByTags$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(actions.getQuestionsByTags),
    mergeMap((action) =>
      this.service.getQuestionsByTag(action.tagname).pipe(
        map((questions) => {
          console.log(questions);
          this.router.navigateByUrl('/home/question/tag/:id')
          return actions.getUserQuestionsSuccess({ questions });
        }),
        catchError((error: any) => of(actions.getQuestionsByTagsFailure(error)))
      )
    )
  );
});

}