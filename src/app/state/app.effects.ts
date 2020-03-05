import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DataService } from '../data-service.service';
import * as appActions from './app.actions';
import { map, switchMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { MovieResponse } from '../models/movie-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CurrentMovie } from '../models/curent-movie.model';
import * as fromApp from './../state/app.reducer';

@Injectable()
export class AppEffects {
    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private store: Store<{ appState: fromApp.AppState }>
    ) {}

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
                            return new appActions.LoadMoviesError(
                                response.Error
                            );
                        }
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(new appActions.LoadMoviesError(error.message))
                    )
                )
        )
    );

    @Effect()
    loadCurrentMovie$: Observable<Action> = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadCurrentMovie),
        switchMap((action: appActions.LoadCurrentMovie) =>
            this.dataService.getMovieById(action.payload).pipe(
                map((response: any) => {
                    if (response.Response === 'True') {
                        return new appActions.LoadCurrentMovieSuccess(
                            response as CurrentMovie
                        );
                    } else {
                        return new appActions.LoadCurrentMovieError(
                            response.Error
                        );
                    }
                }),
                catchError((error: HttpErrorResponse) =>
                    of(new appActions.LoadCurrentMovieError(error.message))
                )
            )
        )
    );

    @Effect()
    moviesPageChange$: Observable<Action> = this.actions$.pipe(
        ofType(appActions.AppActionTypes.ChangeMoviesPage),
        map((action: appActions.ChangeMoviesPage) => action),
        withLatestFrom(this.store),
        map(([action, storeState]) => {
            return new appActions.LoadMovies({
                requestString: storeState.appState.searchString,
                pages: action.payload
            });
        })
    );
}
