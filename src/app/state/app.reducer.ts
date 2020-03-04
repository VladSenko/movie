import { AppActions, AppActionTypes } from './app.actions';
import { Movie } from '../models/movie.model';

export interface AppState {
    searchString: string;
    movies: Movie[];
    moviesCount: number;
    moviesError: any;
    moviesListLoading: boolean;
    movieLoading: boolean;
}

const initialState: AppState = {
    searchString: '',
    movies: [],
    moviesCount: 0,
    moviesError: null,
    moviesListLoading: false,
    movieLoading: false
};

export function appReducer(state = initialState, action: AppActions): AppState {
    switch (action.type) {
        case AppActionTypes.SetSearchString:
            return {
                ...state,
                searchString: action.payload
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
        default:
            return state;
    }
}
