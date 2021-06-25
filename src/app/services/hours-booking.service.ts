import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { HoursBooking } from 'src/app/models/hoursBooking.model';

@Injectable({
  providedIn: 'root'
})
export class HoursBookingService {

  hoursBookingSubject = new Subject<HoursBooking[]>();
  baseUrl = '../backend/api/booking';
  private hoursBookings: HoursBooking[];

  constructor(private httpClient: HttpClient) { }

  emitHoursBookingSubject() {
    this.hoursBookingSubject.next(this.hoursBookings);
  }

  readListHoursBooking() {
    this.httpClient.get<HoursBooking[]>(`${this.baseUrl}/bookingCalendar.php`).subscribe(
      (reponse) => {
        this.hoursBookings = reponse;
        this.emitHoursBookingSubject();
      },
      (error) => {
        console.log('erreur de sauvegarde' + error);
      }
    );
    return this.httpClient.get<HoursBooking[]>(`${this.baseUrl}/bookingCalendar.php`);
  }
}
