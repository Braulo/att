import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import * as Web3Actions from './web3.actions';
import { Store } from '@ngrx/store';
import { checkIfEntered } from '../../app/features/match/StoreMatch/match.actions';
import { Web3Service } from '../shared/services/web3.service';

@Injectable()
export class Web3Effects {
  getAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Web3Actions.getAddressAction),
      switchMap(() =>
        from(this.web3Service.web3.eth.getAccounts()).pipe(
          map((accounts) => {
            if (accounts[0]) {
              this.store.dispatch(Web3Actions.getBalanceFromAddressAction({ address: accounts[0] }));
              this.store.dispatch(checkIfEntered({ address: accounts[0] }));
            }
            return Web3Actions.getAddressSuccessAction({ address: accounts[0] });
          }),
          catchError(({ error }) => of(Web3Actions.web3ErrorAction({ error }))),
        ),
      ),
    ),
  );

  getBalanceFromAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Web3Actions.getBalanceFromAddressAction),
      switchMap(({ address }) =>
        from(this.web3Service.web3.eth.getBalance(address)).pipe(
          map((balance) => {
            const ether = this.web3Service.web3.utils.fromWei(balance, 'ether');
            return Web3Actions.getBalanceFromAddressSuccessAction({ balance: ether });
          }),
        ),
      ),
    ),
  );

  changeCurrentAddress$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(Web3Actions.changeAddressAction),
        map(({ address }) => {
          this.store.dispatch(checkIfEntered({ address }));
          this.store.dispatch(Web3Actions.getBalanceFromAddressAction({ address: address }));
          window.location.reload();
        }),
      ),
    {
      dispatch: false,
    },
  );

  constructor(private actions$: Actions, private web3Service: Web3Service, private store: Store) {}
}
