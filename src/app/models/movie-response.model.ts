import { Movie } from './movie.model';

export interface MovieResponse {
    Search: Movie[];
    totalResults: string;
    Response: 'True' | 'False';
    Error: string;
}
