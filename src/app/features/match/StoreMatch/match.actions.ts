import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { UserEntry } from 'src/app/shared/Models/UserEntry';

export const addUserEntryToCurrentAddressAction = createAction(
  '[MATCH] Add Text Value to currrent address',
  props<{ textValue: string }>(),
);

export const addUserEntrieToCurrentAddressSuccessAction = createAction(
  '[MATCH] Add Text Value to currrent address Success',
  props<{ userEntry: UserEntry }>(),
);

export const getUserEntriesFromCurrentMatchAction = createAction('[MATCH] Get User Entries from current Match');

export const getUserEntriesFromCurrentMatchSuccessAction = createAction(
  '[MATCH] Get User Entries from current Match success',
  props<{ userEntries: UserEntry[] }>(),
);

export const updateLoading = createAction('[MATCH] update loading', props<{ loading: boolean }>());

export const checkIfEntered = createAction('[MATCH] check if has entered', props<{ address: string }>());

export const checkIfEnteredSuccess = createAction(
  '[MATCH] update has entered success',
  props<{ hasEntered: boolean }>(),
);

export const matchErrorAction = createAction('[MATCH] Error', props<{ error: any }>());

export const updateVotesLoadingAction = createAction(
  '[MATCH] update loading votes',
  props<{ isVotesLoading: boolean }>(),
);

export const upvoteTextActiton = createAction('[MATCH] upvote text', props<{ userAddress: string }>());

export const upvoteTextSuccessActiton = createAction(
  '[MATCH] upvote text success',
  props<{ updatedUserEntry: Update<UserEntry> }>(),
);

export const downvoteTextActiton = createAction('[MATCH] downvote text', props<{ userAddress: string }>());

export const downvoteTextSuccessActiton = createAction(
  '[MATCH] downvote text success',
  props<{ updatedUserEntry: Update<UserEntry> }>(),
);
