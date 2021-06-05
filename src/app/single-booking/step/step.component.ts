import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarProcessService } from 'src/app/services/car-process.service';
import { CarProcess } from 'src/app/models/carProcess.model';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  currentCarProcess = null;
  idBooking = JSON.parse(localStorage.getItem('idBooking'));
  typeBilling = JSON.parse(localStorage.getItem('typeBilling'));
  carProcess: CarProcess[];
  idProcess: number;
  idCar: number;
  idAgency: number;
  idPartner: number;
  carStatus: string;
  statusBooking: string;
  constructor(private bookingService: BookingService, private route: ActivatedRoute, private carProcessService: CarProcessService, private router: Router) { }

  ngOnInit(): void {
    this.getCarProcessBooking(this.idBooking);
    console.log(JSON.parse(localStorage.getItem('typeBilling')));
  }

  getCarProcessBooking(idBooking) {
    this.carProcessService.getCarProcessByIdBooking(idBooking).subscribe(
      carProcess => {
        this.currentCarProcess = carProcess;
        localStorage.setItem('carStatus', JSON.stringify(this.currentCarProcess.carStatus));
        localStorage.setItem('idProcess', JSON.stringify(this.currentCarProcess.idProcess));
        localStorage.setItem('idCar', JSON.stringify(this.currentCarProcess.idCar));
        localStorage.setItem('idPartner', JSON.stringify(this.currentCarProcess.idPartner));
        localStorage.setItem('idAgency', JSON.stringify(this.currentCarProcess.idAgency));
        this.carStatus = JSON.parse(localStorage.getItem('carStatus'));
        this.idProcess = JSON.parse(localStorage.getItem('idProcess'));
        this.idCar = JSON.parse(localStorage.getItem('idCar'));
        this.idPartner = JSON.parse(localStorage.getItem('idPartner'));
        this.idAgency = JSON.parse(localStorage.getItem('idAgency'));
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
    else if  (this.carStatus === 'etape 27') {
      return this.statusBooking = 'Véhicule restitué';
    }
  }

  onBooking() {
    this.router.navigate(['booking/' + this.idBooking]);
  }

  onNo() {
    this.router.navigate(['booking/' + this.idBooking]);
  }

  onYes() {
    if (this.typeBilling === 'you') {
      this.carStatus = 'etape 15';
      const updateStatus = new CarProcess();
      updateStatus.idProcess = this.idProcess;
      updateStatus.idCar = this.idCar;
      updateStatus.idPartner = this.idPartner;
      updateStatus.idBooking = this.idBooking;
      updateStatus.idAgency = this.idAgency;
      updateStatus.carStatus = this.carStatus;
      this.carProcessService.updateCarProcess(updateStatus);
      console.log(updateStatus);
      this.router.navigate(['booking/' + this.idBooking]);
    }
    else if (this.typeBilling === 'compteTier') {
      this.carStatus = 'etape 12';
    }
  }

  onPayment() {
      this.carStatus = 'etape 13';
      const updateStatus = new CarProcess();
      updateStatus.idProcess = this.idProcess;
      updateStatus.idCar = this.idCar;
      updateStatus.idPartner = this.idPartner;
      updateStatus.idBooking = this.idBooking;
      updateStatus.idAgency = this.idAgency;
      updateStatus.carStatus = this.carStatus;
      this.carProcessService.updateCarProcess(updateStatus);
      console.log(updateStatus);
  }
}
