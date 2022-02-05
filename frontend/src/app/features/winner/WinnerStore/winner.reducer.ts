import { Action, createReducer, on } from '@ngrx/store';
import * as WinnerActions from './winner.actions';

export interface WinnerState {
  currentWinner: { user: string; value: string };
  pastwinners: string[];
  loadingEndingMatch: boolean;
}

export const initialState: WinnerState = {
  currentWinner: null,
  pastwinners: null,
  loadingEndingMatch: false,
};

export const winnerReducer = createReducer(
  initialState,
  on(WinnerActions.getCurrentWinnerSuccess, (state, { currentWinner }) => {
    return { ...state, currentWinner: currentWinner };
  }),
  on(WinnerActions.changeIsEndingMatchAction, (state, { loadingEndingMatch }) => {
    return { ...state, loadingEndingMatch };
  }),
);

export function reducer(state: WinnerState | undefined, action: Action) {
  return winnerReducer(state, action);
}
