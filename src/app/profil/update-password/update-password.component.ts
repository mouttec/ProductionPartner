import { ProfilPartnerPassword } from 'src/app/models/profilPartner.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  updatePassword: FormGroup;
  partners: ProfilPartnerPassword[];
  partnerSubscription: Subscription;
  idPartner = localStorage.getItem('idPartner');
  idPartnerNumber: number;

  constructor(private partnerService: PartnerService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.partnerSubscription = this.partnerService.partnerSubject.subscribe(
      (partners: ProfilPartnerPassword[]) => {
        this.partners = partners;
      }
    );
    this.partnerService.ReadListPartner();
    this.initFormUpdatePassword();
    this.idPartnerNumber = Number(this.idPartner);
  }

  initFormUpdatePassword() {
    this.updatePassword = this.formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        newPassword2: ['', Validators.required]
      }
    );
  }

  onSubmitFormUpdatePassword() {
    const formValue = this.updatePassword.value;
    const newPassword = new ProfilPartnerPassword(
      formValue['oldPassword'],
      formValue['newPassword']
    );
    newPassword.idPartner = this.idPartnerNumber;
    console.log('récupération des données à envoyer au back', newPassword);
    this.partnerService.updatePartnerPassword(newPassword);
    this.router.navigate(['/calendar']);
  }
}
