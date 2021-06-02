import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmAutofocus } from './single-booking.component';
import { StepComponent } from './step/step.component';

@NgModule({
  imports: [BrowserModule, NgbModule, CommonModule],
  declarations: [NgbdModalConfirmAutofocus, StepComponent],
  exports: [],
  bootstrap: [],
  entryComponents: [NgbdModalConfirmAutofocus]
})
export class NgbdModalFocusModule {}
