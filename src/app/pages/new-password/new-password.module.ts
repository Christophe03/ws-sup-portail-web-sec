import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewPasswordComponent } from './new-password.component';

export const routes: Routes = [
  { path: '', component: NewPasswordComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [NewPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class NewPasswordModule {}
