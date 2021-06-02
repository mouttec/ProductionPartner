import { BookingFormsComponent } from './booking-forms.component';
import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    BookingFormsComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})

export class BookingFormsModule{}
