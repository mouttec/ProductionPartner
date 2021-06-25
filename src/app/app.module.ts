import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerComponent } from './customer-view/customer/customer.component';
import { SingleCustomerComponent } from './customer-view/single-customer/single-customer.component';
import { MonthlyBillingViewComponent } from './monthly-billing-view/monthly-billing-view.component';
import { AuthComponent } from './auth/auth.component';
import { MonthlyBillingComponent } from './monthly-billing-view/monthly-billing/monthly-billing.component';
import { ProfilComponent } from './profil/profil.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarPersoComponent } from './calendar-perso/calendar-perso.component';
import { CustomerService } from './services/customer.service';
import { BillingService } from './services/billing.service';
import { PartnerService } from './services/partner.service';
import { AuthService } from './services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { BookingFormsComponent } from './booking-forms/booking-forms.component';
import { SingleBookingComponent } from './single-booking/single-booking.component';
import { UpdateProfilComponent } from './profil/update-profil/update-profil.component';
import { UpdatePasswordComponent } from './profil/update-password/update-password.component';
import { HoursBookingService } from './services/hours-booking.service';
import { PriceService } from './services/price.service';
import { ListBookingViewComponent } from './list-booking-view/list-booking-view.component';
import { ListBookingComponent } from './list-booking-view/list-booking/list-booking.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerViewComponent,
    CustomerComponent,
    SingleCustomerComponent,
    MonthlyBillingViewComponent,
    AuthComponent,
    MonthlyBillingComponent,
    ProfilComponent,
    CalendarPersoComponent,
    BookingFormsComponent,
    SingleBookingComponent,
    UpdateProfilComponent,
    UpdatePasswordComponent,
    ListBookingViewComponent,
    ListBookingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    DatePipe,
    CustomerService,
    BillingService,
    PartnerService,
    AuthService,
    BookingService,
    PriceService,
    HoursBookingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
