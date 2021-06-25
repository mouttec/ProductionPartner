import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Price } from 'src/app/models/price.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  priceSubject = new Subject<Price[]>();
  baseUrl = '../backend/api/price'
  private prices: Price[];
  priceSusbcription: Subscription;
  priceForthOrBackInf5: any;
  priceForthOrBackBetween5And10: any;
  priceForthOrBackBetwenn10And15: any;
  priceRoundInf5: any;
  priceRoundInf5AndBetween5And10: any;
  priceRoundInf5AndBetween10And15: any;
  priceRoundBetween5And10: any;
  priceRoundBetween5And10AndBetween10And15: any;
  priceBetween10And15: any;

  constructor(private httpClient: HttpClient) { }

  emitPriceSubject() {
    this.priceSubject.next(this.prices);
  }

  readPrice() {
    this.httpClient.get<Price[]>(`${this.baseUrl}/listPrice.php`).subscribe(
      (reponse) => {
        this.prices = reponse;
        this.emitPriceSubject();
      },
      (error) => {
        console.log('erreur de lecture' + error);
      }
    );
    return this.httpClient.get<Price[]>(`${this.baseUrl}/listPrice.php`);
  }

  readArrayPrice(){
    this.priceSusbcription = this.priceSubject.subscribe(
      (prices: any[]) => {
        this.prices = prices;
        console.log('array', this.prices);
        this.priceForthOrBackInf5 = prices[0].amount;
        localStorage.setItem('priceForthOrBackInf5', JSON.stringify(prices[0].amount));
        this.priceForthOrBackBetween5And10 = prices[1].amount;
        localStorage.setItem('priceForthOrBackBetween5And10', JSON.stringify(prices[1].amount));
        this.priceForthOrBackBetwenn10And15 = prices[2].amount;
        localStorage.setItem('priceForthOrBackBetwenn10And15', JSON.stringify(prices[2].amount));
        this.priceRoundInf5 = prices[3].amount;
        localStorage.setItem('priceRoundInf5', JSON.stringify(prices[3].amount));
        this.priceRoundInf5AndBetween5And10 = prices[4].amount;
        localStorage.setItem('priceRoundInf5AndBetween5And10', JSON.stringify(prices[4].amount));
        this.priceRoundInf5AndBetween10And15 = prices[5].amount;
        localStorage.setItem('priceRoundInf5AndBetween10And15', JSON.stringify(prices[5].amount));
        this.priceRoundBetween5And10 = prices[6].amount;
        localStorage.setItem('priceRoundBetween5And10', JSON.stringify(prices[6].amount));
        this.priceRoundBetween5And10AndBetween10And15 = prices[7].amount;
        localStorage.setItem('priceRoundBetween5And10AndBetween10And15', JSON.stringify(prices[7].amount));
        this.priceBetween10And15 = prices[8].amount;
        localStorage.setItem('priceBetween10And15', JSON.stringify(prices[8].amount));
      }
    );
    this.readPrice();
  }

}
