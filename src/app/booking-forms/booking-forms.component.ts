import { Component, OnInit, NgZone } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PartnerService } from 'src/app/services/partner.service';
import { MapService } from 'src/app/services/map.service';
import { Booking } from 'src/app/models/booking.model';
import {  } from 'rxjs/add/operator/toPromise';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';
import { SivService } from 'src/app/services/siv.service';
import { first } from 'rxjs/operators';
import { Siv } from 'src/app/models/siv.model';

@Component({
  selector: 'app-booking-forms',
  templateUrl: './booking-forms.component.html',
  styleUrls: ['./booking-forms.component.css']
})
export class BookingFormsComponent implements OnInit {

  siv: Siv[];
  bookingForm: FormGroup;
  bookings: Booking[];
  bookingSubscription: Subscription;
  address: any;
  addressForth: any;
  addressBack: any;
  distance: number;
  distanceForth: number;
  distanceBack: number;
  durationForth: number;
  durationBack: number;
  tarif: any;
  testTarif: any;
  formulaBooking: any;
  DistanceBooking: any[];
  addressPartner = JSON.parse(localStorage.getItem('addressPartner'));
  customers: Customer[];
  customerSubscription: Subscription;
  modelCar: any;
  brandCar: any;
  dateOfCirculationCar: any;
  motorizationCar: any;
  versionCar: any;
  colorCar: any;

