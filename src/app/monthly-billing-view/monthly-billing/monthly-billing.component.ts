import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monthly-billing',
  templateUrl: './monthly-billing.component.html',
  styleUrls: ['./monthly-billing.component.css']
})
export class MonthlyBillingComponent implements OnInit {

  @Input() indexOfBilling: number;
  @Input() idInvoice: number;
  @Input() invoiceNumber: string;
  @Input() amountInvoice: string;
  @Input() idPartner: number;
  @Input() invoiceDate: string;
  @Input() invoiceLines: string;
  @Input() idContract: number;
  @Input() idCustomer: number;
  @Input() idBooking: number;
  @Input() idCar: number;

  constructor() { }

  ngOnInit(): void {
  }

}
