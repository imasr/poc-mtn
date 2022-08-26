import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../shared/services/api.service';
import { AddUsers, GetUsersFailed, UserActionTypes } from './app.action';

@Injectable()
export class AppEffects {
  constructor(private apiService: ApiService, private actions$: Actions) {}

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActionTypes.GETUSERS),
      switchMap(() => {
        return this.apiService.get(`https://reqres.in/api/users`).pipe(
          map((resp: any) => {
            if (resp.data) {
              return new AddUsers(resp.data);
            } else {
              return new GetUsersFailed(resp);
            }
          }),
          catchError((err) => {
            return of(new GetUsersFailed(err));
          })
        );
      })
    );
  });
}
