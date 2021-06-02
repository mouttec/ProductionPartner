import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  distance: number;
  duration: any;
  distanceForth: number;
  durationForth: any;
  distanceBack: number;
  durationBack: any;
  tarif: string;

  constructor() { }

  public calculerDistance(origin: string, dest: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      return new google.maps.DistanceMatrixService()
      .getDistanceMatrix({'origins': [origin], 'destinations': [dest], travelMode: google.maps.TravelMode.DRIVING},
        (results: any) => {
          // console.log('distance entre les -- ', results.rows[0].elements[0].distance.value/1000);
          this.distance = results.rows[0].elements[0].distance.value/1000;
          this.duration = results.rows[0].elements[0].duration.value/60;
          // console.log('disatnce',this.distance);
          // console.log('duration', this.duration);
          // enregistrer le result sur le storage local de votre navigateur
          localStorage.setItem('distance', JSON.stringify(this.distance));
          localStorage.setItem('duration', JSON.stringify(this.duration));
          resolve({ distance: this.distance, duration: this.duration});
        }
      );
    });
    return promise;
  }

  public calculTarifTwoAddress (distanceForth, formulaBooking) {
    if (distanceForth <= 5 && formulaBooking === 'forth') {
       return '29,90€';
     }
     else if ((distanceForth > 5 && distanceForth <= 10) && formulaBooking === 'forth') {
       return '39,90€';
     }
     else if ((distanceForth > 10 && distanceForth <= 15) && formulaBooking === 'forth') {
       return '49,90€';
     }
     else if (distanceForth <= 5 && formulaBooking === 'back') {
       return '29,90€';
     }
     else if ((distanceForth > 5 && distanceForth <= 10) && formulaBooking === 'back') {
       return '39,90€';
     }
     else if ((distanceForth > 10 && distanceForth <= 15) && formulaBooking === 'back') {
       return '49,90€';
     }
     else {
       return 'nous contacter';
     }

 }

 public calculTarifThreeAddress (distanceForth, distanceBack, formulaBooking) {
   if (distanceForth <= 5 && distanceBack <= 5 && formulaBooking === 'round') {
     return this.tarif = '49,90€';
   }
   else if (distanceForth <= 5 && (distanceBack > 5 && distanceBack <=10) && formulaBooking === 'round') {
     return this.tarif = '69,90€';
   }
   else if ((distanceForth <= 5 ) && (distanceBack > 10 && distanceBack <= 15) && formulaBooking === 'round') {
     return this.tarif = '79,90€';
   }
   else if ((distanceBack <= 5 ) && (distanceForth > 5 && distanceForth <= 10) && formulaBooking === 'round') {
     return this.tarif = '69,90€';
   }
   else if ((distanceForth > 5 && distanceForth <= 10) && (distanceBack > 5 && distanceBack <= 10) && formulaBooking === 'round') {
     return this.tarif = '69,90€';
   }
   else if ((distanceForth > 5 && distanceForth <= 10) && (distanceBack > 10 && distanceBack <= 15) && formulaBooking === 'round') {
     return this.tarif = '89,90€';
   }
   else if ((distanceForth > 10 && distanceForth <= 15) && distanceBack <= 5 && formulaBooking === 'round') {
     return this.tarif = '79,90€';
   }
   else if ((distanceForth > 10 && distanceForth <= 15) && (distanceBack > 5 && distanceBack <= 10) && formulaBooking === 'round') {
     return this.tarif = '89,90€';
   }
   else if ((distanceForth > 10 && distanceForth <= 15) && (distanceBack > 10 && distanceBack <= 15) && formulaBooking === 'round') {
     return this.tarif = '89,90€';
   }
   else {
     return this.tarif = 'nous contacter';
   }
 }
}
