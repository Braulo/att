import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCurrentWinner } from '../../WinnerStore/winner.actions';
import { selectCurrentWinner } from '../../WinnerStore/winner.selectors';

@Component({
  selector: 'att-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss'],
})
export class WinnerComponent implements OnInit {
  public currentWinner: Observable<{ user: string; value: string }>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getCurrentWinner());

    this.currentWinner = this.store.select(selectCurrentWinner);
  }
}
