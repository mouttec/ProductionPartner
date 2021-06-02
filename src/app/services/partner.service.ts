import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Partner } from 'src/app/models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  partnerSubject = new Subject<any[]>();
  baseUrl = 'http://localhost:8888/MoutteCAPI/backend/api/partner/';
  private partners: Partner [];

  constructor(private httpClient: HttpClient) { }

  emitPartnerSubject(){
    this.partnerSubject.next(this.partners);
  }

  ReadListPartner() {
    return this.httpClient.get<Partner[]>(`${this.baseUrl}listPartner.php`).subscribe(
      (partners) => {
        this.partners = partners;
        this.emitPartnerSubject();
      }
    );
  }

  getPartnerById(idPartner) {
    return this.httpClient.get(`${this.baseUrl}listPartner.php?idPartner=${idPartner}`);
  }

  getUpdateById(idPartner) {
    return this.httpClient.get<Partner[]>(`${this.baseUrl}listPartner.php?idPartner=${idPartner}`).subscribe(
      (partners) => {
        this.partners = partners;
      }
    );
  }

  updatePartnerProfil(partner: Partner) {
    return this.httpClient.post(`${this.baseUrl}editPartner.php`, partner).subscribe(
      () => {
        this.partners.push(partner);
        console.log('modification des données du partner réussit');
      },
      (error) => {
        console.log('erreur des modifications des données du partner réussit' + error);
      }
    );
  }

  updatePartnerPassword(partner) {
    return this.httpClient.post(`${this.baseUrl}changePasswordPartner.php`, partner).subscribe(
      () => {
        this.partners.push(partner);
        console.log('modification du mot de passe réussit');
      },
      (error) => {
        console.log('erreur de modification du mot de passe' + error);
      }
    );
  }
}
