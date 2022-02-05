import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './components/history/history.component';
import { StoreModule } from '@ngrx/store';
import * as fromHistory from './HistoryStore/history.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HistoryEffect } from './HistoryStore/history.effects';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    SharedModule,
    StoreModule.forFeature('History', fromHistory.historyReducer),
    EffectsModule.forFeature([HistoryEffect]),
  ],
})
export class HistoryModule {}
