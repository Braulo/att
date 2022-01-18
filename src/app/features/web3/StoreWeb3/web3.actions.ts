import { createAction, props } from '@ngrx/store';

// Gets the current address and ads it to the store
export const getAddressAction = createAction('[Web3] GET ADDRESS');

export const getAddressSuccessAction = createAction('[Web3] GET ADDRESS SUCCESS', props<{ address: string }>());

export const changeAddressAction = createAction('[Web3] CHANGE ADDRESS', props<{ address: string }>());

export const getBalanceFromAddressAction = createAction(
  '[Web3] GET BALANCE FROM CURRENT ACCOUNT',
  props<{ address: string }>(),
);

export const getBalanceFromAddressSuccessAction = createAction(
  '[Web3] GET BALANCE FROM CURRENT ACCOUNT SUCCESS',
  props<{ balance: string }>(),
);

export const web3ErrorAction = createAction('[Web3] Error', props<{ error: any }>());
