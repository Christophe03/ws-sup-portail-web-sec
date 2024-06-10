import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { MoyennesComponent } from './moyennes/moyennes.component';

const routes: Routes = [
  {
        path: '',
        component: MoyennesComponent,
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesMoyennesRoutingModule {}
