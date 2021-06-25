import { Component, OnInit } from '@angular/core';
import { PartnerService } from 'src/app/services/partner.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  currentPartner = null;
  usernamePartner: string;
  namePartner: string;
  addressPartner: string;
  phonePartner: string;
  typePartner: string;
  mailPartner: string;
  nameBilling: string;
  siretPartner: string;
  addressBilling: string;
  datePartner: string;
  typeBilling: string;
  statusPartner: string;
  idAgency: number;

  idPartner = JSON.parse(localStorage.getItem('idPartner'));

  constructor(private partnerService: PartnerService, private http: HttpClient ) {
  }

  ngOnInit(): void {
    this.getPartner(this.idPartner);
  }

  getPartner(idPartner): void {
    this.partnerService.getPartnerById(idPartner)
      .subscribe(
        partner => {
          this.currentPartner = partner;
          console.log(partner)
          this.usernamePartner = this.currentPartner.usernamePartner;
          this.namePartner = this.currentPartner.namePartner;
          this.addressPartner = this.currentPartner.addressPartner;
          this.phonePartner = this.currentPartner.phonePartner;
          this.mailPartner = this.currentPartner.mailPartner;
          this.nameBilling = this.currentPartner.nameBilling;
          this.siretPartner = this.currentPartner.siretPartner;
          this.addressBilling = this.currentPartner.addressBilling;
          this.typePartner = this.currentPartner.typePartner;
          this.statusPartner = this.currentPartner.statusPartner;
          this.typeBilling = this.currentPartner.typeBilling;
          localStorage.setItem('addressPartner', JSON.stringify(this.addressPartner));
          localStorage.setItem('mailPartner', JSON.stringify(this.mailPartner));
          localStorage.setItem('phonePartner', JSON.stringify(this.phonePartner));
          localStorage.setItem('nameBilling', JSON.stringify(this.nameBilling));
          localStorage.setItem('addressBilling', JSON.stringify(this.addressBilling));
          localStorage.setItem('idAgency', JSON.stringify(this.idAgency));
        },
        error => {
          console.log(error);
        }
      );
  }
}
