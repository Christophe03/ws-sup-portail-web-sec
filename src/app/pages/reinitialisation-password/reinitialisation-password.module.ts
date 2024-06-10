import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ReinitialisationPasswordComponent } from './reinitialisation-password.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';

@NgModule({
  declarations: [ReinitialisationPasswordComponent],
  imports: [
    CommonModule,
    ReinitialisationPasswordModule,
    SharedModule,
    PipesModule
  ],
})
export class ReinitialisationPasswordModule {
 }
