import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromMatch from './match.reducer';

export const matchState = createFeatureSelector<fromMatch.MatchState>('match');

export const getAllUserEntriesForCurrentMatch = createSelector(matchState, (state) => state.entities);

export const {
  selectIds: selectMatchIds,
  selectEntities: selectMatchEntities,
  selectAll: selectAllUserEntries,
  selectTotal: userEntriesCount,
} = fromMatch.adapter.getSelectors(matchState);

export const selectMatchUserEntries = selectAllUserEntries;

export const getLoading = createSelector(matchState, (state) => state.loading);

export const getHasEntered = createSelector(matchState, (state) => state.hasEntered);

export const selectVotesLoading = createSelector(matchState, (state) => state.isVotesLoading);
