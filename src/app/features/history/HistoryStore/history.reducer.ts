import { Action, createReducer, on } from '@ngrx/store';
import * as HistoryActions from '../HistoryStore/history.actions';

export interface HistoryState {
  pastWinners: [{ user: string; value: string }];
}

export const initialState: HistoryState = {
  pastWinners: null,
};

export const historyReducer = createReducer(
  initialState,
  on(HistoryActions.getPastWinnersSuccessAction, (state, { pastWinners }) => {
    return { ...state, pastWinners };
  }),
);

export function reducer(state: HistoryState | undefined, action: Action) {
  return historyReducer(state, action);
}
