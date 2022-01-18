import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromWeb3 from './web3.reducer';

export const web3State = createFeatureSelector<fromWeb3.Web3State>('Web3');

export const getCurrentAddress = createSelector(web3State, (state) => state.address);

export const getBalanceOfCurrentAddress = createSelector(web3State, (state) => state.balance);
