import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CarProcess } from 'src/app/models/carProcess.model';

@Injectable({
  providedIn: 'root'
})
export class CarProcessService {

  carProcessSubject = new Subject<CarProcess[]>();
  carProcessByIdBookingSubject = new Subject<CarProcess[]>();
  api = 'http://localhost:8888/MoutteCAPI/backend/api/carProcess';
  private carProcess: CarProcess[];
  private carProcessByBooking: CarProcess[];


  constructor(private httpClient: HttpClient) { }

  emitCarProcessSubject() {
    this.carProcessSubject.next(this.carProcess);
  }

  emitCarProcessByBookingSubject(idBooking) {
    this.carProcessByIdBookingSubject.next(this.carProcessByBooking);
  }

  readListCarProcess() {
    this.httpClient.get<CarProcess[]>(`${this.api}/listCarProcess.php`).subscribe(
      (carProcesss) => {
        this.carProcess = carProcesss;
        this.emitCarProcessSubject();
      },
      (error) => {
        console.log('erreur de lecture des craProcess');
      }
    );
  }

  addCarProcess(carProcess: CarProcess) {
    this.httpClient.post(`${this.api}/editCarProcess.php`, carProcess).subscribe(
      () => {
        this.carProcess.push(carProcess);
      },
      (error) => {
        console.log('erreur de sauvegarde du carProcess' + error);
      }
    );
  }

  getCarProcessById(idProcess) {
    return this.httpClient.get(`${this.api}/listCarProcess.php?idProcess=${idProcess}`);
  }

  getCarProcessByIdBooking(idBooking) {
    return this.httpClient.get(`${this.api}/listCarProcess.php?idBooking=${idBooking}`);
  }

  updateCarProcess(carProcess: CarProcess) {
    this.httpClient.post(`${this.api}/editCarProcess.php`, carProcess).subscribe(
      () => {
        console.log('enregistrement ok');
      },
      (error) => {
        console.log('erreur de mise à jour du status');
      }
    )
  }
}
