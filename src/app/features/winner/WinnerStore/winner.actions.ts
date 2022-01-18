import { createAction, props } from '@ngrx/store';

// Gets the current address and ads it to the store
export const endMatchAction = createAction('[Winner] end match');

export const endMatchSuccessAction = createAction('[Winner] end match success', props<{ winnerAddress: string }>());

export const getCurrentWinner = createAction('[Winner] get current winner');

export const getCurrentWinnerSuccess = createAction(
  '[Winner] get current winner success',
  props<{ currentWinner: { user: string; value: string } }>(),
);

export const changeIsEndingMatchAction = createAction(
  '[Winner] change is ending match',
  props<{ loadingEndingMatch: boolean }>(),
);

export const winnerErrorAction = createAction('[Winner] Error', props<{ error: any }>());
