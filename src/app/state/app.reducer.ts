import { AppActions, AppActionTypes } from './app.actions';
import { Movie } from '../models/movie.model';
import { CurrentMovie } from '../models/curent-movie.model';

export interface AppState {
    searchString: string;
    currentMoviesPage: number;
    movies: Movie[];
    moviesCount: number;
    moviesError: string;
    moviesListLoading: boolean;
    movieLoading: boolean;
    currentMovie: CurrentMovie;
    currentMovieLoading: boolean;
    curentMovieError: string;
}

const initialState: AppState = {
    searchString: '',
    currentMoviesPage: 1,
    movies: [],
    moviesCount: 0,
    moviesError: null,
    moviesListLoading: false,
    movieLoading: false,
    currentMovie: null,
    currentMovieLoading: false,
    curentMovieError: null
};

export function appReducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {
        case AppActionTypes.SetSearchString:
            return {
                ...state,
                searchString: action.payload
            };
        case AppActionTypes.ChangeMoviesPage:
            return {
                ...state,
                currentMoviesPage: action.payload
            };
        case AppActionTypes.LoadMovies:
            return {
                ...state,
                movies: [],
                moviesError: null,
                moviesListLoading: true
            };
        case AppActionTypes.LoadMoviesSuccess:
            return {
                ...state,
                movies: action.payload.Search,
                moviesCount: +action.payload.totalResults,
                moviesError: null,
                moviesListLoading: false
            };
        case AppActionTypes.LoadMoviesError:
            return {
                ...state,
                movies: [],
                moviesCount: 0,
                moviesError: action.payload,
                moviesListLoading: false
            };
        case AppActionTypes.LoadCurrentMovie:
            return {
                ...state,
                currentMovie: null,
                curentMovieError: null,
                currentMovieLoading: true
            };
        case AppActionTypes.LoadCurrentMovieSuccess:
            return {
                ...state,
                currentMovie: action.payload,
                currentMovieLoading: false,
                curentMovieError: null
            };
        case AppActionTypes.LoadCurrentMovieError:
            return {
                ...state,
                currentMovie: null,
                currentMovieLoading: false,
                curentMovieError: action.payload
            };
        default:
            return state;
    }
}
