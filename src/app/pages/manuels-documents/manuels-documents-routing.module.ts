import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManuelsComponent } from './manuels/manuels.component';
import { DocumentsComponent } from './documents/documents.component';

const routes: Routes = [
  {
        path: '',
        component: ManuelsComponent,
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManuelsDocumentsRoutingModule {}
