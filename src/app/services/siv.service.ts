import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Siv } from 'src/app/models/siv.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SivService {

  sivSubject = new Subject<Siv[]>();
  private siv: Siv[];
  modelCar: any;
  brandCar: any;
  colorCar: any;
  versionCar: any;
  dateOfCirculationCar: any;
  motorizationCar: any;
  api = 'http://localhost:8888/MoutteCAPI/backend/api/car';

  constructor(private httpClient: HttpClient) { }

  // public siv(licensePlateCar: any) {
  //   return this.httpClient.post<any>(`${this.api}/collectCarData.php`, licensePlateCar).pipe(map(SIV => {
  //     return SIV;
  //   }));
  // }

  emitSivSubject() {
    this.sivSubject.next(this.siv);
  }

  addSIV(siv: Siv): Promise<any> {
    console.log(2222);
    let promise = new Promise((resolve, reject) =>  {
      return this.httpClient.post(`${this.api}/collectCarData.php`, siv).subscribe(
        (reponse: any) => {
          console.log('reponse', reponse);
          const moodelCar = reponse.modelCar;
          const brandCar = reponse.brandCar;
          const colorCar = reponse.colorCar;
          const versionCar = reponse.versionCar;
          const dateOfCirculationCar = reponse.dateOfCirculationCar;
          const motorizationCar = reponse.motorizationCar;
          resolve({modelCar: reponse.modelCar, brandCar: reponse.brandCar, colorCar: reponse.colorCar, versionCar: reponse.versionCar, dateOfCirculationCar: reponse.dateOfCirculationCar, motorizationCar: reponse.motorizationCar});
        },
      );
    });
    return promise;
  }

}
