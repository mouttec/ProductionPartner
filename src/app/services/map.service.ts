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
  t1 = JSON.parse(localStorage.getItem('priceForthOrBackInf5'));
  t2 = JSON.parse(localStorage.getItem('priceForthOrBackBetween5And10'));
  t3 = JSON.parse(localStorage.getItem('priceForthOrBackBetwenn10And15'));
  t4 = JSON.parse(localStorage.getItem('priceRoundInf5'));
  t5 = JSON.parse(localStorage.getItem('priceRoundInf5AndBetween5And10'));
  t6 = JSON.parse(localStorage.getItem('priceRoundInf5AndBetween10And15'));
  t7 = JSON.parse(localStorage.getItem('priceRoundBetween5And10'));
  t8 = JSON.parse(localStorage.getItem('priceRoundBetween5And10AndBetween10And15'));
  t9 = JSON.parse(localStorage.getItem('priceBetween10And15'));
  t10 = JSON.parse(localStorage.getItem('priceTechnicalControl'));

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
   else if (distanceForth <= 5 && distanceBack <= 5 && formulaBooking === 'technicalControl') {
    return this.tarif = '119,90€';
  }
   else {
     return this.tarif = 'nous contacter';
   }
 }
}
