import { Action } from '@ngrx/store';
import { MovieResponse } from '../models/movie-response.model';
import { CurrentMovie } from '../models/curent-movie.model';

export enum AppActionTypes {
    SetSearchString = '[App] Set Search String',
    LoadMovies = '[App] Load Movies',
    LoadMoviesSuccess = '[App] Load Movies Success',
    LoadMoviesError = '[App] Load Movies Error',
    LoadCurrentMovie = '[App] Load Current Movie',
    LoadCurrentMovieSuccess = '[App] Load Current Movie Success',
    LoadCurrentMovieError = '[App] Load Current Movie Error'
}

export class SetSearchString implements Action {
    readonly type = AppActionTypes.SetSearchString;

    constructor(public payload: string) {}
}

export class LoadMovies implements Action {
    readonly type = AppActionTypes.LoadMovies;

    constructor(public payload: { requestString: string; pages: string }) {}
}

export class LoadMoviesSuccess implements Action {
    readonly type = AppActionTypes.LoadMoviesSuccess;

    constructor(public payload: MovieResponse) {}
}
export class LoadMoviesError implements Action {
    readonly type = AppActionTypes.LoadMoviesError;

    constructor(public payload: any) {}
}

export class LoadCurrentMovie implements Action {
    readonly type = AppActionTypes.LoadCurrentMovie;

    constructor(public payload: string) {}
}

export class LoadCurrentMovieSuccess implements Action {
    readonly type = AppActionTypes.LoadCurrentMovieSuccess;

    constructor(public payload: CurrentMovie) {}
}
export class LoadCurrentMovieError implements Action {
    readonly type = AppActionTypes.LoadCurrentMovieError;

    constructor(public payload: string) {}
}

export type AppActions =
    | SetSearchString
    | LoadMovies
    | LoadMoviesSuccess
    | LoadMoviesError
    | LoadCurrentMovie
    | LoadCurrentMovieSuccess
    | LoadCurrentMovieError;
