import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromWeb3 from './StoreWeb3/web3.reducer';
import { EffectsModule } from '@ngrx/effects';
import { Web3Effects } from './StoreWeb3/web3.effects';

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature('Web3', fromWeb3.reducer), EffectsModule.forFeature([Web3Effects])],
})
export class Web3Module {}
