import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { Web3Service } from '../../web3/services/web3.service';
import { getCurrentAddress } from '../../web3/StoreWeb3/web3.selectors';
import * as WinnerActions from './winner.actions';

@Injectable()
export class WinnerEffects {
  endMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WinnerActions.endMatchAction),
      withLatestFrom(this.store.select(getCurrentAddress)),
      switchMap(([_, address]) => {
        this.store.dispatch(WinnerActions.changeIsEndingMatchAction({ loadingEndingMatch: true }));
        return from(
          this.web3Service.AttentionsContract.methods.endMatch().send({
            from: address,
          }),
        ).pipe(
          map((winner: any) => {
            this.store.dispatch(WinnerActions.changeIsEndingMatchAction({ loadingEndingMatch: false }));
            window.location.href = '/';
            return WinnerActions.endMatchSuccessAction({ winnerAddress: winner });
          }),
          catchError((error) => of(WinnerActions.winnerErrorAction({ error: error }))),
        );
      }),
    ),
  );

  getCurrentWinner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WinnerActions.getCurrentWinner),
      switchMap(() =>
        from(this.web3Service.AttentionsContract.methods.winner().call()).pipe(
          map((winner: any) => {
            return WinnerActions.getCurrentWinnerSuccess({ currentWinner: winner });
          }),
          catchError((error) => of(WinnerActions.winnerErrorAction({ error: error }))),
        ),
      ),
    ),
  );

  error$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WinnerActions.winnerErrorAction),
        map(() => {
          this.store.dispatch(WinnerActions.changeIsEndingMatchAction({ loadingEndingMatch: false }));
          this.snackbarService.show('Something went wrong :(');
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private snackbarService: SnackbarService,
    private actions$: Actions,
    private web3Service: Web3Service,
    private store: Store,
  ) {}
}
