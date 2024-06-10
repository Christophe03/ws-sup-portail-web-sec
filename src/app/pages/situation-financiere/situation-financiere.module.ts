import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SituationFinanciereRoutingModule } from './situation-financiere-routing.module';
import { SituationFinanciereComponent } from './situation-financiere.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [SituationFinanciereComponent],
  imports: [
    CommonModule,
    SituationFinanciereRoutingModule,
    SharedModule,
    PipesModule,
  ],
})
export class SituationFinanciereModule {}
