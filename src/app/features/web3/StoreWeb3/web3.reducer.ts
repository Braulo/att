import { Action, createReducer, on } from '@ngrx/store';
import * as Web3Actions from '../StoreWeb3/web3.actions';

export interface Web3State {
  address: string;
  balance: string;
}

export const initialState: Web3State = {
  address: '',
  balance: '',
};

export const web3Reducer = createReducer(
  initialState,
  on(Web3Actions.getAddressSuccessAction, Web3Actions.changeAddressAction, (state, { address }) => {
    return { ...state, address };
  }),
  on(Web3Actions.getBalanceFromAddressSuccessAction, (state, { balance }) => {
    return { ...state, balance };
  }),
);

export function reducer(state: Web3State | undefined, action: Action) {
  return web3Reducer(state, action);
}