  constructor(private bookingService: BookingService, private router: Router, private formBuilder: FormBuilder, private partnerService: PartnerService, private ngZone: NgZone, private  mapService: MapService, private customerService: CustomerService, private sivService: SivService) { }

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      addressForth: [''],
      addressBack: [''],
      address: [''],
      formulaBooking: [''],
      firstNameCustomer: [''],
      lastNameCustomer: [''],
      mailCustomer: [''],
      phoneCustomer: [''],
      dateOfBirthdayCustomer: [''],
      addressBilling: [''],
      licensePlateCar: [''],
      modelCar: [''],
      brandCar: [''],
      motorizationCar: [''],
      dateOfCirculationCar: ['']
    });
    this.customerSubscription = this.customerService.customerSubject.subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
      }
    );
    this.customerService.readlListCustomer();
    this.initAutocomplete();
  }

  changeFormulaBooking(e) {
  }

  initAutocomplete() {
    let autocomplete = new google.maps.places.Autocomplete(document.getElementById('address') as HTMLInputElement);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //retrouver les lieux
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        // console.log('place is ', place);
        // this.form.address1 = place.formatted_address;
        this.address = place.formatted_address
        //console.log('address 1 ', this.form.address1);
        this.bookingForm.patchValue({
          address : this.address
        });
        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }
      });
    });
    let autocomplete2 = new google.maps.places.Autocomplete(document.getElementById('addressForth1') as HTMLInputElement);
    autocomplete2.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //retrouver les lieux de l'address 2
        let place2: google.maps.places.PlaceResult = autocomplete2.getPlace();
        this.addressForth = place2.formatted_address
        // console.log('pickup ', this.form.pickupLocation);
        this.bookingForm.patchValue({
          addressForth : this.addressForth || "",
          addressBack: this.addressBack
        });
        //verify result
        if (place2.geometry === undefined || place2.geometry === null) {
          return;
        }
      });
    });
    let autocomplete3 = new google.maps.places.Autocomplete(document.getElementById('addressBack1') as HTMLInputElement);
    autocomplete3.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //retrouver les lieux de l'address 2
        let place3: google.maps.places.PlaceResult = autocomplete3.getPlace();
        this.addressBack = place3.formatted_address
        // console.log('pickup ', this.form.pickupLocation);
        this.bookingForm.patchValue({
          addressForth : this.addressForth || "",
          addressBack: this.addressBack
        });
        //verify result
        if (place3.geometry === undefined || place3.geometry === null) {
          return;
        }
      });
    });
  }

  getDist(): Promise<any>{
    this.formulaBooking = this.bookingForm.value.formulaBooking;
    if (this.bookingForm.value.address !== '') {
      return this.mapService.calculerDistance(this.address, this.addressPartner)
      .then((data) => {
        if (this.formulaBooking === 'forth') {
          this.distanceForth = data.distance;
          this.durationForth = data.duration;
          this.tarif = this.mapService.calculTarifTwoAddress(this.distanceForth, this.formulaBooking);
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 1 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 1 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressForth = this.bookingForm.value.address;
          localStorage.setItem('address', JSON.stringify(this.addressForth));
          // localStorage.setItem('addressBack', JSON.stringify(this.addressBack));
          // console.log('compenent condition 1 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 1 local addressBack', JSON.parse(localStorage.getItem('addressBack')));
          this.addressForth = JSON.parse(localStorage.getItem('address'));
          // console.log('compenent condition 1 addressForth',this.addressForth);
          // console.log('compenent condition 1 addressBack',this.addressBack);
          // console.log('compenent condition 1 component distanceForth', this.distanceForth);
          // console.log('compenent condition 1 component  durationForth', this.durationForth);
          // console.log('compenent condition 1 component distanceBack', this.distanceBack);
          // console.log('compenent condition 1 component  durationBack', this.durationBack);
          // console.log('component constion 1 formula', this.formulaBooking);
          // console.log('component constion 1 tarif',this.tarif);
          // console.log('compenent condition 1 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 1 local duration', localStorage.removeItem('duration'));
          // console.log('compenent condition 1 local address', localStorage.removeItem('address'));
          // this.addressForth = "";
          // this.distanceForth = 0;
          // this.durationForth = 0;
          this.rebuilderForm();
        }
        else if (this.formulaBooking === 'back') {
          this.distanceBack = data.distance;
          this.durationBack = data.duration;
          this.tarif = this.mapService.calculTarifTwoAddress(this.distanceBack, this.formulaBooking);
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 2 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 2 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressBack = this.bookingForm.value.address;
          localStorage.setItem('address', JSON.stringify(this.addressBack));
          // console.log('compenent condition 2 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 2 local addressBack', JSON.parse(localStorage.getItem('addressBack')));
          // console.log('compenent condition 2 addressForth',this.addressForth);
          // console.log('compenent condition 2 addressBack',this.addressBack);
          // console.log('compenent condition 2 component distanceForth', this.distanceForth);
          // console.log('compenent condition 2 component  durationForth', this.durationForth);
          // console.log('compenent condition 2 component distanceBack', this.distanceBack);
          // console.log('compenent condition 2 component  durationBack', this.durationBack);
          // console.log('component constion 2 formula', this.formulaBooking);
          // console.log('component constion 2 tarif',this.tarif);
          // console.log('compenent condition 2 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 2 local duration', localStorage.removeItem('duration'));
          // console.log('compenent condition 2 local address', localStorage.removeItem('address'));
          // this.addressBack = "";
          // this.distanceBack = 0;
          // this.durationBack = 0;
          this.rebuilderForm();
        }
      });
    }
    else if (this.bookingForm.value.addressForth !== '' && this.bookingForm.value.addressBack !== '') {
      this.mapService.calculerDistance(this.addressForth, this.addressPartner)
      .then((data) => {
        if (this.formulaBooking === 'round') {
          this.distanceForth = data.distance;
          this.durationForth = data.duration;
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 1 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 1 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressForth = this.bookingForm.value.addressForth;
          localStorage.setItem('address', JSON.stringify(this.addressForth));
          // localStorage.setItem('addressBack', JSON.stringify(this.addressBack));
          // console.log('compenent condition 1 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 1 local addressBack', JSON.parse(localStorage.getItem('addressBack')));
          this.addressForth = JSON.parse(localStorage.getItem('address'));
          // console.log('compenent condition 1 addressForth',this.addressForth);
          // console.log('compenent condition 1 addressBack',this.addressBack);
          // console.log('compenent condition 1 component distanceForth', this.distanceForth);
          // console.log('compenent condition 1 component  durationForth', this.durationForth);
          // console.log('compenent condition 1 component distanceBack', this.distanceBack);
          // console.log('compenent condition 1 component  durationBack', this.durationBack);
          // console.log('component constion 1 formula', this.formulaBooking);
          // console.log('component constion 1 tarif',this.tarif);
          // console.log('compenent condition 1 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 1 local duration', localStorage.removeItem('duration'));
          // console.log('compenent condition 1 local address', localStorage.removeItem('address'));
        }
        else if (this.formulaBooking === 'technicalControl') {
          this.distanceForth = data.distance;
          this.durationForth = data.duration;
          this.tarif = this.mapService.calculTarifTwoAddress(this.distanceForth, this.formulaBooking);
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 2 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 2 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressBack = this.bookingForm.value.addressForth;
          localStorage.setItem('address', JSON.stringify(this.addressForth));
          // console.log('compenent condition 2 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 2 local addressBack', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 2 addressForth',this.addressForth);
          // console.log('compenent condition 2 addressBack',this.addressBack);
          // console.log('compenent condition 2 component distanceForth', this.distanceForth);
          // console.log('compenent condition 2 component  durationForth', this.durationForth);
          // console.log('compenent condition 2 component distanceBack', this.distanceForth);
          // console.log('compenent condition 2 component  durationBack', this.durationForth);
          // console.log('component constion 2 formula', this.formulaBooking);
          // console.log('component constion 2 tarif',this.tarif);
          // console.log('compenent condition 2 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 2 local duration', localStorage.removeItem('duration'));
          // console.log('compenent condition 2 local address', localStorage.removeItem('address'));
        }
      });
      this.mapService.calculerDistance(this.addressBack, this.addressPartner)
      .then((data) => {
        if (this.formulaBooking === 'round') {
          this.distanceBack = data.distance;
          this.durationBack = data.duration;
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 2 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 2 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressBack = this.bookingForm.value.addressBack;
          this.tarif = this.mapService.calculTarifThreeAddress(this.distanceForth, this.distanceBack, this.formulaBooking);
          localStorage.setItem('address', JSON.stringify(this.addressBack));
          // localStorage.setItem('addressBack', JSON.stringify(this.addressBack));
          // console.log('compenent condition 2 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 1 local addressBack', JSON.parse(localStorage.getItem('addressBack')));
          this.addressBack = JSON.parse(localStorage.getItem('address'));
          // console.log('compenent condition 2 addressForth',this.addressForth);
          // console.log('compenent condition 2 addressBack',this.addressBack);
          // console.log('compenent condition 2 component distanceForth', this.distanceForth);
          // console.log('compenent condition 2 component  durationForth', this.durationForth);
          // console.log('compenent condition 2 component distanceBack', this.distanceBack);
          // console.log('compenent condition 2 component  durationBack', this.durationBack);
          // console.log('component constion 2 formula', this.formulaBooking);
          // console.log('component constion 2 tarif',this.tarif);
          // console.log('compenent condition 2 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 2 local duration', localStorage.removeItem('duration'));
          console.log('compenent condition 2 local address', localStorage.removeItem('address'));
          // this.addressForth = '';
          // this.addressBack = '';
          // this.distanceForth = 0;
          // this.durationForth = 0;
          // this.distanceBack = 0;
          // this.durationBack = 0;
          this.rebuilderForm();
        }
        else if (this.formulaBooking === 'technicalControl') {
          this.distanceBack = data.distance;
          this.durationBack = data.duration;
          this.tarif = this.mapService.calculTarifTwoAddress(this.distanceBack, this.formulaBooking);
          localStorage.setItem('tarif', JSON.stringify(this.tarif));
          // console.log('compenent condition 2 service distance', JSON.parse(localStorage.getItem('distance')));
          // console.log('compenent condition 2 service duration', JSON.parse(localStorage.getItem('duration')));
          this.addressBack = this.bookingForm.value.addressBack;
          localStorage.setItem('address', JSON.stringify(this.addressBack));
          // console.log('compenent condition 2 local addressForth', JSON.parse(localStorage.getItem('addressForth')));
          // console.log('compenent condition 2 local addressBack', JSON.parse(localStorage.getItem('addressBack')));
          // console.log('compenent condition 2 addressForth',this.addressForth);
          // console.log('compenent condition 2 addressBack',this.addressBack);
          // console.log('compenent condition 2 component distanceForth', this.distanceForth);
          // console.log('compenent condition 2 component  durationForth', this.durationForth);
          // console.log('compenent condition 2 component distanceBack', this.distanceBack);
          // console.log('compenent condition 2 component  durationBack', this.durationBack);
          // console.log('component constion 2 formula', this.formulaBooking);
          // console.log('component constion 2 tarif',this.tarif);
          // console.log('compenent condition 2 local distance', localStorage.removeItem('distance'));
          // console.log('compenent condition 2 local duration', localStorage.removeItem('duration'));
          // console.log('compenent condition 2 local address', localStorage.removeItem('address'));
        }
      });

    }
  }

  getCar() {
    const formValue = this.bookingForm.value;
    const newSiv = new Siv(
      formValue['licensePlateCar']
    );
    return this.sivService.addSIV(newSiv).then((data) => {
      console.log(1111);
      this.modelCar = data.modelCar;
      this.brandCar = data.brandCar;
      this.dateOfCirculationCar = data.dateOfCirculationCar;
      this.colorCar = data.colorCar;
      this.versionCar = data.versionCar;
      this.motorizationCar = data.motorizationCar;
      console.log("data", data);
      return data;
    });
  }

  onSubmitFormBooking(): void {
    const formValue = this.bookingForm.value;
    const newBooking = new Booking ();
    newBooking.addressForth = this.addressForth;
    newBooking.addressPartner = this.addressPartner;
    newBooking.addressBack = this.addressBack;
    newBooking.durationForth = this.durationForth;
    newBooking.distanceForth = this.distanceForth;
    newBooking.distanceBack = this.distanceBack;
    newBooking.durationBack = this.durationBack;
    newBooking.formulaBooking = this.formulaBooking;
    newBooking.firstNameCustomer = this.bookingForm.value.firstNameCustomer;
    newBooking.lastNameCustomer = this.bookingForm.value.lastNameCustomer;
    newBooking.mailCustomer = this.bookingForm.value.mailCustomer;
    newBooking.phoneCustomer = this.bookingForm.value.phoneCustomer;
    newBooking.dateOfBirthdayCustomer = this.bookingForm.value.dateOfBirthdayCustomer;
    newBooking.price = this.tarif;
  }

  rebuilderForm(){
    this.bookingForm.reset(
      {
        address: '',
        addressForth: '',
        addressBack: '',
        addressBilling: ''
      }
    );
  }

}
