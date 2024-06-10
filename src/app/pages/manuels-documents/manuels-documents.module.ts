import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManuelsDocumentsRoutingModule } from './manuels-documents-routing.module';
import { ManuelsComponent } from './manuels/manuels.component';
import { DocumentsComponent } from './documents/documents.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ManuelsComponent, DocumentsComponent],
  imports: [
    CommonModule,
    ManuelsDocumentsRoutingModule,
    SharedModule,
    PipesModule,
  ],
})
export class ManuelsDocumentsModule {}
