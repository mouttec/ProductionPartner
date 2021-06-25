import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';


@Component({
  selector: 'app-list-booking-view',
  templateUrl: './list-booking-view.component.html',
  styleUrls: ['./list-booking-view.component.css']
})
export class ListBookingViewComponent implements OnInit, OnDestroy {

  bookingSusbcription: Subscription;
  bookings: Booking[];
  dateForth: string;
  dateBack: string;
  idPartner = JSON.parse(localStorage.getItem('idPartner'));
  p: number = 1;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingSusbcription = this.bookingService.bookingSubject.subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      }
    );
    this.bookingService.readListBookingByPartner(this.idPartner);
  }


  ngOnDestroy(): void {
    this.bookingSusbcription.unsubscribe();
  }

}
