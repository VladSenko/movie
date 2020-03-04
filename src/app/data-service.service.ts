import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieResponse } from './models/movie-response.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private api = 'http://www.omdbapi.com';
    private key = '2b04e489';

    constructor(private http: HttpClient) {}

    public getMovies(
        requestString: string,
        page: string
    ): Observable<MovieResponse> {
        const options = {
            params: new HttpParams()
                .set('apiKey', this.key)
                .set('s', requestString)
                .set('page', page)
        };

        return this.http.get<MovieResponse>(this.api, options);
    }
}
