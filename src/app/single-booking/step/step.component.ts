import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

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
  carProcess: any;
  carStatus: string;
  typeBilling = JSON.parse(localStorage.getItem('typeBilling'));

  constructor(private bookingService: BookingService, private route: ActivatedRoute, private router: Router) { }

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
        this.carProcess = this.currentBooking[0].carProcess;
        this.licensePlateCar = this.currentBooking[2].licensePlateCar;
        this.brandCar = this.currentBooking[2].brandCar;
        this.modelCar = this.currentBooking[2].modelCar;
        this.motorizationCar = this.currentBooking[2].motorizationCar;
        this.urlGrayCard = this.currentBooking[2].urlGrayCard;
        this.dateOfCirculationCar = this.currentBooking[2].dateOfCirculationCar;
        localStorage.setItem('carProcess', JSON.stringify(this.currentBooking[0].carProcess));
        localStorage.setItem('idBooking', JSON.stringify(this.currentBooking[0].idBooking));
        console.log(booking);
        this.getChangeStatus();
      }
    );
  }

  getChangeStatus() {
    if (this.carProcess === 'etape1') {
      return this.carStatus = 'En attente de prise en charge';
    }
    else if  (this.carProcess === 'etape2') {
      return this.carStatus = 'Prise en charge par MoutteC';
    }
    else if  (this.carProcess === 'etape3') {
      return this.carStatus = 'Prise en charge par MoutteC';
    }
    else if  (this.carProcess === 'etape4') {
      return this.carStatus = 'Prise en charge par MoutteC';
    }
    else if  (this.carProcess === 'etape5') {
      return this.carStatus = 'Prise en charge par MoutteC';
    }
    else if  (this.carProcess === 'etape6') {
      return this.carStatus = 'Prise en charge par MoutteC';
    }
    else if  (this.carProcess === 'etape7') {
      return this.carStatus = 'Prise en charge par MoutteC';
    }
    else if  (this.carProcess === 'etape8') {
      return this.carStatus = 'Prise en charge par MoutteC';
    }
    else if  (this.carProcess === 'etape9') {
      return this.carStatus = 'Prise en charge par MoutteC';
    }
    else if  (this.carProcess === 'etape10') {
      return this.carStatus = 'Prise en charge par MoutteC';
    }
    else if  (this.carProcess === 'etape11') {
      return this.carStatus = 'Dans nos locaux';
    }
    else if  (this.carProcess === 'etape12') {
      return this.carStatus = 'Demande de paiement';
    }
    else if  (this.carProcess === 'etape13') {
      return this.carStatus = 'Paiement en attente';
    }
    else if  (this.carProcess === 'etape14') {
      return this.carStatus = 'Paiement validé';
    }
    else if  (this.carProcess === 'etape15') {
      return this.carStatus = 'Véhicule en attente d\'un driver';
    }
    else if  (this.carProcess === 'etape16') {
      return this.carStatus = 'Prise en charge par Mouttec';
    }
    else if  (this.carProcess === 'etape17') {
      return this.carStatus = 'Prise en charge par Mouttec';
    }
    else if  (this.carProcess === 'etape18') {
      return this.carStatus = 'Prise en charge par Mouttec';
    }
    else if  (this.carProcess === 'etape19') {
      return this.carStatus = 'Prise en charge par Mouttec';
    }
    else if  (this.carProcess === 'etape20') {
      return this.carStatus = 'Arrivé chez le client';
    }
    else if  (this.carProcess === 'etape21') {
      return this.carStatus = 'Véhicule en cours de restitution';
    }
    else if  (this.carProcess === 'etape22') {
      return this.carStatus = 'Véhicule en cours de restitution';
    }
    else if  (this.carProcess === 'etape23') {
      return this.carStatus = 'Véhicule en cours de restitution';
    }
    else if  (this.carProcess === 'etape24') {
      return this.carStatus = 'Véhicule en cours de restitution';
    }
    else if  (this.carProcess === 'etape25') {
      return this.carStatus = 'Véhicule en cours de restitution';
    }
    else if  (this.carProcess === 'etape26') {
      return this.carStatus = 'Véhicule restitué';
    }
    else if  (this.carProcess === 'etape27') {
      return this.carStatus = 'Véhicule restitué';
    }
  }


  onBooking() {
    this.router.navigate(['booking/' + this.idBooking]);
  }

  onNo() {
    this.router.navigate(['booking/' + this.idBooking]);
  }

  onYes() {
    if (this.typeBilling === 'partner') {
      this.carStatus = 'etape15';
      const updateStatus = new Booking();
      updateStatus.idBooking = this.idBooking;
      updateStatus.carProcess = this.carStatus;
      this.bookingService.updateBooking(updateStatus);
      console.log(updateStatus);
      this.router.navigate(['booking/' + this.idBooking]);
    }
    else if (this.typeBilling === 'compteTier') {
      this.carStatus = 'etape 12';
    }
  }

  onPayment() {
      this.carStatus = 'etape13';
      const updateStatus = new Booking();
      updateStatus.idBooking = this.idBooking;
      updateStatus.carProcess = this.carStatus;
      this.bookingService.updateBooking(updateStatus);
      console.log(updateStatus);
  }
}
