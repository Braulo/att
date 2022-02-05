import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UserEntry } from 'src/app/shared/Models/UserEntry';
import * as MatchActions from './match.actions';

export interface MatchState extends EntityState<UserEntry> {
  loading: boolean;
  hasEntered: boolean;
  isVotesLoading: boolean;
}

export const adapter: EntityAdapter<UserEntry> = createEntityAdapter<UserEntry>({
  selectId: (userEntry) => userEntry.id,
});

export const initialState: MatchState = adapter.getInitialState({
  loading: false,
  hasEntered: false,
  isVotesLoading: false,
});

export const matchReducer = createReducer(
  initialState,
  on(MatchActions.addUserEntrieToCurrentAddressSuccessAction, (state, { userEntry }) => {
    return adapter.upsertOne(userEntry, { ...state, loading: false, hasEntered: true });
  }),
  on(MatchActions.getUserEntriesFromCurrentMatchSuccessAction, (state, { userEntries }) => {
    return adapter.setAll(userEntries, state);
  }),
  on(MatchActions.addUserEntryToCurrentAddressAction, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(MatchActions.matchErrorAction, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(MatchActions.updateLoading, (state, { loading }) => {
    return {
      ...state,
      loading,
    };
  }),
  on(MatchActions.checkIfEnteredSuccess, (state, { hasEntered }) => {
    return {
      ...state,
      hasEntered,
    };
  }),
  on(MatchActions.upvoteTextSuccessActiton, MatchActions.downvoteTextSuccessActiton, (state, { updatedUserEntry }) => {
    return adapter.updateOne(updatedUserEntry, state);
  }),
  on(MatchActions.updateVotesLoadingAction, (state, { isVotesLoading }) => {
    return {
      ...state,
      isVotesLoading,
    };
  }),
);
