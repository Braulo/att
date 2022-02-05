import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WinnerComponent } from './components/winner/winner.component';

const routes: Routes = [
  {
    path: '**',
    component: WinnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WinnerRoutingModule {}
