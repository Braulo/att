import { createAction, props } from '@ngrx/store';

// Gets the current address and ads it to the store
export const getPastWinnersAction = createAction('[History] get past winners');

export const getPastWinnersSuccessAction = createAction(
  '[History] get past winners success',
  props<{ pastWinners: [{ user: string; value: string }] }>(),
);

export const historyErrorAction = createAction('[History] Error', props<{ error: any }>());
