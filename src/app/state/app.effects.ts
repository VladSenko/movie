import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { DataService } from "../data-service.service";
import * as appActions from "./app.actions";
import { map, switchMap, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { MovieResponse } from "../models/movie-response.model";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  @Effect()
  loadMovies$: Observable<Action> = this.actions$.pipe(
    ofType(appActions.AppActionTypes.LoadMovies),
    switchMap((action: appActions.LoadMovies) =>
      this.dataService
        .getMovies(action.payload.requestString, action.payload.pages)
        .pipe(
          map((response: MovieResponse) => {
            if (response.Response === 'True') {
              return new appActions.LoadMoviesSuccess(response);
            } else {
              return new appActions.LoadMoviesError(response.Error);
            }
          }),
          catchError((error: HttpErrorResponse) =>
            of(new appActions.LoadMoviesError(error.message))
          )
        )
    )
  );
}
