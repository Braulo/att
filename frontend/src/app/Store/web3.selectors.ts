import { createSelector } from '@ngrx/store';
import * as fromWeb3 from './web3.reducer';

// export const web3State = createFeatureSelector<fromWeb3.Web3State>('Web3');

export const selectWeb3Store = (state: fromWeb3.Web3State) => (state as any).Web3;

export const getCurrentAddress = createSelector(selectWeb3Store, (state) => {
  return state.address;
});

export const getBalanceOfCurrentAddress = createSelector(selectWeb3Store, (state) => state.balance);
