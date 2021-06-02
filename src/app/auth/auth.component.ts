import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;
  errorMessage = 'Mail ou mot de passe incorrect';

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.authForm = this.formBuilder.group({
      usernamePartner: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

   ngOnInit(): void {
  }

  postdata(signinForm1: any): void {
    this.authService.userlogin(signinForm1.value.usernamePartner, signinForm1.value.password)
      .pipe(first())
      .subscribe(
          data => {
            if (data === "Le mot de passe est erroné") {
              alert(data);
              this.authService.getLoggedInName.emit(false);
            } else if ( data === "Le partnenaire n'existe pas") {
              alert(data);
              this.authService.getLoggedInName.emit(false);
            }
            else {
              this.authService.setToken(data.namePartner);
              this.authService.getLoggedInName.emit(true);
              const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/calendarMouttec';
              this.router.navigate([redirect]);
              localStorage.setItem('idPartner', JSON.stringify(data.idPartner));
              localStorage.setItem('typeBilling', JSON.stringify(data.typeBilling));
            }
          },
          error => {
            alert(this.errorMessage);
          });
  }

  get usernamePartner(): AbstractControl { return this.authForm.get('usernamePartner'); }

  get password(): AbstractControl { return this.authForm.get('password'); }

}
