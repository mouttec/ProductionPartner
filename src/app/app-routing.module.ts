import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CalendarPersoComponent } from './calendar-perso/calendar-perso.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { SingleCustomerComponent } from './customer-view/single-customer/single-customer.component';
import { MonthlyBillingViewComponent } from './monthly-billing-view/monthly-billing-view.component';
import { ProfilComponent } from './profil/profil.component';
import { BookingFormsComponent } from './booking-forms/booking-forms.component';
import { SingleBookingComponent } from './single-booking/single-booking.component';
import { UpdateProfilComponent } from './profil/update-profil/update-profil.component';
import { UpdatePasswordComponent } from './profil/update-password/update-password.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { StepComponent } from 'src/app/single-booking/step/step.component';
import { ListBookingViewComponent } from './list-booking-view/list-booking-view.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarPersoComponent, canActivate: [AuthGuard] },
  { path: 'addBooking', component: BookingFormsComponent, canActivate: [AuthGuard] },
  { path: 'listBooking', component: ListBookingViewComponent, canActivate: [AuthGuard] },
  { path: 'booking/:idBooking', component: SingleBookingComponent, canActivate: [AuthGuard] },
  { path: 'step', component: StepComponent, canActivate: [AuthGuard] },
  { path: 'customer', component: CustomerViewComponent, canActivate: [AuthGuard] },
  { path: 'customer/:idCustomer', component: SingleCustomerComponent, canActivate: [AuthGuard] },
  { path: 'monthlyBilling', component: MonthlyBillingViewComponent, canActivate: [AuthGuard] },
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] },
  { path: 'profil/updateProfil', component: UpdateProfilComponent, canActivate: [AuthGuard] },
  { path: 'profil/updatePassword', component: UpdatePasswordComponent, canActivate: [AuthGuard] },
  { path: '', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
