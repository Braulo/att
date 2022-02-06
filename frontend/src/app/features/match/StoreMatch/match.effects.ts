import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { forkJoin, from, of } from 'rxjs';
import * as MatchActions from './match.actions';
import { Store } from '@ngrx/store';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { getCurrentAddress } from 'src/app/Store/web3.selectors';
import { Web3Service } from 'src/app/shared/services/web3.service';

@Injectable()
export class MatchEffects {
  addTextValueToCurrentAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchActions.addUserEntryToCurrentAddressAction),
      withLatestFrom(this.store.select(getCurrentAddress)),
      switchMap(([{ textValue }, currentAddress]) => {
        return from(
          this.web3Service.AttentionsContract.methods.addTextToAddress(textValue).send({
            from: currentAddress,
          }),
        ).pipe(
          map(({ events }) => {
            return MatchActions.addUserEntrieToCurrentAddressSuccessAction({
              userEntry: {
                id: events.TextAdded.returnValues.id,
                value: textValue,
                downvotes: 0,
                entered: true,
                upvotes: 0,
                user: currentAddress,
              },
            });
          }),
          catchError(({ error }) => of(MatchActions.matchErrorAction({ error }))),
        );
      }),
    ),
  );

  getTextValuesFromCurrentMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchActions.getUserEntriesFromCurrentMatchAction),
      switchMap(() =>
        from(this.web3Service.AttentionsContract.methods.getAllUsers().call())
          .pipe(
            map((allUsers: string[]) =>
              allUsers.map((address: string) => {
                return from(this.web3Service.AttentionsContract.methods.UserEntries(address).call());
              }),
            ),
            mergeMap((allUserEntries$: any) => forkJoin(allUserEntries$)),
          )
          .pipe(
            map((allUserEntries: any[]) => {
              return MatchActions.getUserEntriesFromCurrentMatchSuccessAction({
                userEntries: allUserEntries.map((userEntry, i) => {
                  return {
                    id: userEntry.id,
                    downvotes: userEntry.downvotes,
                    entered: userEntry.entered,
                    upvotes: userEntry.upvotes,
                    value: userEntry.value,
                    user: userEntry.user,
                  };
                }),
              });
            }),
          ),
      ),
    ),
  );

  updateLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchActions.updateLoading),
      map(({ loading }) => {
        return MatchActions.updateLoading({ loading });
      }),
    ),
  );

  error$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MatchActions.matchErrorAction),
        map(() => {
          this.store.dispatch(MatchActions.updateVotesLoadingAction({ isVotesLoading: false }));
          this.snackbarService.show('Something went wrong :(');
        }),
      ),
    { dispatch: false },
  );

  updateVotesLoadingToTrue$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MatchActions.upvoteTextActiton, MatchActions.downvoteTextActiton),
        map(() => {
          this.store.dispatch(MatchActions.updateVotesLoadingAction({ isVotesLoading: true }));
        }),
      ),
    { dispatch: false },
  );

  updateVotesLoadingToFalse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MatchActions.upvoteTextSuccessActiton, MatchActions.downvoteTextSuccessActiton),
        map(() => {
          this.store.dispatch(MatchActions.updateVotesLoadingAction({ isVotesLoading: false }));
        }),
      ),
    { dispatch: false },
  );
  success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MatchActions.addUserEntrieToCurrentAddressSuccessAction),
        map(() => {
          this.snackbarService.show('Your text has been entered');
        }),
      ),
    { dispatch: false },
  );

  hasEntered$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchActions.checkIfEntered),
      withLatestFrom(this.store.select(getCurrentAddress)),
      switchMap(([{ address }, currentAddress]) => {
        if (address || currentAddress) {
          return from(this.web3Service.AttentionsContract.methods.UserEntries(address || currentAddress).call()).pipe(
            map((response: any) => {
              return MatchActions.checkIfEnteredSuccess({ hasEntered: response.entered });
            }),
          );
        }
        return of();
      }),
      catchError((error) => {
        return of(MatchActions.matchErrorAction({ error }));
      }),
    ),
  );

  upvoteText$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchActions.upvoteTextActiton),
      withLatestFrom(this.store.select(getCurrentAddress)),
      switchMap(([{ userAddress }, address]) => {
        return from(
          this.web3Service.AttentionsContract.methods.upvote(userAddress).send({
            from: address,
          }),
        ).pipe(
          map(({ events }) => {
            return MatchActions.upvoteTextSuccessActiton({
              updatedUserEntry: {
                id: events.Upvote.returnValues.id,
                changes: { upvotes: events.Upvote.returnValues.upvotes },
              },
            });
          }),
        );
      }),
      catchError((error) => {
        return of(MatchActions.matchErrorAction({ error }));
      }),
    ),
  );

  downvoteText$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MatchActions.downvoteTextActiton),
      withLatestFrom(this.store.select(getCurrentAddress)),
      switchMap(([{ userAddress }, address]) => {
        return from(
          this.web3Service.AttentionsContract.methods.downvote(userAddress).send({
            from: address,
          }),
        ).pipe(
          map(({ events }) => {
            return MatchActions.downvoteTextSuccessActiton({
              updatedUserEntry: {
                id: events.Downvote.returnValues.id,
                changes: { downvotes: events.Downvote.returnValues.downvotes },
              },
            });
          }),
        );
      }),
      catchError((error) => {
        return of(MatchActions.matchErrorAction({ error }));
      }),
    ),
  );

  constructor(
    private snackbarService: SnackbarService,
    private actions$: Actions,
    private store: Store,
    private web3Service: Web3Service,
  ) {}
}
