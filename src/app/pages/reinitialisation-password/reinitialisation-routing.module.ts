import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReinitialisationPasswordComponent } from './reinitialisation-password.component';

const routes: Routes = [
  {
    path: '',
    component: ReinitialisationPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReinitialisationPasswordRoutingModule {}
