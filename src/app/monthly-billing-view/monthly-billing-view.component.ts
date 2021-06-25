import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillingService } from 'src/app/services/billing.service';
import { Billing } from 'src/app/models/billing.model';

@Component({
  selector: 'app-monthly-billing-view',
  templateUrl: './monthly-billing-view.component.html',
  styleUrls: ['./monthly-billing-view.component.css']
})
export class MonthlyBillingViewComponent implements OnInit, OnDestroy {

  billings: Billing[]
  billingSubscription: Subscription;
  idPartner = JSON.parse(localStorage.getItem('idPartner'));
  p: number = 1;

  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.billingSubscription = this.billingService.billingByIdPartnerSubject.subscribe(
      (billings: Billing[]) => {
        this.billings = billings;
        console.log(this.billings);
      }
    );
    this.billingService.getBillingByIdPartner(this.idPartner);
  }

  ngOnDestroy(): void {
    this.billingSubscription.unsubscribe();
  }

}
