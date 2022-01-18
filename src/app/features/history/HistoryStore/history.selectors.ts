import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromHistory from './history.reducer';

export const historyState = createFeatureSelector<fromHistory.HistoryState>('History');

export const selectPastWinners = createSelector(historyState, (state) => state.pastWinners);

// export const getBalanceOfCurrentAddress = createSelector(web3State, (state) => state.balance);
