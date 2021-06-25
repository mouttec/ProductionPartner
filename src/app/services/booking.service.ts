import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Booking } from 'src/app/models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingSubject = new Subject<Booking[]>();
  bookingByIdCustomerSubject = new Subject<Booking[]>();
  api = '../backend/api/booking';
  private bookings: Booking[];
  private bookingByIdCustomers: Booking[];
  addressPartner = localStorage.getItem('addressPartner');

  distanceForth: number;
  durationForth: any;
  distanceBack: number;
  durationBack: any;

  constructor(private httpClient: HttpClient) { }

  emitBookingSubject() {
    this.bookingSubject.next(this.bookings);
  }

  emitBookingByCustomerSubject(idCustomer) {
    this.bookingByIdCustomerSubject.next(this.bookingByIdCustomers);
  }


  readListBooking() {
    this.httpClient.get<Booking[]>(`${this.api}/listBooking.php`).subscribe(
      (bookings) => {
        this.bookings = bookings;
        this.emitBookingSubject();
      },
      (error) => {
        console.log('erreur de lecture des bookings');
      }
    );
  }

  readListBookingByPartner(idPartner) {
    this.httpClient.get<Booking[]>(`${this.api}/listBooking.php?idPartner=${idPartner}`).subscribe(
      (bookings) => {
        this.bookings = bookings;
        this.emitBookingSubject();
        console.log(bookings);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addBooking(booking: Booking) {
    this.httpClient.post(`${this.api}/editBookingByPartner.php`, booking).subscribe(
      () => {
        this.bookings.push(booking);
        console.log('address fichier back pour envoie des données', `${this.api}/editBookingByPartner.php`);
        console.log('envoie des deonnées au back', booking);
        console.log('enregistrement booking réussit');
      },
      (error) => {
        console.log('address fichier back pour envoie des données', `${this.api}/editBookingByPartner.php`);
        console.log('envoie des deonnées au back', booking);
        console.log('erreur de sauvegarde du booking', + error);
      }
    );
  }

  getBookingById(idBooking) {
  return this.httpClient.get(`${this.api}/listBooking.php?idBooking=${idBooking}`);
  }

  getBookingByIdCustomer(idCustomer) {
    this.httpClient.get<Booking[]>(`${this.api}/listBooking.php?idCustomer=${idCustomer}`).subscribe(
      (bookings) => {
        this.bookingByIdCustomers = bookings;
        this.emitBookingByCustomerSubject(idCustomer);
      }
    );
  }

  updateBooking(booking: Booking) {
    this.httpClient.post(`${this.api}/editBooking.php`, booking).subscribe(
      () => {
        console.log('enregistrement ok');
      },
      (error) => {
        console.log('erreur d\'update du booking' + error);
      }
    );
  }



}
