import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromApp from './../state/app.reducer';
import * as appActions from './../state/app.actions';
import { Subscription } from 'rxjs';
import { CurrentMovie } from '../models/curent-movie.model';

@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
    public movie: CurrentMovie;
    public loading: boolean;
    public error: string;
    private subscriptions: Subscription = new Subscription();
    constructor(
        private route: ActivatedRoute,
        private store: Store<{ appState: fromApp.AppState }>
    ) {}

    ngOnInit(): void {
        this.subscriptions
            .add(
                this.route.params.subscribe(params =>
                    this.store.dispatch(
                        new appActions.LoadCurrentMovie(params.id)
                    )
                )
            )
            .add(
                this.store.pipe(select('appState')).subscribe(state => {
                    this.movie = state.currentMovie;
                    this.loading = state.currentMovieLoading;
                    this.error = state.curentMovieError;
                })
            );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

}
