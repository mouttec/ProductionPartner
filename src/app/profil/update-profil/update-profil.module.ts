import { UpdateProfilComponent } from './update-profil.component';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    UpdateProfilComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})

export class UpdateProfilModule{}
