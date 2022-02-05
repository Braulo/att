import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'winner',
    loadChildren: () => import('./features/winner/winner.module').then((m) => m.WinnerModule),
  },
  {
    path: 'match',
    loadChildren: () => import('./features/match/match.module').then((m) => m.MatchModule),
  },
  {
    path: 'history',
    loadChildren: () => import('./features/history/history.module').then((m) => m.HistoryModule),
  },
  {
    path: '**',
    redirectTo: 'winner',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
