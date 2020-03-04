import { AppActions, AppActionTypes } from './app.actions';
import { Movie } from '../models/movie.model';

export interface AppState {
    searchString: string;
    movies: Movie[];
    moviesCount: number;
    moviesError: any;
}

const initialState: AppState = {
    searchString: '',
    movies: [],
    moviesCount: 0,
    moviesError: null
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
                moviesError: null
            };
        case AppActionTypes.LoadMoviesSuccess:
            return {
                ...state,
                movies: action.payload.Search,
                moviesCount: +action.payload.totalResults,
                moviesError: null
            };
        case AppActionTypes.LoadMoviesError:
            return {
                ...state,
                movies: [],
                moviesCount: 0,
                moviesError: action.payload
            };
        default:
            return state;
    }
}
