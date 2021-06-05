 /// <reference  types="@types/googlemaps"  />
import { Subscription } from 'rxjs';
import { Component, OnInit, NgZone } from '@angular/core';
import { Partner } from 'src/app/models/partner.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-profil',
  templateUrl: './update-profil.component.html',
  styleUrls: ['./update-profil.component.css']
})
export class UpdateProfilComponent implements OnInit {

  pickupLoc: string;

  updateProfil: FormGroup;
  partners: Partner[];
  partnerSubscription: Subscription;
  idPartner = JSON.parse(localStorage.getItem('idPartner'));
  usernamePartner = JSON.parse(localStorage.getItem('usernamePartner'));
  namePartner = JSON.parse(localStorage.getItem('namePartner'));
  addressPartner = JSON.parse(localStorage.getItem('addressPartner'));
  phonePartner = JSON.parse(localStorage.getItem('phonePartner'));
  mailPartner = JSON.parse(localStorage.getItem('mailPartner'));
  nameBilling = JSON.parse(localStorage.getItem('nameBilling'));
  siretPartner = JSON.parse(localStorage.getItem('siretPartner'));
  addressBilling = JSON.parse(localStorage.getItem('addressBilling'));
  typePartner = JSON.parse(localStorage.getItem('typePartner'));
  statusPartner = JSON.parse(localStorage.getItem('statusPartner'));
  typeBilling = JSON.parse(localStorage.getItem('typeBilling'));
  idAgency = JSON.parse(localStorage.getItem('idAgency'));
  idAgencyNumber: number;

constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private partnerService: PartnerService, private ngZone: NgZone){
}

  ngOnInit() {
    this.partnerSubscription = this.partnerService.partnerSubject.subscribe(
      (partners: Partner[]) => {
        this.partners = partners;
      }
    );
    this.partnerService.ReadListPartner();
    this.initFormUpdateProfil();
    this.idAgencyNumber = Number(this.idAgency);
    this.getPlaceAutocomplete();
  }

  getPlaceAutocomplete() {
    let autocomplete = new google.maps.places.Autocomplete(document.getElementById('addressBilling') as HTMLInputElement);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        this.pickupLoc = place.formatted_address
        this.updateProfil.patchValue({
          addressBilling : this.pickupLoc,
        });
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
      });
    });
  }

  initFormUpdateProfil() {
    this.updateProfil = this.formBuilder.group(
      {
        mailPartner: [''],
        phonePartner: [''],
        nameBilling: [''],
        addressBilling: [''],
      }
    );
    this.updateProfil.controls['mailPartner'].setValue(this.mailPartner);
    this.updateProfil.controls['phonePartner'].setValue(this.phonePartner);
    this.updateProfil.controls['nameBilling'].setValue(this.nameBilling);
    this.updateProfil.controls['addressBilling'].setValue(this.addressBilling);
  }

  onSubmitFormUpdateProfil() {
    const formValue = this.updateProfil.value;
    const newProfil = new Partner(
      formValue['mailPartner'],
      formValue['phonePartner'],
      formValue['nameBilling'],
      formValue['addressBilling']
    );
    newProfil.idPartner = this.idPartner;
    newProfil.usernamePartner = this.usernamePartner;
    newProfil.namePartner = this.namePartner;
    newProfil.addressPartner = this.addressPartner;
    newProfil.siretPartner = this.siretPartner;
    newProfil.typePartner = this.typePartner;
    newProfil.statusPartner = this.statusPartner;
    newProfil.typeBilling = this.typeBilling;
    newProfil.idAgency = this.idAgencyNumber;
    this.partnerService.updatePartnerProfil(newProfil);
    this.router.navigate(['/calendarMouttec']);
  }
}



