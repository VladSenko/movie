import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from './models/movie-response.model';
import { CurrentMovie } from './models/curent-movie.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private api = 'http://www.omdbapi.com';
    private key = '2b04e489';

    constructor(private http: HttpClient) {}

    public getMovies(
        requestString: string,
        page: number
    ): Observable<MovieResponse> {
        const options = {
            params: new HttpParams()
                .set('apiKey', this.key)
                .set('s', requestString)
                .set('page', page.toString())
        };

        return this.http.get<MovieResponse>(this.api, options);
    }

    public getMovieById(id: number): Observable<CurrentMovie> {
        const options = {
            params: new HttpParams().set('apiKey', this.key).set('i', id.toString())
        };
        return this.http.get<CurrentMovie>(this.api, options);
    }
}
