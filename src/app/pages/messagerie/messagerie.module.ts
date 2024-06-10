import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagerieRoutingModule } from './messagerie-routing.module';
import { MessagerieComponent } from './messagerie.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MessagerieComponent],
  imports: [CommonModule, MessagerieRoutingModule, SharedModule, PipesModule],
})
export class MessagerieModule {}
