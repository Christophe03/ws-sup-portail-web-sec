import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VosInformationsRoutingModule } from './vos-informations-routing.module';
import { VosInformationsComponent } from './vos-informations.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [VosInformationsComponent],
  imports: [
    CommonModule,
    VosInformationsRoutingModule,
    SharedModule,
    PipesModule,
  ],
})
export class VosInformationsModule {}
