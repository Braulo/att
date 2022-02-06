import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { WinnerModule } from './features/winner/winner.module';
import { Web3Effects } from './Store/web3.effects';
import { reducer } from './Store/web3.reducer';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: false }),
    StoreModule.forRoot({ Web3: reducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([Web3Effects]),
    WinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
