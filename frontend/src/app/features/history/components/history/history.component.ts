import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getPastWinnersAction } from '../../HistoryStore/history.actions';
import { selectPastWinners } from '../../HistoryStore/history.selectors';

@Component({
  selector: 'att-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  public pastWinners: Observable<[{ user: string; value: string }]>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getPastWinnersAction());

    this.pastWinners = this.store.select(selectPastWinners);
  }
}
