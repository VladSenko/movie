import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from "rxjs";
import * as fromApp from "./../state/app.reducer";
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  public movies: Movie[];
  public moviesCount: number;
  public error: string;

  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<{ appState: fromApp.AppState }>) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.pipe(
        select('appState')
      ).subscribe(
        state => {
            this.movies = state.movies;
            this.moviesCount = state.moviesCount;
            this.error = state.moviesError;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
