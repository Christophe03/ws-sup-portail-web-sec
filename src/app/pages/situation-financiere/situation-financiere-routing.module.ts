import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SituationFinanciereComponent } from './situation-financiere.component';

const routes: Routes = [
  {
    path: '',
    component: SituationFinanciereComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SituationFinanciereRoutingModule {}
