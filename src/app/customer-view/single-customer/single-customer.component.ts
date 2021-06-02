import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-customer',
  templateUrl: './single-customer.component.html',
  styleUrls: ['./single-customer.component.css']
})
export class SingleCustomerComponent implements OnInit {

  bookings: any;
  bookingSubscription: Subscription;

  currentBooking = null;
  currentCustomer = null;
  firstNameCustomer: string;
  lastNameCustomer: string;
  mailCustomer: string;
  phoneCustomer: string;
  dateOfBirthdayCustomer: string;
  dateCustomer: string;
  addressBilling: string;
  idCustomer: number;
  idCustomerBooking: any;
  idCustomerNumber : number;

  constructor(private customerService: CustomerService, private route: ActivatedRoute, private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingSubscription = this.bookingService.bookingByIdCustomerSubject.subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
        console.log(this.bookings);
      }
    );
    this.getCustomer(this.route.snapshot.paramMap.get('idCustomer'));
  }

  getCustomer(idCustomer) {
    this.customerService.getCustomerById(idCustomer).subscribe(
      customer => {
        this.currentCustomer = customer;
        this.firstNameCustomer = this.currentCustomer.firstNameCustomer;
        this.lastNameCustomer = this.currentCustomer.lastNameCustomer;
        this.mailCustomer = this.currentCustomer.mailCustomer;
        this.phoneCustomer = this.currentCustomer.phoneCustomer;
        this.dateOfBirthdayCustomer = this.currentCustomer.dateOfBirthdayCustomer;
        this.dateCustomer = this.currentCustomer.dateCustomer;
        this.dateOfBirthdayCustomer = this.currentCustomer.dateOfBirthdayCustomer;
        this.addressBilling = this.currentCustomer.addressBilling;
        this.idCustomer = this.currentCustomer.idCustomer;
        localStorage.setItem('idCustomer', JSON.stringify(this.idCustomer));
        this.idCustomerNumber = Number(this.idCustomer);
        this.bookingService.getBookingByIdCustomerAndLenght(this.idCustomerNumber);
        console.log(this.idCustomerNumber);
      }
    )
  }

}
