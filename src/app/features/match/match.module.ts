import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { MatchComponent } from './components/match/match.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromMatch from '../match/StoreMatch/match.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MatchEffects } from './StoreMatch/match.effects';
import { AddTextComponent } from './components/add-text/add-text.component';
import { CurrentMatchComponent } from './components/current-match/current-match.component';

@NgModule({
  declarations: [MatchComponent, AddTextComponent, CurrentMatchComponent],
  imports: [
    CommonModule,
    MatchRoutingModule,
    SharedModule,
    StoreModule.forFeature('match', fromMatch.matchReducer),
    EffectsModule.forFeature([MatchEffects]),
  ],
})
export class MatchModule {}
