import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserEntry } from 'src/app/shared/Models/UserEntry';
import {
  downvoteTextActiton,
  getUserEntriesFromCurrentMatchAction,
  upvoteTextActiton,
} from '../../StoreMatch/match.actions';
import { getHasEntered, selectMatchUserEntries, selectVotesLoading } from '../../StoreMatch/match.selectors';

@Component({
  selector: 'att-current-match',
  templateUrl: './current-match.component.html',
  styleUrls: ['./current-match.component.scss'],
})
export class CurrentMatchComponent implements OnInit {
  public currentAddressString: string;
  public allUsersForThisRound: string[];
  public allUserEntriesFromCurrentMatch: Observable<UserEntry[]>;
  public hasEntered: Observable<boolean>;
  public isLoadingVotes: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getUserEntriesFromCurrentMatchAction());

    this.allUserEntriesFromCurrentMatch = this.store.select(selectMatchUserEntries);

    this.hasEntered = this.store.select(getHasEntered);
    this.isLoadingVotes = this.store.select(selectVotesLoading);
  }

  upvote(user: string) {
    this.store.dispatch(upvoteTextActiton({ userAddress: user }));
  }
  downvote(user: string) {
    this.store.dispatch(downvoteTextActiton({ userAddress: user }));
  }
}
