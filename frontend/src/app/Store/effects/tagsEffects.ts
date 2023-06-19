import { Injectable } from '@angular/core';
import * as actions from '../actions/tagsActions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from 'rxjs';
import { OverallService } from 'src/app/Services/overall.service';

@Injectable()
export class TagsEffects {
  constructor(private actions$: Actions, private service: OverallService) {}

  getQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.getAllTags),
      mergeMap((action) =>
        this.service.getTags().pipe(
          map((tags) => {
            console.log(tags);
            return actions.getTagsSuccess({ Tags:tags });
          }),
          catchError((error: any) => of(actions.getTagsFailure(error)))
        )
      )
    );
  });
}