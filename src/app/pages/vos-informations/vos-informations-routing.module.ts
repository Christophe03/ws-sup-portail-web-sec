import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VosInformationsComponent } from './vos-informations.component';

const routes: Routes = [
  {
    path: '',
    component: VosInformationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VosInformationsRoutingModule {}
