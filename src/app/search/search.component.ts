import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from './../state/app.reducer';
import * as appActions from './../state/app.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchString: string;

  private subscriptions: Subscription = new Subscription();
  constructor(private store: Store<{ appState: fromApp.AppState }>) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.pipe(select('appState')).subscribe(state => {
        this.searchString = state.searchString;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public searchStringChanged(): void {
    this.store.dispatch(new appActions.SetSearchString(this.searchString));
    if (this.searchString) {
      this.store.dispatch(new appActions.LoadMovies({requestString: this.searchString, pages: '1'}));
    }
  }
}
