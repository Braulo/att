import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCurrentAddress } from 'src/app/features/web3/StoreWeb3/web3.selectors';
import { UserEntry } from 'src/app/shared/Models/UserEntry';
import { checkIfEntered } from '../../StoreMatch/match.actions';
import { getHasEntered, selectMatchUserEntries } from '../../StoreMatch/match.selectors';

@Component({
  selector: 'att-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss'],
})
export class MatchComponent implements OnInit {
  public hasEntered$: Observable<boolean>;
  public currentAddress$: Observable<string>;
  public allUserEntriesFromCurrentMatch: Observable<UserEntry[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(checkIfEntered({ address: '' }));
    this.hasEntered$ = this.store.select(getHasEntered);
    this.currentAddress$ = this.store.select(getCurrentAddress);

    this.allUserEntriesFromCurrentMatch = this.store.select(selectMatchUserEntries);
  }
}
