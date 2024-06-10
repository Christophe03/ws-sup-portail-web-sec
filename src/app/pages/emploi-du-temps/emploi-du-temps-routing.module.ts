import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmploiDuTempsComponent } from './emploi-du-temps.component';

const routes: Routes = [
  {
    path: '',
    component: EmploiDuTempsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmploiDuTempsRoutingModule {}
