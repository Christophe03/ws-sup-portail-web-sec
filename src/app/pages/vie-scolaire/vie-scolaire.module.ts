import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VieScolaireRoutingModule } from './vie-scolaire-routing.module';
import { VieScolaireComponent } from './vie-scolaire.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [VieScolaireComponent],
  imports: [CommonModule, VieScolaireRoutingModule, SharedModule, PipesModule],
})
export class VieScolaireModule {}
