import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinnerRoutingModule } from './winner-routing.module';
import { WinnerComponent } from './components/winner/winner.component';
import { StoreModule } from '@ngrx/store';
import * as fromWinner from './WinnerStore/winner.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WinnerEffects } from './WinnerStore/winner.effects';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [WinnerComponent],
  imports: [
    CommonModule,
    WinnerRoutingModule,
    SharedModule,
    StoreModule.forFeature('Winner', fromWinner.winnerReducer),
    EffectsModule.forFeature([WinnerEffects]),
  ],
})
export class WinnerModule {}
