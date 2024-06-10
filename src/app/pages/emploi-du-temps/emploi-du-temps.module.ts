import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmploiDuTempsRoutingModule } from './emploi-du-temps-routing.module';
import { EmploiDuTempsComponent } from './emploi-du-temps.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EmploiDuTempsComponent],
  imports: [
    CommonModule,
    EmploiDuTempsRoutingModule,
    SharedModule,
    PipesModule,
  ],
})
export class EmploiDuTempsModule {}
