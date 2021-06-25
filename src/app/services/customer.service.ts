import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerSubject = new Subject<Customer[]>();
  baseUrl = '../backend/api/customers/';
  private customers: Customer[];
  idPartner = JSON.parse(localStorage.getItem('idPartner'));

  constructor(private httpClient: HttpClient) { }

  emitCustomerSubject() {
    this.customerSubject.next(this.customers);
  }

  readlListCustomer(): Observable<Customer[]> {
    this.httpClient.get<Customer[]>(`${this.baseUrl}/listCustomers.php?idPartner=${this.idPartner}`).subscribe(
      (reponse) => {
        this.customers = reponse;
        this.emitCustomerSubject();
      },
      (error) => {
        console.log('erreur de sauvegarde' + error);
      }
    );
    return this.httpClient.get<Customer[]>(`${this.baseUrl}/listCustomers.php`);
  }

  getCustomerById(idCustomer) {
    return this.httpClient.get(`${this.baseUrl}/listCustomers.php?idCustomer=${idCustomer}`);
  }
}
