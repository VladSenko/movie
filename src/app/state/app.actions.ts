import { Action } from '@ngrx/store';
import { MovieResponse } from '../models/movie-response.model';

export enum AppActionTypes {
    SetSearchString = '[App] Set Search String',
    LoadMovies = '[App] Load Movies',
    LoadMoviesSuccess = '[App] Load Movies Success',
    LoadMoviesError = '[App] Load Movies Error'
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

export type AppActions =
    | SetSearchString
    | LoadMovies
    | LoadMoviesSuccess
    | LoadMoviesError;
