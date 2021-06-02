import { AuthComponent } from './auth.component';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AuthComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})

export class UpdatePasswordModule{}
