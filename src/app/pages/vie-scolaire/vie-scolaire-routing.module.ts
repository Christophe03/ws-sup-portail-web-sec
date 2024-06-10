import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VieScolaireComponent } from './vie-scolaire.component';

const routes: Routes = [
  {
    path: '',
    component: VieScolaireComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VieScolaireRoutingModule {}
