import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromWinner from './winner.reducer';

export const winnerState = createFeatureSelector<fromWinner.WinnerState>('Winner');

export const selectCurrentWinner = createSelector(winnerState, (state) => state.currentWinner);

export const selectIsEndingMatch = createSelector(winnerState, (state) => state?.loadingEndingMatch);

export const getPastWinners = createSelector(winnerState, (state) => state.pastwinners);
