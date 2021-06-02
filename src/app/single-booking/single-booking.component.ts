import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-booking',
  templateUrl: './single-booking.component.html',
  styleUrls: ['./single-booking.component.css']
})
export class SingleBookingComponent implements OnInit {

  currentBooking = null;
  idBooking: number;
  firstNameCustomer: string;
  lastNameCustomer: string;
  mailCustomer: string;
  phoneCustomer: string;
  dateForth: string;
  dateBack: string;
  dateRDV: string;
  licensePlateCar: string;
  brandCar: string;
  modelCar: string;
  motorizationCar: string;
  urlGrayCard: string;
  dateOfCirculationCar: string;
  carStatus: any;
  statusBooking: string;

  constructor(private bookingService: BookingService, private route: ActivatedRoute, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.getBooking(this.route.snapshot.paramMap.get('idBooking'));
    this.getChangeStatus();
  }

  getBooking(idBooking) {
    this.bookingService.getBookingById(idBooking).subscribe(
      booking => {
        this.currentBooking = booking;
        this.firstNameCustomer = this.currentBooking[1].firstNameCustomer;
        this.lastNameCustomer = this.currentBooking[1].lastNameCustomer;
        this.mailCustomer = this.currentBooking[1].mailCustomer;
        this.phoneCustomer = this.currentBooking[1].phoneCustomer;
        this.dateForth = this.currentBooking[0].dateForth;
        this.idBooking = this.currentBooking[0].idBooking;
        this.licensePlateCar = this.currentBooking[2].licensePlateCar;
        this.brandCar = this.currentBooking[2].brandCar;
        this.modelCar = this.currentBooking[2].modelCar;
        this.motorizationCar = this.currentBooking[2].motorizationCar;
        this.urlGrayCard = this.currentBooking[2].urlGrayCard;
        this.dateOfCirculationCar = this.currentBooking[2].dateOfCirculationCar;
        localStorage.setItem('carStatus', JSON.stringify(this.currentBooking[3].carStatus));
        localStorage.setItem('idBooking', JSON.stringify(this.currentBooking[0].idBooking));
        this.carStatus = JSON.parse(localStorage.getItem('carStatus'));
        console.log(booking);
        this.getChangeStatus();
      }
    );
  }

  getChangeStatus() {
    if (this.carStatus === 'etape 1') {
      return this.statusBooking = 'En attente de prise en charge';
    }
    else if  (this.carStatus === 'etape 2') {
      return this.statusBooking = 'Prise en charge par MoutteC';
    }
    else if  (this.carStatus === 'etape 3') {
      return this.statusBooking = 'Prise en charge par MoutteC';
    }
    else if  (this.carStatus === 'etape 4') {
      return this.statusBooking = 'Prise en charge par MoutteC';
    }
    else if  (this.carStatus === 'etape 5') {
      return this.statusBooking = 'Prise en charge par MoutteC';
    }
    else if  (this.carStatus === 'etape 6') {
      return this.statusBooking = 'Prise en charge par MoutteC';
    }
    else if  (this.carStatus === 'etape 7') {
      return this.statusBooking = 'Prise en charge par MoutteC';
    }
    else if  (this.carStatus === 'etape 8') {
      return this.statusBooking = 'Prise en charge par MoutteC';
    }
    else if  (this.carStatus === 'etape 9') {
      return this.statusBooking = 'Prise en charge par MoutteC';
    }
    else if  (this.carStatus === 'etape 10') {
      return this.statusBooking = 'Prise en charge par MoutteC';
    }
    else if  (this.carStatus === 'etape 11') {
      return this.statusBooking = 'Dans nos locaux';
    }
    else if  (this.carStatus === 'etape 12') {
      return this.statusBooking = 'Demande de paiement';
    }
    else if  (this.carStatus === 'etape 13') {
      return this.statusBooking = 'Paiement en attente';
    }
    else if  (this.carStatus === 'etape 14') {
      return this.statusBooking = 'Paiement validé';
    }
    else if  (this.carStatus === 'etape 15') {
      return this.statusBooking = 'Véhicule en attente d\'un driver';
    }
    else if  (this.carStatus === 'etape 16') {
      return this.statusBooking = 'Prise en charge par Mouttec';
    }
    else if  (this.carStatus === 'etape 17') {
      return this.statusBooking = 'Prise en charge par Mouttec';
    }
    else if  (this.carStatus === 'etape 18') {
      return this.statusBooking = 'Prise en charge par Mouttec';
    }
    else if  (this.carStatus === 'etape 19') {
      return this.statusBooking = 'Prise en charge par Mouttec';
    }
    else if  (this.carStatus === 'etape 20') {
      return this.statusBooking = 'Arrivé chez le client';
    }
    else if  (this.carStatus === 'etape 21') {
      return this.statusBooking = 'Véhicule en cours de restitution';
    }
    else if  (this.carStatus === 'etape 22') {
      return this.statusBooking = 'Véhicule en cours de restitution';
    }
    else if  (this.carStatus === 'etape 23') {
      return this.statusBooking = 'Véhicule en cours de restitution';
    }
    else if  (this.carStatus === 'etape 24') {
      return this.statusBooking = 'Véhicule en cours de restitution';
    }
    else if  (this.carStatus === 'etape 25') {
      return this.statusBooking = 'Véhicule en cours de restitution';
    }
    else if  (this.carStatus === 'etape 26') {
      return this.statusBooking = 'Véhicule restitué';
    }
  }

  onClick(idBooking) {
    console.log(this.currentBooking[0].idBooking);
    this.router.navigate(['step']);
    // this.bookingService.getBookingById(idBooking).subscribe(
    //   booking => {
    //     this.currentBooking = booking;
    //     this.firstNameCustomer = this.currentBooking[1].firstNameCustomer;
    //     this.lastNameCustomer = this.currentBooking[1].lastNameCustomer;
    //     this.mailCustomer = this.currentBooking[1].mailCustomer;
    //     this.phoneCustomer = this.currentBooking[1].phoneCustomer;
    //     this.dateForth = this.currentBooking[0].dateForth;
    //     this.idBooking = this.currentBooking[0].idBooking;
    //     this.licensePlateCar = this.currentBooking[2].licensePlateCar;
    //     this.brandCar = this.currentBooking[2].brandCar;
    //     this.modelCar = this.currentBooking[2].modelCar;
    //     this.motorizationCar = this.currentBooking[2].motorizationCar;
    //     this.urlGrayCard = this.currentBooking[2].urlGrayCard;
    //     this.dateOfCirculationCar = this.currentBooking[2].dateOfCirculationCar;
    //     console.log(this.idBooking);
    //   }
    // );
  }

}
