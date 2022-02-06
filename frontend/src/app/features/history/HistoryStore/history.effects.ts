import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import * as HistoryActions from './history.actions';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Injectable()
export class HistoryEffect {
  getPastWinners$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HistoryActions.getPastWinnersAction),
      switchMap(() =>
        from(this.web3Service.AttentionsContract.methods.getAllPastWinners().call()).pipe(
          map((winners: any) => {
            return HistoryActions.getPastWinnersSuccessAction({ pastWinners: winners });
          }),
          catchError(({ error }) => of(HistoryActions.historyErrorAction({ error }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private web3Service: Web3Service) {}
}
