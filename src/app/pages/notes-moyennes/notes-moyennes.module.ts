import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesMoyennesRoutingModule } from './notes-moyennes-routing.module';
import { NotesComponent } from './notes/notes.component';
import { MoyennesComponent } from './moyennes/moyennes.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NotesComponent, MoyennesComponent],
  imports: [
    CommonModule,
    NotesMoyennesRoutingModule,
    SharedModule,
    PipesModule,
  ],
})
export class NotesMoyennesModule {}
