import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Billing } from 'src/app/models/billing.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  billingSubject = new Subject<Billing[]>();
  billingByIdPartnerSubject = new Subject<Billing[]>();
  baseUrl = '../backend/partnerInvoice/';
  private billings: Billing[];
  private billingByIdPartner: Billing[];

  constructor(private httpClient: HttpClient) { }

  emitBillingSubject() {
    this.billingSubject.next(this.billings);
  }

  emitBillingByPartnerSubject(idPartner) {
    this.billingByIdPartnerSubject.next(this.billingByIdPartner);
  }

  readListBilling() {
    this.httpClient.get<Billing[]>(`${this.baseUrl}listInvoices.php`).subscribe(
      (reponse) => {
        this.billings = reponse;
        this.emitBillingSubject();
      },
      (error) => {
        console.log('erreur de lecture' + error);
      }
    );
    return this.httpClient.get<Billing[]>(`${this.baseUrl}listInvoices.php`)
  }

  getBillingByIdPartner(idPartner) {
    this.httpClient.get<Billing[]>(`${this.baseUrl}listInvoices.php?idPartner=${idPartner}`).subscribe(
      (billings) => {
        this.billingByIdPartner = billings;
        console.log(this.billings);
        this.emitBillingByPartnerSubject(idPartner);
      }
    );
  }
}
